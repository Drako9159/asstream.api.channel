const twitch = require('twitch-m3u8');

interface LiveChannel {
    name: string;
    link: string;
}

/**
 * 
 * @param channelName Twitch channel name
 * @returns LiveChannel object if the channel is live, otherwise null
 */
export async function getTwitchStreamUrl(channelName: string): Promise<LiveChannel | null> {
    try {
        const streams = await twitch.getStream(channelName, false);
        if (streams.length > 0) {
            return { name: channelName, link: streams[0].url };
        }
    } catch (error) {
        console.error(`Error in stream name: ${channelName}`, error);
        return null;
    }
    return null;
}
/**
 * 
 * @param channels List of twitch channels to check for live streams
 * @returns List of live channels
 */
async function checkLiveStreams(channels: string[]): Promise<LiveChannel[]> {
    const liveChannels: LiveChannel[] = [];
    const promises = channels.map(async (channel) => {
        const liveChannel = await getTwitchStreamUrl(channel);
        if (liveChannel) liveChannels.push(liveChannel);
    })
    await Promise.all(promises);
    return liveChannels;
}


/**
 * 
 * @param channels List of twitch channels to check for live streams, execute every 10 minutes
 */
export async function startLiveStreamChecker(channels: string[]) {
    /*
    async function checkAndUpdate() {
        console.log("Checking live streams...");
        const liveChannels = await checkLiveStreams(channels);
        console.log("Live channels:", liveChannels);
    }
    const interval = 10 * 60 * 1000;
    checkAndUpdate();
    setInterval(checkAndUpdate, interval);*/
    console.log("Checking live streams...");
    return await checkLiveStreams(channels);
}
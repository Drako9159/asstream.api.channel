import { exec } from 'child_process';

export function getUrlVideo(videoUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`yt-dlp -g ${videoUrl}`, (error: Error | null, stdout: string, stderr: string) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }
            resolve(stdout);
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
}



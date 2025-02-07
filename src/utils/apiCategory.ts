
export interface ICategory {
    _id: string;
    title: string;
    videos: {
        videoType: string;
        url: string;
        quality: string;
    },
    duration: number;
    language: string;
    thumbnail: string;
    backdrop: string;
    shortDescription: string;
    releaseDate: string;
    longDescription: string;
    tag: string;
}



export function apiCategory(i: ICategory) {
    return {
        id: i._id,
        title: i.title,
        content: {
            dateAdded: "2025-01-20T00:34:52Z",

            videos: [i.videos],
            duration: i.duration,
            captions: [
                {
                    "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/captions/HDCP_Error_RokuTipsandTricks_20210120T003500_cc_eng.vtt",
                    "language": "en",
                    "captionType": "CLOSED_CAPTION"
                }
            ],
            trickPlayFiles: [
                {
                    "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/images/17058b9e-a7dc-477e-afaa-0e10d97ddb99-sd.bif",
                    "quality": "SD"
                },
                {
                    "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/images/17058b9e-a7dc-477e-afaa-0e10d97ddb99-hd.bif",
                    "quality": "HD"
                },
                {
                    "url": "https://static-delivery.sr.roku.com/17058b9e-a7dc-477e-afaa-0e10d97ddb99/images/17058b9e-a7dc-477e-afaa-0e10d97ddb99-fhd.bif",
                    "quality": "FHD"
                }
            ],
            language: i.language,
            audioFormats: ["stereo"],
            audioTracks: [
                {
                    language: "en",
                    label: "English (Original)"
                }
            ]
        },
        thumbnail: i.thumbnail,
        backdrop: i.backdrop,
        shortDescription: i.shortDescription,
        releaseDate: i.releaseDate,
        longDescription: i.longDescription,
        tags: [i.tag, "cable",
            "content",
            "error",
            "fix",
            "hdcp",
            "hdmi",
            "how",
            "protected",
            "roku",
            "roku_101",
            "screen",
            "streaming",
            "to",
            "troubleshooting"],
        genres: ["Entretenimiento"],
        rating: {
            "rating": "NR",
            "ratingSource": "USA_PR"
        },
        externalIds: [
            {
                "id": "Roku101_HDCP",
                "idType": "PARTNER_ASSET_ID"
            },
            {
                "idType": "PARTNER_TITLE_ID",
                "id": "Roku101_HDCP"
            }
        ]
    }
}
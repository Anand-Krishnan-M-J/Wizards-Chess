export const webRtcServers = {
    iceServers: [
        {
            urls: process.env.iceServerUrl as string,
            username: process.env.iceUsername as string,
            credentials: process.env.iceCredentials as string,
        },
    ],
    iceCandidatePoolSize: 10,
}

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === "development",
})

const nextConfig = {
  reactStrictMode: true,
  env: {
    iceServerUrl: process.env.iceServerUrl,
    iceUsername: process.env.iceUsername,
    iceCredentials: process.env.iceCredentials,

    firebaseApiKey: process.env.firebaseApiKey,
    firebaseAuthDomain: process.env.firebaseAuthDomain,
    firebaseProjectId: process.env.firebaseProjectId,
    firebaseStorageBucket: process.env.firebaseStorageBucket,
    firebaseMessagingSenderId: process.env.firebaseMessagingSenderId,
    firebaseAppId: process.env.firebaseAppId,
    firebaseMeasurementId: process.env.firebaseMeasurementId,
  }
}

module.exports = withPWA(nextConfig)

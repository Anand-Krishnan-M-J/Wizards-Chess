# Wizard's Chess

Welcome to Wizard's Chess, an online 3D Multiplayer chess application (PWA) with built-in video calling capabilities.

<img src="https://github.com/Anand-Krishnan-M-J/Wizards-Chess/assets/87609792/dffe8ae9-3acc-467e-b714-e28198a077c0" alt="chess" />

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Configuration](#configuration)
   - [Firebase Setup](#firebase-setup)
   - [WebRTC Configuration](#webrtc-configuration)
   - [Environment Variables](#environment-variables)
5. [Development](#development)
   - [Running the Application Locally](#running-the-application-locally)
   - [Linting](#linting)
6. [Building for Production](#building-for-production)
7. [Additional Features](#additional-features)
   - [PWA Integration](#pwa-integration)
   - [Redux Toolkit](#redux-toolkit)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

Wizard Chess is a chess application developed using Next.js, Three.js, React Three Fiber, TypeScript, Sass, WebRTC, Firebase, and PWA. It provides users with an immersive chess-playing experience, including video calling features.

## Tech Stack

- Next.js
- Three.js
- React Three Fiber
- TypeScript (ts)
- Sass
- WebRTC
- Firebase
- Progressive Web App (PWA)
- Redux Toolkit

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:Anand-Krishnan-M-J/Wizards-Chess.git
   ```

2. Change into the project directory:
   ```bash
   cd wizard-chess
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
## Configuration
### Firebase Setup, Ice server and Environment Variables
1. Create a Firebase project.
2. Obtain your Firebase configuration settings.
3. Add the configuration settings to the .env.local file, refer sample.env file
4. Obtain IceServer configuration settings and to env file


## Development
Running the Application Locally:
   ```bash
   npm run dev
   ```
  Visit http://localhost:3000 in your browser.

## Building for Production
Build the application:
   ```bash
   npm run build
   ```
Start the production server:
   ```bash
   npm start
   ```

## Additional Features
### PWA Integration
The application is set up as a Progressive Web App (PWA) using next-pwa. Users can install it on their devices for an offline experience.

## Contributing
If you'd like to contribute to the project, Connect with me on LinkedIn



## To do's
1. Checkmate logic
2. 2D view
3. Promotion
4. Special pawn move
5. Castling
6. Retry video connection option

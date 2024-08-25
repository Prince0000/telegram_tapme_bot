
# TapMe Game

TapMe is a fun and interactive web-based game where users can tap on an image to earn coins. Users can also upgrade their tapping power and energy limits using the coins they've earned. The game uses Supabase as its backend to manage user data and game progress.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

A live demo of the application can be found [here](#).

## Features

- **Tap to Earn Coins:** Click on the image to earn coins.
- **Upgrade System:** Users can upgrade their clicking power (Multitap) and energy limits using the coins they've earned.
- **User Authentication:** Secure login and sign-up functionality.
- **Supabase Integration:** User data, including progress and upgrades, is stored and managed in Supabase.
- **Real-time Updates:** Coins, clicks, and upgrades update in real time.

## Technologies Used

- **Frontend:**
  - React
  - React Router DOM
  - React Spinners (for loading indicators)
  - CountUp.js (for animated counting of coins)
  - Bootstrap (for styling)

- **Backend:**
  - Supabase (for authentication, database, and backend functions)

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/Prince0000/telegram_tapme_bot.git
cd tapme-game
```

### Install Dependencies

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

- **Home Page:** Displays the current coins and clicks. Click on the image to earn coins.
- **Boost Page:** Allows users to upgrade their clicking power (Multitap) and energy limits.
- **Status Page:** Shows the user's current level and statistics.

## File Structure

```plaintext
├── public
│   └── assets
│       └── coin.png         # Image used in the game
├── src
│   ├── components
│   │   └── HomePage.js      # Main home page component
│   │   └── ClickPage.js     # Page for clicking to earn coins
│   │   └── Boost.js
│   │   └── supabaseClient.js    # Supabase client setup 
│   └── index.js             # Entry point of the React app
├── README.md                # This readme file
├── package.json             # Project dependencies and scripts
└── ...
```

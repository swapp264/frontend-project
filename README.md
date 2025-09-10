# Text Translator App

A React application that provides text translation and random string generation features.

## Features

- **Text Translator**: Translate English text to various languages using RapidAPI
- **Random String Generator**: Generate customizable random strings with different character sets
- **Client-side Routing**: Navigate between different features using React Router
- **Modern UI**: Built with Tailwind CSS for a responsive and beautiful interface

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Axios for API calls
- React Hooks (useState, useCallback, useEffect)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## RapidAPI Setup

To enable real translation functionality:

1. Sign up for a RapidAPI account
2. Subscribe to a translation API service
3. Replace the mock implementation in `src/components/TextTranslator.js` with your API key and endpoint

## Project Structure

```
src/
├── components/
│   ├── Home.js              # Landing page
│   ├── TextTranslator.js    # Translation component
│   └── RandomStringGenerator.js # Random string generator
├── App.js                   # Main app with routing
├── index.js                 # Entry point
└── index.css               # Tailwind CSS imports
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Features Implemented

✅ React application with useState, useCallback, and useEffect hooks
✅ Text translator with RapidAPI integration (mock implementation included)
✅ Random string generator with customizable options
✅ Client-side routing with React Router DOM
✅ Modern UI with Tailwind CSS
✅ Responsive design
✅ Copy to clipboard functionality
✅ Auto-generation feature for random strings
✅ History tracking for generated strings

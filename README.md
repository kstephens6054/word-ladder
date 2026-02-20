# Word Ladder

An online word ladder game built with React, TypeScript, and Vite.

## Architecture

### root Component

The root component provides the query context, suspense boundaries and
error boundaries for the application.

### App Component

The App component manages the word list used by the game.

### Layout Component

The Layout component displays the app UI elements

### WordLadderGame Component

The WordLadderGame component manages the state for the current game

### Playfield Component

The Playfield component manages the game UI.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool with HMR (Hot Module Replacement)
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **ESLint** - Code linting

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Build

```bash
npm run build
```

### Test

```bash
npm run test        # Run tests in watch mode
npm run test:run    # Run tests once
npm run test:ui     # Run tests with UI
```

### Lint

```bash
npm run lint
```

## Project Structure

```
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.test.tsx      # Component tests
│   ├── main.tsx          # Application entry point
│   └── test/
│       └── setup.ts      # Test configuration
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite & Vitest configuration
└── package.json         # Project dependencies and scripts
```

# Biosonar Calculator

Biosonar Calculator is a modern web application built with Next.js and Tailwind CSS that allows users to explore how different animals use acoustic waves to perceive their environment. The application calculates distances and frequencies based on the speed of sound in various mediums (air, water, ground).

## Features

- **Animal Selection**: Choose between different animals (Bat, Whale, Elephant) to understand their specific biosonar mechanics.
- **Distance Calculation**: Calculate distance based on echo time and the speed of sound in the animal's medium.
- **Doppler Effect Calculation**: Calculate the received frequency based on the target's velocity.
- **Interactive UI**: Enjoy a responsive and modern user interface with smooth animations and dynamic particle effects.

## Technologies Used

- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [Lucide React](https://lucide.dev/) (Icons)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alejonanes/Geolocalizacion.git
   ```

2. Navigate to the project directory:
   ```bash
   cd biosonar
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server with:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx`: Main application page containing the biosonar logic and UI.
- `src/app/globals.css`: Global styles including custom animations and utility classes.
- `public/`: Static assets such as images (bat.png, whale.png, elephant.png).

## License

This project is licensed under the MIT License.

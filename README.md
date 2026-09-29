# ShortsCraft Studio

ShortsCraft Studio is a vertical short-form production platform for content creators and agencies. It generates 30–60 second vertical video blueprints (TikTok, Instagram Reels, YouTube Shorts) based on topics or historical archives.

![ShortsCraft Studio Screenshot](./public/screenshot.jpeg)

## Core Features

- **Retention Engineering**: Generates 5-second hooks optimized for retention through pattern interrupts and curiosity gaps.
- **High-Speed Inference**: Powered by the Groq API (Qwen 3.8 27B) for sub-second generation latency.
- **Three-Pillar Blueprint**:
  - **Pillar 01**: Spoken Hook (Translated in ID, EN, JA) and psychological breakdown.
  - **Pillar 02**: Kinetic visual pacing and audio architecture cues.
  - **Pillar 03**: Midjourney v6/SDXL generative prompt generation.
- **Stage Simulator**: Live 9:16 vertical phone simulator to preview subtitles and UI safe zones.

## Tech Stack

- Next.js 14 (App Router, Server Actions)
- Tailwind CSS v3
- TypeScript
- Groq SDK
- Lucide React & Framer Motion

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and configure your Groq API key:
   ```env
   GROQ_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the application.

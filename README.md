# TubeMarker

> Your personal knowledge base for YouTube content.

TubeMarker is a local-first application that allows you to bookmark, annotate, and organize YouTube videos. It transforms passive watching into active learning by letting you save specific timestamps with context-rich notes.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Persistence:** LocalStorage (Client-side only)
- **Video:** YouTube IFrame API
- **Validation:** Zod

## Features

- 📺 **Video Library:** Save YouTube videos to your personal library.
- ⏱️ **Timestamp Bookmarks:** Capture exact moments in a video with a single click.
- 📝 **Rich Annotations:** Add notes and context to your timestamps.
- 🏷️ **Tagging System:** Organize your library with custom tags.
- 🔍 **Search & Filter:** Quickly find the content you need.
- ⚡ **Instant Playback:** Click a note to jump the video player to that exact second.
- 🔒 **Privacy Focused:** All data is stored locally in your browser.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd tubemarker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using TubeMarker.

## Documentation

- [Task List](./TASKLIST.md): Tracking development progress.
- [Learnings](./LEARNINGS.md): Technical insights and decisions.
- [Development Rules](./.dev0/RULES.md): Coding standards and guidelines.
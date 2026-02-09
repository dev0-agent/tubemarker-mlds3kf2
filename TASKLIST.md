# Task List

This file shows the current progress of all tasks in this project.
It is automatically updated by dev0 as tasks are completed.

---

## Phase 1

- [x] ✅ **Project Foundation & Layout**
  Set up the basic routing and application shell. Create a MainLayout component with a sidebar/navigation and a content area. Configure 'react-router-dom' with routes for the Dashboard (home) and the Video Player view. Clean up default template artifacts.

- [x] ✅ **Data Persistence Layer**
  Implement a custom hook 'useStorage' (or service) to handle CRUD operations with LocalStorage. Define TypeScript interfaces for 'Video', 'Note', and 'Tag'. Include Zod schemas for validation. This layer must handle saving, retrieving, and updating the JSON data structure stored in the browser.

## Phase 2

- [x] ✅ **Add Video Feature**
  Create a Dialog/Modal component to add a new video. Implement logic to parse YouTube URLs (standard, short, and timestamps). Validate the URL using the Zod schema from Task 2. On success, save the video metadata to LocalStorage and redirect to the player view.

- [ ] ⏳ **YouTube Player Integration**
  Implement the Video Player view using 'react-youtube' or the IFrame API. The player must be able to report its current playback time and accept commands to seek to a specific time. Ensure the player handles window resizing responsively.

- [ ] ⏳ **Annotation System (Core Logic)**
  Build the interface for adding notes while watching. Create a 'Capture Timestamp' button that grabs the current player time. Create a form to add the note text. Display the list of notes alongside the video. Clicking a note must trigger the player to seek to that timestamp.

## Phase 3

- [ ] ⏳ **Dashboard & Video Grid**
  Build the Home/Dashboard view to display all saved videos in a responsive grid. Each card should show the thumbnail (fetched from YouTube standard URL), title, and tag count. Clicking a card navigates to the Player view.

- [ ] ⏳ **Tagging & Filtering**
  Enhance the Add Video and Edit Video forms to support tags. Implement a filter mechanism on the Dashboard to filter videos by tag or search by title. Update the storage layer to handle tag queries efficiently.

## Phase 4

- [ ] ⏳ **UI Polish & Error Handling**
  Add empty states for the dashboard and notes list. Implement toast notifications for actions (saved, deleted, error). Ensure consistent styling with Tailwind/shadcn. Add a 'Delete Video' confirmation dialog.

---

_Last updated by dev0 automation_

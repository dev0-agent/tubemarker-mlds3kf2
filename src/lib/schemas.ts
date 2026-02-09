import { z } from 'zod';

export const NoteSchema = z.object({
  id: z.string().uuid(),
  videoId: z.string(),
  timestamp: z.number().min(0),
  content: z.string().min(1, "Note content cannot be empty"),
  createdAt: z.number(), // Unix timestamp
  updatedAt: z.number(), // Unix timestamp
});

export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Tag name cannot be empty"),
});

export const VideoSchema = z.object({
  id: z.string(), // YouTube Video ID (not UUID)
  url: z.string().url(),
  title: z.string().min(1, "Title cannot be empty"),
  thumbnail: z.string().url().optional(),
  duration: z.number().min(0).optional(),
  notes: z.array(NoteSchema).default([]),
  tags: z.array(z.string()).default([]), // Array of Tag IDs
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const AppDataSchema = z.object({
  videos: z.array(VideoSchema).default([]),
  tags: z.array(TagSchema).default([]),
});

export type Note = z.infer<typeof NoteSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type AppData = z.infer<typeof AppDataSchema>;

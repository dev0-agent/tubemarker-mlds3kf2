import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppData, Note, Tag, Video, VideoSchema, NoteSchema, TagSchema } from '../lib/schemas';
import { loadData, saveData } from '../lib/storage';
import { parseYouTubeUrl } from '../lib/youtube';

interface StorageContextType {
  data: AppData;
  isLoading: boolean;
  addVideo: (videoData: Omit<Video, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'tags'> & { id?: string }) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  addNote: (videoId: string, noteData: Omit<Note, 'id' | 'videoId' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (videoId: string, noteId: string, updates: Partial<Note>) => void;
  deleteNote: (videoId: string, noteId: string) => void;
  addTag: (name: string) => void;
  updateTag: (id: string, name: string) => void;
  deleteTag: (id: string) => void;
  getVideo: (id: string) => Video | undefined;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>({ videos: [], tags: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
    setIsLoading(false);
  }, []);

  const save = (newData: AppData) => {
    setData(newData);
    saveData(newData);
  };

  const addVideo = (videoData: Omit<Video, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'tags'> & { id?: string }) => {
    const info = parseYouTubeUrl(videoData.url);
    const id = videoData.id || info?.videoId;
    if (!id) {
      console.error('Invalid YouTube URL or ID missing');
      return;
    }

    const newVideo: Video = {
      ...videoData,
      id,
      notes: [],
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      duration: videoData.duration || 0,
      thumbnail: videoData.thumbnail || `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    };

    // Check if video already exists
    if (data.videos.some(v => v.id === newVideo.id)) {
      console.warn('Video already exists');
      return;
    }

    // Validate with Zod
    try {
      const validated = VideoSchema.parse(newVideo);
      save({ ...data, videos: [validated, ...data.videos] });
    } catch (e) {
      console.error('Video validation failed:', e);
    }
  };

  const updateVideo = (id: string, updates: Partial<Video>) => {
    const newVideos = data.videos.map(v => 
      v.id === id ? { ...v, ...updates, updatedAt: Date.now() } : v
    );
    save({ ...data, videos: newVideos });
  };

  const deleteVideo = (id: string) => {
    save({ ...data, videos: data.videos.filter(v => v.id !== id) });
  };

  const addNote = (videoId: string, noteData: Omit<Note, 'id' | 'videoId' | 'createdAt' | 'updatedAt'>) => {
    const video = data.videos.find(v => v.id === videoId);
    if (!video) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      videoId,
      ...noteData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
        const validatedNote = NoteSchema.parse(newNote);
        const newVideos = data.videos.map(v => 
            v.id === videoId ? { ...v, notes: [...v.notes, validatedNote], updatedAt: Date.now() } : v
        );
        save({ ...data, videos: newVideos });
    } catch (e) {
        console.error('Note validation failed:', e);
    }
  };

  const updateNote = (videoId: string, noteId: string, updates: Partial<Note>) => {
    const newVideos = data.videos.map(v => {
      if (v.id !== videoId) return v;
      const newNotes = v.notes.map(n => 
        n.id === noteId ? { ...n, ...updates, updatedAt: Date.now() } : n
      );
      return { ...v, notes: newNotes, updatedAt: Date.now() };
    });
    save({ ...data, videos: newVideos });
  };

  const deleteNote = (videoId: string, noteId: string) => {
    const newVideos = data.videos.map(v => {
      if (v.id !== videoId) return v;
      return { ...v, notes: v.notes.filter(n => n.id !== noteId), updatedAt: Date.now() };
    });
    save({ ...data, videos: newVideos });
  };

  const addTag = (name: string) => {
      if (data.tags.some(t => t.name === name)) return;
      
      const newTag: Tag = {
          id: crypto.randomUUID(),
          name
      };

      try {
          const validatedTag = TagSchema.parse(newTag);
          save({ ...data, tags: [...data.tags, validatedTag] });
      } catch (e) {
          console.error('Tag validation failed:', e);
      }
  };

  const updateTag = (id: string, name: string) => {
      const newTags = data.tags.map(t => t.id === id ? { ...t, name } : t);
      save({ ...data, tags: newTags });
  };

  const deleteTag = (id: string) => {
      // Also remove tag from videos?
      // Currently videos store array of tag IDs (strings).
      // If we delete a tag, we should probably remove it from videos too to keep consistency.
      
      const newTags = data.tags.filter(t => t.id !== id);
      const newVideos = data.videos.map(v => ({
          ...v,
          tags: v.tags.filter(tId => tId !== id)
      }));

      save({ videos: newVideos, tags: newTags });
  };

  const getVideo = (id: string) => data.videos.find(v => v.id === id);

  return (
    <StorageContext.Provider value={{
      data,
      isLoading,
      addVideo,
      updateVideo,
      deleteVideo,
      addNote,
      updateNote,
      deleteNote,
      addTag,
      updateTag,
      deleteTag,
      getVideo,
    }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStorage } from '@/hooks/use-storage';
import { parseYouTubeUrl } from '@/lib/youtube';
import { VideoSchema } from '@/lib/schemas';
import { toast } from 'sonner';

export function AddVideoDialog() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const { addVideo } = useStorage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const info = parseYouTubeUrl(url);
    if (!info) {
      toast.error('Invalid YouTube URL');
      return;
    }

    try {
      // Basic validation of URL before adding
      VideoSchema.pick({ url: true }).parse({ url });

      addVideo({
        url,
        title: title.trim() || 'New Video', // Default title if empty
      });

      toast.success('Video added successfully');
      setOpen(false);
      setUrl('');
      setTitle('');
      
      // Redirect to the player view for the new video
      navigate(`/player/${info.videoId}${info.timestamp ? `?t=${info.timestamp}` : ''}`);
    } catch (error) {
      toast.error('Invalid URL or video data');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Add Video
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Video</DialogTitle>
          <DialogDescription>
            Enter a YouTube URL to add it to your library.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="url">YouTube URL</Label>
            <Input
              id="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Enter a title for this video"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Video</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

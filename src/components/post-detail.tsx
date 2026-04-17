'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Post } from '@/types';

interface PostDetailProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
}

export default function PostDetail({ post, open, onClose }: PostDetailProps) {
  if (!post) return null;

  const date = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
          <p className="text-xs text-muted-foreground">{date}</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Images */}
          {post.images.length > 0 && (
            <div className="space-y-2">
              {post.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${post.title} ${i + 1}`}
                  className="w-full rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Body */}
          {post.body && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
          )}

          {/* Highlights */}
          {post.highlights.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Special</p>
              <div className="flex flex-wrap gap-1">
                {post.highlights.map((h) => (
                  <Badge key={h}>{h}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const firstImage = post.images[0];
  const date = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      className="cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all overflow-hidden rounded-xl"
      onClick={onClick}
    >
      {firstImage && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={firstImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className={firstImage ? 'pt-3' : ''}>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm line-clamp-1">{post.title}</h3>
            <span className="text-xs text-muted-foreground shrink-0 ml-2">{date}</span>
          </div>
          {post.body && (
            <p className="text-xs text-muted-foreground line-clamp-2">{post.body}</p>
          )}
          {(post.tags.length > 0 || post.highlights.length > 0) && (
            <div className="flex flex-wrap gap-1">
              {post.highlights.map((h) => (
                <Badge key={h} variant="default" className="text-[10px] px-1.5 py-0">
                  {h}
                </Badge>
              ))}
              {post.tags.map((t) => (
                <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

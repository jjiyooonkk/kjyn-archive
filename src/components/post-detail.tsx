'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Post, SiteMode } from '@/types';

interface PostDetailProps {
  post: Post | null;
  site: SiteMode;
  open: boolean;
  onClose: () => void;
  onEdit: (post: Post) => void;
  onDeleted: (id: string) => void;
}

export default function PostDetail({ post, site, open, onClose, onEdit, onDeleted }: PostDetailProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);

  if (!post) return null;

  const date = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  async function handleDelete() {
    if (!post || !deletePassword) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/posts/${post.id}?site=${site}&password=${encodeURIComponent(deletePassword)}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onDeleted(post.id);
      setConfirmDelete(false);
      setDeletePassword('');
      onClose();
    } catch (e) {
      alert(e instanceof Error ? e.message : '삭제 실패');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => {
      if (!o) {
        setConfirmDelete(false);
        setDeletePassword('');
        onClose();
      }
    }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">{post.title}</DialogTitle>
          <p className="text-xs text-muted-foreground">{date}</p>
        </DialogHeader>

        <div className="space-y-4">
          {post.images.length > 0 && (
            <div className="space-y-2">
              {post.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${post.title} ${i + 1}`}
                  className="w-full rounded-xl"
                />
              ))}
            </div>
          )}

          {post.body && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
          )}

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

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {/* Edit / Delete buttons */}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onEdit(post);
                onClose();
              }}
            >
              수정
            </Button>
            {!confirmDelete ? (
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => setConfirmDelete(true)}
              >
                삭제
              </Button>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
                  className="h-8 text-sm"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={deleting || !deletePassword}
                >
                  {deleting ? '...' : '확인'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setConfirmDelete(false);
                    setDeletePassword('');
                  }}
                >
                  취소
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

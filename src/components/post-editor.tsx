'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { SiteMode, Post } from '@/types';

interface PostEditorProps {
  site: SiteMode;
  open: boolean;
  onClose: () => void;
  onSaved: (post: Post) => void;
  existing?: Post;
  initialBody?: string;
}

export default function PostEditor({
  site,
  open,
  onClose,
  onSaved,
  existing,
  initialBody,
}: PostEditorProps) {
  const [title, setTitle] = useState(existing?.title || '');
  const [body, setBody] = useState(existing?.body || initialBody || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(existing?.tags || []);
  const [highlightInput, setHighlightInput] = useState('');
  const [highlights, setHighlights] = useState<string[]>(existing?.highlights || []);
  const [images, setImages] = useState<string[]>(existing?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(files: FileList) {
    setUploading(true);
    const urls: string[] = [];

    for (const file of Array.from(files)) {
      try {
        // Compress image client-side
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });

        const formData = new FormData();
        formData.append('file', compressed, file.name);
        formData.append('password', password);

        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (res.ok && data.url) {
          urls.push(data.url);
        }
      } catch (e) {
        console.error('Upload failed:', e);
      }
    }

    setImages((prev) => [...prev, ...urls]);
    setUploading(false);
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  }

  function addHighlight() {
    const h = highlightInput.trim();
    if (h && !highlights.includes(h)) setHighlights([...highlights, h]);
    setHighlightInput('');
  }

  function removeImage(idx: number) {
    setImages(images.filter((_, i) => i !== idx));
  }

  async function handleSave() {
    if (!title.trim() || !password) return;
    setSaving(true);

    const url = existing ? `/api/posts/${existing.id}` : '/api/posts';
    const method = existing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site, title, body, tags, highlights, images, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSaved(data);
      onClose();
    } catch (e) {
      alert(e instanceof Error ? e.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{existing ? '수정' : '새 글'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호"
            />
          </div>

          <div className="space-y-2">
            <Label>제목</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
            />
          </div>

          <div className="space-y-2">
            <Label>내용</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="생각을 적어보세요..."
              rows={6}
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>사진</Label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            />
            <div className="flex flex-wrap gap-2">
              {images.map((url, i) => (
                <div key={i} className="relative w-20 h-20 rounded overflow-hidden group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                  >
                    삭제
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading || !password}
                className="w-20 h-20 rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground text-2xl hover:border-muted-foreground/50 transition-colors"
              >
                {uploading ? '...' : '+'}
              </button>
            </div>
          </div>

          {/* Highlights (special characteristics) */}
          <div className="space-y-2">
            <Label>특별한 점</Label>
            <div className="flex gap-2">
              <Input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                placeholder="이 기록만의 특징"
                className="h-8"
              />
              <Button variant="outline" size="sm" onClick={addHighlight}>
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {highlights.map((h) => (
                <Badge
                  key={h}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => setHighlights(highlights.filter((x) => x !== h))}
                >
                  {h} ×
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>태그</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="태그 입력"
                className="h-8"
              />
              <Button variant="outline" size="sm" onClick={addTag}>
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setTags(tags.filter((x) => x !== t))}
                >
                  {t} ×
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={handleSave} disabled={saving || !title.trim() || !password}>
            {saving ? '저장 중...' : existing ? '수정' : '저장'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

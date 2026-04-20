'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import SiteNav from '@/components/site-nav';
import PostCard from '@/components/post-card';
import PostEditor from '@/components/post-editor';
import PostDetail from '@/components/post-detail';
import JournalPrompt from '@/components/journal-prompt';
import { SITES } from '@/types';
import type { SiteMode, Post } from '@/types';
import { detectSiteModeFromHost } from '@/lib/site';

export default function HomePage() {
  const [site, setSite] = useState<SiteMode>('journal');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const [initialBody, setInitialBody] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const host = window.location.hostname;
    setSite(detectSiteModeFromHost(host));
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?site=${site}`);
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [site]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function handleWrite(promptText?: string) {
    setInitialBody(promptText ? `\n\n---\n${promptText}` : '');
    setEditorOpen(true);
  }

  function handleSaved(post: Post) {
    setPosts((prev) => {
      const existing = prev.findIndex((p) => p.id === post.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = post;
        return updated;
      }
      return [post, ...prev];
    });
  }

  const config = SITES[site];

  const filtered = search.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.body.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
          p.highlights.some((h) => h.toLowerCase().includes(search.toLowerCase()))
      )
    : posts;

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading tracking-tight">{config.title}</h1>
          <p className="text-sm text-muted-foreground">{config.subtitle}</p>
        </div>
        <Button size="sm" onClick={() => handleWrite()}>
          + 새 글
        </Button>
      </div>

      <SiteNav current={site} />

      <Separator />

      {/* Journal Prompt */}
      {site === 'journal' && <JournalPrompt onWrite={handleWrite} />}

      {/* Search */}
      <Input
        placeholder="검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs h-8"
      />

      {/* Posts Grid */}
      {loading ? (
        <p className="text-muted-foreground text-center py-12">불러오는 중...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          {search ? '검색 결과가 없습니다.' : '아직 글이 없습니다. 첫 번째 글을 작성해보세요!'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => setDetailPost(post)}
            />
          ))}
        </div>
      )}

      {/* Editor */}
      <PostEditor
        site={site}
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSaved={handleSaved}
        initialBody={initialBody}
      />

      {/* Detail */}
      <PostDetail
        post={detailPost}
        open={!!detailPost}
        onClose={() => setDetailPost(null)}
      />
    </main>
  );
}

import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/posts';
import { checkAuth } from '@/lib/auth';
import type { SiteMode } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = (searchParams.get('site') || 'journal') as SiteMode;
    const posts = await getPosts(site);
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { site, title, body, tags, highlights, images, password } = await request.json();
    if (!checkAuth(password)) {
      return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
    }
    const post = await createPost(site, { title, body, tags: tags || [], highlights: highlights || [], images: images || [] });
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

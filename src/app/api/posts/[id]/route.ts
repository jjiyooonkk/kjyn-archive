import { NextResponse } from 'next/server';
import { getPost, updatePost, deletePost } from '@/lib/posts';
import { checkAuth } from '@/lib/auth';
import type { SiteMode } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const site = (searchParams.get('site') || 'journal') as SiteMode;
    const post = await getPost(site, id);
    if (!post) return NextResponse.json({ error: '찾을 수 없습니다.' }, { status: 404 });
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { site, password, ...data } = await request.json();
    if (!checkAuth(password)) {
      return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
    }
    const post = await updatePost(site, id, data);
    if (!post) return NextResponse.json({ error: '찾을 수 없습니다.' }, { status: 404 });
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const site = (searchParams.get('site') || 'journal') as SiteMode;
    const password = searchParams.get('password') || '';
    if (!checkAuth(password)) {
      return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
    }
    await deletePost(site, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { checkAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const password = formData.get('password') as string;
    if (!checkAuth(password)) {
      return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
    }

    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    const blob = await put(`archive/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // If Blob is not configured, accept data URL fallback
    if (msg.includes('BLOB')) {
      return NextResponse.json({ error: 'Vercel Blob이 설정되지 않았습니다. 이미지 업로드를 사용하려면 Blob을 연결하세요.' }, { status: 500 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

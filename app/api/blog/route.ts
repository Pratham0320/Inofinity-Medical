import { checkAuthorization } from '@/utils/auth';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)/g, '');    
}

export async function GET() {
  try {
    const { data, error } = await supabase.from('blogs').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authCheck = await checkAuthorization(request);
  if (!authCheck.authorized) return authCheck.response;
  try {
    const body = await request.json();
    const { title, description, image, date, content } = body;

    if (!title || !description || !image || !date || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from('blogs').insert([
      {
        title,
        description,
        slug: generateSlug(title),
        content,
        image,
        date,
      },
    ]);

    if (error) {
      console.error('Error inserting data into Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to add blog to database' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Blog added successfully', data },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error handling request:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

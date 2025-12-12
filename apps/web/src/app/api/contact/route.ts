import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // - Send an email using a service like SendGrid, Resend, etc.
    // - Save to a database
    // - Send to a webhook
    // For now, we'll just return success

    return NextResponse.json({ ok: true, received: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}


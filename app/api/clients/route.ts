import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(clients);
  } catch {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, notes } = body;
    if (!name?.trim()) return NextResponse.json({ error: 'Client name is required.' }, { status: 400 });

    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        notes: notes?.trim() || null,
      },
    });
    return NextResponse.json(client, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save client.' }, { status: 500 });
  }
}

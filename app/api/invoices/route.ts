import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { client: true },
      orderBy: { dueDate: 'asc' },
    });
    return NextResponse.json(invoices);
  } catch {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { number, issueDate, dueDate, description, amount, clientId, status = 'DRAFT' } = body;
    if (!number || !issueDate || !dueDate || !description || amount === undefined || !clientId) {
      return NextResponse.json({ error: 'number, dates, description, amount, and clientId are required.' }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
      data: {
        number: String(number),
        issueDate: new Date(issueDate),
        dueDate: new Date(dueDate),
        description: String(description),
        amount: String(amount),
        clientId: String(clientId),
        status,
      },
      include: { client: true },
    });
    return NextResponse.json(invoice, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save invoice. Check that the invoice number is unique.' }, { status: 500 });
  }
}

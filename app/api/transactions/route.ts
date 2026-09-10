import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();
    const type = searchParams.get('type');

    const transactions = await prisma.transaction.findMany({
      where: {
        ...(type === 'INCOME' || type === 'EXPENSE' ? { type } : {}),
        ...(query
          ? {
              OR: [
                { description: { contains: query, mode: 'insensitive' } },
                { category: { contains: query, mode: 'insensitive' } },
                { account: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { date: 'desc' },
      take: 100,
      include: { client: true },
    });

    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json({ error: 'Database is not configured.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, description, category, account, amount, type, clientId } = body;

    if (!date || !description || !category || !account || amount === undefined || !['INCOME', 'EXPENSE'].includes(type)) {
      return NextResponse.json({ error: 'date, description, category, account, amount, and type are required.' }, { status: 400 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        date: new Date(date),
        description: String(description),
        category: String(category),
        account: String(account),
        amount: String(amount),
        type,
        clientId: clientId || null,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Unable to save transaction.' }, { status: 500 });
  }
}

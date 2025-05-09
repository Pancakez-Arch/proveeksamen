import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { RentalRequest } from '@/models/RentalRequest';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const requests = await RentalRequest.find()
      .sort({ createdAt: -1 })
      .populate('equipmentId', 'name');

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching rental requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { equipmentId, startDate, endDate, customerName, customerEmail, customerPhone } = body;

    await connectToDatabase();
    const rentalRequest = await RentalRequest.create({
      equipmentId,
      startDate,
      endDate,
      customerName,
      customerEmail,
      customerPhone,
      status: 'pending',
    });

    return NextResponse.json({ request: rentalRequest }, { status: 201 });
  } catch (error) {
    console.error('Error creating rental request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
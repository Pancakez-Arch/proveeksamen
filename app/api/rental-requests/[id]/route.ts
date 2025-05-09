import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { RentalRequest } from '@/models/RentalRequest';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    await connectToDatabase();
    const rentalRequest = await RentalRequest.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).populate('equipmentId', 'name');

    if (!rentalRequest) {
      return NextResponse.json(
        { error: 'Rental request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ request: rentalRequest });
  } catch (error) {
    console.error('Error updating rental request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
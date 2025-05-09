import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import RentalRequest from '@/app/models/RentalRequest';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const rentalRequest = await RentalRequest.create({
      equipmentId: body.equipmentId,
      startDate: body.startDate,
      endDate: body.endDate,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone,
      status: 'pending',
    });

    return NextResponse.json(rentalRequest);
  } catch (error) {
    console.error('Error creating rental request:', error);
    return NextResponse.json(
      { error: 'Failed to create rental request' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status') || 'all';
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = status === 'all' ? {} : { status };
    
    const [requests, total] = await Promise.all([
      RentalRequest.find(query)
        .skip(skip)
        .limit(limit)
        .populate('equipmentId')
        .sort({ createdAt: -1 }),
      RentalRequest.countDocuments(query),
    ]);

    return NextResponse.json({
      requests,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching rental requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rental requests' },
      { status: 500 }
    );
  }
} 
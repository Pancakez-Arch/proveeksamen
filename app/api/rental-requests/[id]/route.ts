import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendRentalStatusEmail } from '@/lib/email';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const updatedRequest = await db.rentalRequest.update({
      where: { id: params.id },
      data: { status: body.status },
      include: {
        equipment: true,
      },
    });

    // Send email notification
    await sendRentalStatusEmail(
      updatedRequest.customerEmail,
      body.status,
      updatedRequest.equipment.name
    );

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error updating rental request:', error);
    return NextResponse.json(
      { error: 'Failed to update rental request' },
      { status: 500 }
    );
  }
} 
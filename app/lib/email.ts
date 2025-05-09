import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRentalStatusEmail(
  email: string,
  status: 'approved' | 'denied',
  equipmentName: string
) {
  try {
    await resend.emails.send({
      from: 'your-email@domain.com',
      to: email,
      subject: `Rental Request ${status === 'approved' ? 'Approved' : 'Denied'}`,
      html: `
        <h1>Rental Request Update</h1>
        <p>Your rental request for ${equipmentName} has been ${status}.</p>
        ${status === 'approved' ? '<p>Please come to our office to complete the rental process.</p>' : ''}
      `,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
} 
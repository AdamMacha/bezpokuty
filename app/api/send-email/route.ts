import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, language } = await request.json();

    const subject = language === 'cs' 
      ? 'Potvrzení objednávky - Pojištění na pokuty'
      : 'Order Confirmation - Traffic Ticket Insurance';

    const htmlContent = language === 'cs'
      ? `
        <h1>Děkujeme za Vaši objednávku, ${firstName}!</h1>
        <p>Vaše pojištění na pokuty bylo úspěšně aktivováno.</p>
        <p>V případě jakýchkoliv dotazů nás neváhejte kontaktovat.</p>
        <br/>
        <p>S pozdravem,</p>
        <p>Tým Pojištění na pokuty</p>
      `
      : `
        <h1>Thank you for your order, ${firstName}!</h1>
        <p>Your traffic ticket insurance has been successfully activated.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <br/>
        <p>Best regards,</p>
        <p>Traffic Ticket Insurance Team</p>
      `;

    const data = await resend.emails.send({
      from: 'Pojištění na pokuty <noreply@solanababylon.com>',
      to: email,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
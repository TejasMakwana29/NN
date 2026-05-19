import nodemailer from 'nodemailer';

function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.ADMIN_EMAIL
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function companyName() {
  return process.env.COMPANY_NAME || 'Manish Scale';
}

function mailFrom() {
  return process.env.MAIL_FROM || `"${companyName()}" <${process.env.SMTP_USER}>`;
}

function formatQuoteDetails(quote) {
  return `
Name: ${quote.name}
Email: ${quote.email}
Phone: ${quote.phone || '—'}
Company: ${quote.company || '—'}
Products interested in:
${quote.products}

Additional requirements:
${quote.message || '—'}
`.trim();
}

export async function sendQuoteEmails(quote) {
  if (!isMailConfigured()) {
    console.warn(
      '[mail] SMTP not configured. Set SMTP_* and ADMIN_EMAIL in backend/.env to enable emails.'
    );
    return { adminSent: false, customerSent: false, configured: false };
  }

  const transporter = createTransporter();
  const from = mailFrom();
  const adminEmail = process.env.ADMIN_EMAIL;
  const details = formatQuoteDetails(quote);

  const adminMail = {
    from,
    to: adminEmail,
    subject: `New quote request — ${quote.id} (${quote.name})`,
    text: `You have received a new quote request.\n\nReference: ${quote.id}\nSubmitted: ${quote.createdAt}\n\n${details}`,
    html: `
      <h2>New quote request</h2>
      <p><strong>Reference:</strong> ${quote.id}</p>
      <p><strong>Submitted:</strong> ${new Date(quote.createdAt).toLocaleString()}</p>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${quote.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${quote.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${quote.phone || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td><td style="padding:8px;border:1px solid #ddd">${quote.company || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Products</strong></td><td style="padding:8px;border:1px solid #ddd">${quote.products.replace(/\n/g, '<br>')}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Requirements</strong></td><td style="padding:8px;border:1px solid #ddd">${(quote.message || '—').replace(/\n/g, '<br>')}</td></tr>
      </table>
    `,
  };

  const customerMail = {
    from,
    to: quote.email,
    subject: `We received your quote request — ${quote.id}`,
    text: `Dear ${quote.name},

Thank you for contacting ${companyName()}.

We have received your quote request (Reference: ${quote.id}) and our team will review your requirements shortly.

We will get back to you within 24 hours with a customized quote.

If you have urgent questions, call us at +91 92844 05090 or reply to this email.

Best regards,
${companyName()} Team`,
    html: `
      <p>Dear <strong>${quote.name}</strong>,</p>
      <p>Thank you for contacting <strong>${companyName()}</strong>.</p>
      <p>We have received your quote request and our team will review your requirements shortly.</p>
      <p style="background:#f3f4f6;padding:12px;border-radius:8px">
        <strong>Your reference ID:</strong> ${quote.id}
      </p>
      <p>We will get back to you within <strong>24 hours</strong> with a customized quote.</p>
      <p>If you have urgent questions, call <strong>+91 92844 05090</strong> or reply to this email.</p>
      <p>Best regards,<br><strong>${companyName()} Team</strong></p>
    `,
  };

  const [adminResult, customerResult] = await Promise.allSettled([
    transporter.sendMail(adminMail),
    transporter.sendMail(customerMail),
  ]);

  if (adminResult.status === 'rejected') {
    console.error('[mail] Admin notification failed:', adminResult.reason);
  }
  if (customerResult.status === 'rejected') {
    console.error('[mail] Customer confirmation failed:', customerResult.reason);
  }

  return {
    configured: true,
    adminSent: adminResult.status === 'fulfilled',
    customerSent: customerResult.status === 'fulfilled',
  };
}

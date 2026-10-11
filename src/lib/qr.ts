import QRCode from 'qrcode';

export async function generateQrCode(payload: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      width: 320,
      color: {
        dark: '#0F172A', // Deep navy
        light: '#FFFFFF', // Pure white
      },
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}

export function createVerificationToken(registrationId: string, email: string): string {
  // Deterministic yet tamper-evident lightweight token
  const raw = `${registrationId}::${email}::VB2047_IGNTU_SECRET`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `VBTOK-${Math.abs(hash).toString(36).toUpperCase()}-${registrationId}`;
}

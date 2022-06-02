export function decodeBase64(val: string): string {
  if (!val) {
    return '';
  }

  const certBuffer = Buffer.from(val, 'base64');
  return certBuffer.toString('ascii');
}

export function encodeBase64(val: string): string {
  return Buffer.from(val).toString('base64');
}

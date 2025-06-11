import fs from 'fs/promises';

async function encodeBase64() {
  try {
    const file = await fs.readFile('./serviceAccountKey.json', 'utf8');
    const base64Encoded = Buffer.from(file).toString('base64');
    console.log(base64Encoded);
  } catch (error) {
    console.error('Error reading or encoding file:', error);
  }
}

encodeBase64();

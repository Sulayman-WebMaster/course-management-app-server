
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';


async function initFirebaseAdmin() {
  const serviceAccountRaw = await readFile(new URL('../serviceAccountKey.json', import.meta.url), 'utf-8');
  const serviceAccount = JSON.parse(serviceAccountRaw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}


await initFirebaseAdmin();

export default admin;

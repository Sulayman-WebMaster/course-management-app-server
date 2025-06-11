// import firebase-admin using ES module syntax
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

// async function to load and parse service account JSON
async function initFirebaseAdmin() {
  const serviceAccountRaw = await readFile(new URL('../serviceAccountKey.json', import.meta.url), 'utf-8');
  const serviceAccount = JSON.parse(serviceAccountRaw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

// call the async initializer (you can export admin after that)
await initFirebaseAdmin();

export default admin;



// import admin, { auth, firestore } from 'firebase-admin';
// import serviceAccount from '../../../serviceAccountKey.json'; // Certifique-se de que o caminho está correto

// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert({
//           projectId: serviceAccount.project_id,
//           clientEmail: serviceAccount.client_email,
//           privateKey: serviceAccount.private_key
//         }
//       ),
//     });
//   admin.firestore().settings({ignoreUndefinedProperties: true})
// }

// export const db = admin.firestore();


// export async function verifyToken(token: string, checkRevoked?: boolean) {
//   const decodedToken = await auth().verifyIdToken(token, checkRevoked);

//   if(decodedToken){
//     return true
//   } else {
//     return false
//   }
// }
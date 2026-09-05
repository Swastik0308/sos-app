//user model
// user model
import { db, admin } from "../config/firebase.js";

const COLLECTION = "users";
const userCollection = db.collection(COLLECTION);

/**
 * User docs are keyed by the Firebase Auth uid, so this model never
 * generates its own ID — it mirrors the auth record and adds the
 * app-specific fields needed for the mesh (device binding, public key for
 * RSA envelope encryption, FCM token for the internet-escalation path).
 */
const buildUserDoc = (payload) => ({
  name: payload.name || "",
  email: payload.email || "",
  phone: payload.phone || "",
  deviceId: payload.deviceId || null,
  publicKey: payload.publicKey || null,
  fcmToken: payload.fcmToken || null,
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
});

export const createUser = async (uid, payload) => {
  const docRef = userCollection.doc(uid);
  await docRef.set(buildUserDoc(payload));
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
};

export const getUserById = async (uid) => {
  const doc = await userCollection.doc(uid).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const getUserByDeviceId = async (deviceId) => {
  const snapshot = await userCollection
    .where("deviceId", "==", deviceId)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const updateUser = async (uid, updates) => {
  const docRef = userCollection.doc(uid);
  await docRef.update({
    ...updates,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
};

export const updateFcmToken = async (uid, fcmToken) =>
  updateUser(uid, { fcmToken });

export const deleteUser = async (uid) => {
  await userCollection.doc(uid).delete();
};

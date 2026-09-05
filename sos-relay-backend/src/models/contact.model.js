// contact model
import { db, admin } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";

const COLLECTION = "contacts";
const contactCollection = db.collection(COLLECTION);

/**
 * Emergency contacts are the people notified once an SOS reaches a gateway
 * with internet and gets escalated (FCM push / SMS via notification
 * service). Stored flat with an ownerId rather than as a subcollection of
 * users, so sos.service.js can batch-fetch and notify in one query.
 */
const buildContactDoc = (ownerId, payload) => ({
  ownerId,
  name: payload.name,
  phone: payload.phone,
  relationship: payload.relationship || "",
  priority: payload.priority ?? 1,
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
});

export const addContact = async (ownerId, payload) => {
  const contactId = uuidv4();
  const data = buildContactDoc(ownerId, payload);
  await contactCollection.doc(contactId).set(data);
  return { id: contactId, ...data };
};

export const getContactById = async (contactId) => {
  const doc = await contactCollection.doc(contactId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const getContactsByUser = async (ownerId) => {
  const snapshot = await contactCollection
    .where("ownerId", "==", ownerId)
    .orderBy("priority", "asc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateContact = async (contactId, updates) => {
  const docRef = contactCollection.doc(contactId);
  await docRef.update(updates);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
};

export const deleteContact = async (contactId) => {
  await contactCollection.doc(contactId).delete();
};

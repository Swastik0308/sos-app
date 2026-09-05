//sos model
// sos model
import { db, admin } from "../config/firebase.js";

const COLLECTION = "sos_alerts";
const sosCollection = db.collection(COLLECTION);

export const SOS_STATUS = {
  ACTIVE: "active",
  RELAYED: "relayed",
  ESCALATED: "escalated",
  RESOLVED: "resolved",
  EXPIRED: "expired",
};

/**
 * Normalizes an incoming SOS packet (from a device or a gateway relaying
 * on its behalf) into the Firestore document shape. messageId is always
 * generated on-device, never here — that's what makes de-duplication work
 * across the mesh, matching the same messageId caches used for TTL/flood
 * control on the devices themselves.
 */
const buildSOSDoc = (packet) => ({
  messageId: packet.messageId,
  userId: packet.userId,
  emergencyType: packet.emergencyType,
  message: packet.message || "",
  location: {
    lat: packet.location?.lat ?? null,
    lng: packet.location?.lng ?? null,
  },
  ttl: packet.ttl ?? 5,
  hopCount: packet.hopCount ?? 0,
  originDeviceId: packet.originDeviceId || null,
  relayPath: packet.relayPath || [],
  encryptedPayload: packet.encryptedPayload || null,
  status: SOS_STATUS.ACTIVE,
  escalatedToInternet: false,
  deviceTimestamp: packet.timestamp,
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  resolvedAt: null,
});

/**
 * Creates an SOS alert doc keyed by messageId, so a duplicate write of the
 * same alert (e.g. two gateways syncing the same relayed packet) overwrites
 * instead of duplicating. Callers should check sosExists() first if they
 * need to distinguish "new alert" from "already seen" for relay logic.
 */
export const createSOSAlert = async (packet) => {
  const data = buildSOSDoc(packet);
  await sosCollection.doc(packet.messageId).set(data, { merge: false });
  return { id: packet.messageId, ...data };
};

export const getSOSByMessageId = async (messageId) => {
  const doc = await sosCollection.doc(messageId).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const sosExists = async (messageId) => {
  const doc = await sosCollection.doc(messageId).get();
  return doc.exists;
};

export const updateSOSStatus = async (messageId, status, extra = {}) => {
  const docRef = sosCollection.doc(messageId);
  await docRef.update({
    status,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    ...(status === SOS_STATUS.RESOLVED && {
      resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
    }),
    ...extra,
  });
  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
};

/**
 * Called when a gateway reports it forwarded/received a hop for this
 * message. Bumps hopCount and appends the relaying device to relayPath.
 */
export const appendRelayHop = async (messageId, deviceId) => {
  const docRef = sosCollection.doc(messageId);
  await docRef.update({
    hopCount: admin.firestore.FieldValue.increment(1),
    relayPath: admin.firestore.FieldValue.arrayUnion(deviceId),
    status: SOS_STATUS.RELAYED,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
};

export const markEscalated = async (messageId) => {
  const docRef = sosCollection.doc(messageId);
  await docRef.update({
    escalatedToInternet: true,
    status: SOS_STATUS.ESCALATED,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
};

export const getActiveAlerts = async () => {
  const snapshot = await sosCollection
    .where("status", "in", [
      SOS_STATUS.ACTIVE,
      SOS_STATUS.RELAYED,
      SOS_STATUS.ESCALATED,
    ])
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getAlertsByUser = async (userId) => {
  const snapshot = await sosCollection
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

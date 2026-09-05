//relay model
// relay model
import { db, admin } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";

const COLLECTION = "relay_logs";
const relayCollection = db.collection(COLLECTION);

/**
 * A relay log is a separate, append-only record of each hop a message took
 * through the mesh — distinct from sos.relayPath (which just lists device
 * IDs on the alert itself). Gateways push these when they sync, so the
 * dashboard can reconstruct hop-by-hop timing and per-device relay stats.
 */
export const logRelayEvent = async ({
  messageId,
  relayedBy,
  receivedFrom = null,
  hopNumber,
  location = null,
  deliveredToGateway = false,
}) => {
  const relayId = uuidv4();
  const data = {
    relayId,
    messageId,
    relayedBy,
    receivedFrom,
    hopNumber,
    location,
    deliveredToGateway,
    relayedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  await relayCollection.doc(relayId).set(data);
  return { id: relayId, ...data };
};

export const getRelayHistoryByMessageId = async (messageId) => {
  const snapshot = await relayCollection
    .where("messageId", "==", messageId)
    .orderBy("hopNumber", "asc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getRelayStatsByDevice = async (deviceId) => {
  const snapshot = await relayCollection
    .where("relayedBy", "==", deviceId)
    .get();
  const logs = snapshot.docs.map((doc) => doc.data());
  return {
    deviceId,
    totalRelayed: logs.length,
    deliveredToGateway: logs.filter((l) => l.deliveredToGateway).length,
  };
};

export const deleteRelayLogsByMessageId = async (messageId) => {
  const snapshot = await relayCollection
    .where("messageId", "==", messageId)
    .get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
};

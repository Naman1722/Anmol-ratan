// server/services/authService.js

// server/services/authService.js
import admin from "../config/firebase-admin-config.js";
import { User } from "#models/user.js";

export const adminAuth = admin.auth();

/* -----------------------------------------------------------
   VERIFY ID TOKEN (helper, NOT middleware)
----------------------------------------------------------- */
export async function verifyIdToken(idToken) {
  if (!idToken) throw new Error("Missing idToken");
  return adminAuth.verifyIdToken(idToken);
}

/* -----------------------------------------------------------
   USER HELPERS
----------------------------------------------------------- */
export async function findUserByPhone(phoneNumber) {
  return User.findOne({ phoneNumber }).select("-__v");
}

export async function createOrUpdateUser({ uid, phoneNumber, username }) {
  let user = await User.findOne({ phoneNumber });

  if (user) {
    if (!user.firebaseUid && uid) {
      user.firebaseUid = uid;
      await user.save();
    }
    return user;
  }

  user = new User({
    username: username || phoneNumber,
    phoneNumber,
    firebaseUid: uid,
    isAllowed: true, // Auto-whitelist (change if needed)
  });

  await user.save();
  return user;
}

export async function isUserAllowed(phoneNumber) {
  const user = await User.findOne({ phoneNumber });
  return user ? !!user.isAllowed : false;
}

/* -----------------------------------------------------------
   LOGIN WITH FIREBASE (core login flow)
----------------------------------------------------------- */
export async function loginWithIdToken(idToken, username) {
  const decoded = await verifyIdToken(idToken);

  const uid = decoded.uid;
  const phoneNumber = decoded.phone_number;

  if (!phoneNumber) {
    throw new Error("Token does not contain a phone_number");
  }

  const user = await createOrUpdateUser({
    uid,
    phoneNumber,
    username,
  });

  const allowed = await isUserAllowed(phoneNumber);

  return {
    ok: true,
    user,
    firebaseUid: uid,
    phoneNumber,
    allowed,
  };
}

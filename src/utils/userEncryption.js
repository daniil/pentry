import Crypto from 'simple-crypto-js';
import { ENCRYPT_KEY } from '../App';
let crypto;

export const initEncryption = () => {
  if (crypto) return true;
  crypto = new Crypto(ENCRYPT_KEY);
  return true;
}

export const encryptUser = username => initEncryption() && crypto.encrypt(username);

export const decryptUser = username => {
  try {
    return initEncryption() && crypto.decrypt(username);
  } catch (e) {
    return false;
  }
};
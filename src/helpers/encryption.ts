import CryptoJS from "crypto-js";

const APP_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? "";

/**
 * This is used to encrypt data, the function uses the AES algorithm to encrypt the
 * passed data into a string. To ensure whatever is passed is encrypted, data is
 * first converted to JSON and then after that the passed data gets encrypted
 * @param data any
 * @param key string
 */
export function encrypto(data: any, key: string = APP_KEY): string | undefined {
  try {
    // encrypt data and return as a string
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

/**
 * This is used to decrypt encrypted data, function uses the AES algorithm to decrypt the
 * passed back to understandable data. It is also assumed that the encrypted data was first
 * converted to JSON before encryption to a JSON parse will be attempted on the cypher text
 * after decryption.
 * @param data string
 * @param key string
 */
export function decrypto<R = any>(cypherText: string, key: string = APP_KEY): R | undefined {
  try {
    // decrypt cypher text to bytes
    const bytes = CryptoJS.AES.decrypt(cypherText, key);
    // JSON parse decrypted cypher text and return as original data
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

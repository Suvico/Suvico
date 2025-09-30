// utils/crypto.js
const crypto = require("crypto");

const AES_KEY = Buffer.from(process.env.AES_KEY, "utf8"); // Or base64 decode if bank gave base64

function encryptAES(text) {
  const cipher = crypto.createCipheriv("aes-256-ecb", AES_KEY, null);
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return "\\x" + encrypted;
}

function decryptAES(hexStr) {
  let hex = hexStr.startsWith("\\x") ? hexStr.slice(2) : hexStr;
  const decipher = crypto.createDecipheriv("aes-256-ecb", AES_KEY, null);
  decipher.setAutoPadding(true);
  let decrypted = decipher.update(hex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function generateChecksum(acctNo, startDate, expiryDate, debitAmount, maxAmount) {
  const data = [acctNo, startDate, expiryDate || "", debitAmount || "", maxAmount || ""].join("|");
  return crypto.createHash("sha256").update(data).digest("hex");
}

module.exports = { encryptAES, decryptAES, generateChecksum };

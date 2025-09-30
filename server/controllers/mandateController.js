const Mandate = require('../model/Mandate');
require('dotenv').config();
/**
 * Expected frontend payload:
 * {
 *  msgId,
 *  Customer_Name,        // encrypted string (hex with "\x" prefix)
 *  Customer_Mobile,      // encrypted (or "")
 *  Customer_EmailId,     // encrypted (or "")
 *  Customer_AccountNo,   // encrypted
 *  Short_Code,           // encrypted
 *  UtilCode,             // encrypted
 *  Customer_StartDate,
 *  Customer_ExpiryDate,
 *  Customer_DebitAmount,
 *  Customer_MaxAmount,
 *  Customer_DebitFrequency,
 *  Customer_SequenceType,
 *  Customer_InstructedMemberId,
 *  Merchant_Category_Code,
 *  Channel,
 *  Filler5,
 *  CheckSum              // SHA-256 hex computed by frontend (on plaintext concatenation)
 * }
 */

exports.saveMandate = async (req, res) => {
  try {
    const payload = req.body;
    // Additional business validation can be added here
    // Store as-is (encrypted fields already encrypted by frontend)
    const mandate = await Mandate.create(payload);
    return res.status(201).json({ success: true, id: mandate._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getMandate = async (req, res) => {
  try {
    const id = req.params.id;
    const mandate = await Mandate.findById(id).lean();
    if (!mandate) return res.status(404).json({ error: "Mandate not found" });
    return res.json(mandate);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};


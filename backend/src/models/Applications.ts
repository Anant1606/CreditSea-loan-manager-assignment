// backend/src/models/Application.ts
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  loanAmount: { type: Number, required: true },
  purpose:    { type: String, required: true },
  status:     { type: String, default: 'Pending' }, // Pending/Approved/Rejected
  createdAt:  { type: Date, default: Date.now },

  // New financial fields:
  disbursedAmount: { type: Number, default: 0 },
  receivedAmount:  { type: Number, default: 0 },
  savings:         { type: Number, default: 0 },
  repaid:          { type: Boolean, default: false },
  otherAccounts:   { type: Number, default: 0 }
});

export default mongoose.model('Application', applicationSchema);

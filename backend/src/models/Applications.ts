import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Approved/Rejected
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    loanAmount: '',
    purpose: ''
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/applications', {
      ...formData,
      loanAmount: parseFloat(formData.loanAmount)
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-textPrimary text-center">
          Loan Application
        </h2>

        {/* Inputs */}
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="loanAmount"
          type="number"
          placeholder="Loan Amount"
          value={formData.loanAmount}
          onChange={handleChange}
          required
        />
        <select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
        >
          <option value="">Select Purpose</option>
          <option>Education</option>
          <option>Medical</option>
          <option>Business</option>
          <option>Personal</option>
        </select>

        {/* Submit Button */}
        <button type="submit" className="w-full btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

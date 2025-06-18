import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // 👈 Add this import

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
    navigate('/dashboard/user');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Loan Application</h2>

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

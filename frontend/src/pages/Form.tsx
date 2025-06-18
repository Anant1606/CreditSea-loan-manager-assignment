import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api'; // ✅ API instance with baseURL
import './Form.css';

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
    try {
      await api.post('/', {
        ...formData,
        loanAmount: parseFloat(formData.loanAmount)
      });
      navigate('/dashboard/user');
    } catch (error: any) {
      console.error('Submission error:', error.response?.data || error.message);
      alert('Failed to submit application. Please try again.');
    }
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

import React from 'react';
import './RecentLoansTable.css';

interface RecentLoansTableProps {
  loans: {
    name?: string;
    email?: string;
    loanAmount: number;
    status: string;
    createdAt: string;
  }[];
  isVerifier?: boolean;
}

export default function RecentLoansTable({
  loans,
  isVerifier = false
}: RecentLoansTableProps) {
  return (
    <div className="recent-loans-container">
      <h2 className="recent-loans-title">Recent Loans</h2>
      <table className="recent-loans-table">
        <thead>
          <tr>
            {isVerifier && (
              <>
                <th>Name</th>
                <th>Email</th>
              </>
            )}
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            {isVerifier && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, i) => (
            <tr key={i}>
              {isVerifier && (
                <>
                  <td>{loan.name}</td>
                  <td>{loan.email}</td>
                </>
              )}
              <td>₹{loan.loanAmount}</td>
              <td>{loan.status}</td>
              <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
              {isVerifier && (
                <td>
                  <button className="btn-primary">Review</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

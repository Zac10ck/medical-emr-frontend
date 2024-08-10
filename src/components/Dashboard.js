import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordList from './RecordList';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [totals, setTotals] = useState({
    totalPatients: 0,
    totalVisits: 0,
    // Add other totals as needed
  });

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/records');
      setRecords(response.data);
      calculateTotals(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const calculateTotals = (records) => {
    const totalPatients = records.length;
    const totalVisits = records.reduce((sum, record) => sum + 1, 0);
    // Calculate other totals as needed
    setTotals({ totalPatients, totalVisits });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Medical EMR Dashboard</h1>
      <div className="cards">
        <div className="card">
          <h3>Total Patients</h3>
          <p>{totals.totalPatients}</p>
        </div>
        <div className="card">
          <h3>Total Visits</h3>
          <p>{totals.totalVisits}</p>
        </div>
        {/* Add more cards as needed */}
      </div>
      <RecordList records={records} fetchRecords={fetchRecords} />
    </div>
  );
};

export default Dashboard;

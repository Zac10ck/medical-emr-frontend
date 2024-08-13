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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://api.medascloud.com:3000/api/records/');
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterTerm(e.target.value);
  };

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
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filterTerm} onChange={handleFilter}>
          <option value="">Filter by diagnosis</option>
          <option value="diabetes">Diabetes</option>
          <option value="hypertension">Hypertension</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      <RecordList records={records} searchTerm={searchTerm} filterTerm={filterTerm} />
    </div>
  );
};

export default Dashboard;

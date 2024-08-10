import React, { useState } from 'react';

const RecordList = ({ records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Calculate the records to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(records.length / recordsPerPage);

  return (
    <div>
      <h2>Patient Records</h2>
      <ul>
        {currentRecords.map((record) => (
          <li key={record.id}>
            {record.patient_name} - {record.diagnosis} - {record.date_of_visit}
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecordList;

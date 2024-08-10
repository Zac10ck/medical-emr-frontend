import React, { useState } from 'react';
import RecordModal from './RecordModal';

const RecordList = ({ records, searchTerm, filterTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const recordsPerPage = 10;

  // Filter records based on search and filter terms
  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.patient_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTerm ? record.diagnosis.toLowerCase() === filterTerm.toLowerCase() : true;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const openModal = (record) => {
    setSelectedRecord(record);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Patient Records</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Diagnosis</th>
            <th>Date of Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.patient_name}</td>
              <td>{record.diagnosis}</td>
              <td>{record.date_of_visit}</td>
              <td>
                <button onClick={() => openModal(record)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <RecordModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        record={selectedRecord}
      />
    </div>
  );
};

export default RecordList;

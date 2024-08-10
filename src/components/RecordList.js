import React, { useState } from 'react';
import RecordModal from './RecordModal';

const RecordList = ({ records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(records.length / recordsPerPage);

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
      <ul>
        {currentRecords.map((record) => (
          <li key={record.id}>
            {record.patient_name} - {record.diagnosis} - {record.date_of_visit}
            <button onClick={() => openModal(record)}>View Details</button>
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
      <RecordModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        record={selectedRecord}
      />
    </div>
  );
};

export default RecordList;

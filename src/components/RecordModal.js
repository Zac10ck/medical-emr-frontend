import React from 'react';
import Modal from 'react-modal';

const RecordModal = ({ isOpen, onRequestClose, record }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Record Details">
      <h2>Record Details</h2>
      {record ? (
        <div>
          <p><strong>Patient ID:</strong> {record.patient_id}</p>
          <p><strong>Name:</strong> {record.patient_name}</p>
          <p><strong>Date of Birth:</strong> {record.date_of_birth}</p>
          <p><strong>Gender:</strong> {record.gender}</p>
          <p><strong>Contact Number:</strong> {record.contact_number}</p>
          <p><strong>Email:</strong> {record.email}</p>
          <p><strong>Address:</strong> {record.address}</p>
          <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
          <p><strong>Treatment:</strong> {record.treatment}</p>
          <p><strong>Date of Visit:</strong> {record.date_of_visit}</p>
          <p><strong>Doctor Name:</strong> {record.doctor_name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default RecordModal;

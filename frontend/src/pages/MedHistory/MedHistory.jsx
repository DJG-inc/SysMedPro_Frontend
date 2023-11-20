import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./MedHistory.css"; // Import the CSS file for styling

const MedHistory = () => {
  const [patient, setPatient] = useState({}); // Patient data
  const [patientLoaded, setPatientLoaded] = useState(false); // Flag to indicate if the patient data has been loaded
  const [medHistory, setMedHistory] = useState({}); // Medical history data
  const [medHistoryLoaded, setMedHistoryLoaded] = useState(false); // Flag to indicate if the medical history data has been loaded
  const [medReports, setMedReports] = useState([]); // Medical reports data
  const [medReportsLoaded, setMedReportsLoaded] = useState(false); // Flag to indicate if the medical reports data has been loaded
  const navigate = useNavigate(); // Navigate to another page
  const { id } = useParams(); // Get the patient ID from the URL

  const goBack = () => {
    navigate(-1);
  };

  // Fetch the patient data from the API
  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await axios.get(
          `https://sysmedpro-backend.onrender.com/api/v1/patients/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPatient(response.data.patient);
        setPatientLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    getPatient();
  }, [id]); // Dependency on the patient ID

  useEffect(() => {
    const fetchMedHistory = async () => {
      if (patientLoaded) {
        console.log("retrieving med history");
        setMedHistory(patient.medhistory);
        if (patient.medhistory === null) {
          console.log("creating med history");
          try {
            console.log(
              `trying https://sysmedpro-backend.onrender.com/api/v1/medicalhistory/create/${patient.id}`
            );
            const response = await axios.post(
              `https://sysmedpro-backend.onrender.com/api/v1/medicalhistory/create/${patient.id}`,
              {
                // convert the date to a string so that it can be sent to the API
                dor: new Date().toISOString().slice(0, 10),
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            setMedHistory(response.data.medHistory);
            setMedHistoryLoaded(true);
          } catch (err) {
            console.error(err);
          }
        }
        setMedHistoryLoaded(true);
      }
    };

    fetchMedHistory();
  }, [patientLoaded]);

  // Fetch the medical reports data from the medical history data
  useEffect(() => {
    const fetchMedReports = async () => {
      if (medHistoryLoaded) {
        console.log("retrieving med reports");
        setMedReports(medHistory.medreports);
        setMedReportsLoaded(true);
      }
    };
    fetchMedReports();
  }, [medHistoryLoaded]);

  console.log(patient);
  console.log(medHistory);
  console.log(medReports);

  const [isModalOpen, setModalOpen] = useState(false);
  // Additional state for form fields can be added here

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // The handleSubmit function for the medical report modal
  const handleMedReportSubmit = async (event) => {
    event.preventDefault();
  
    // First, display the confirmation dialog
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to submit a medical report",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  
    // Then, after the user has made a choice, check if it was confirmed
    if (confirm.isConfirmed) {
      try {
        const response = await axios.post(
          `https://sysmedpro-backend.onrender.com/api/v1/medicalhistory/create/report/${medHistory.id}`,
          {
            report_details: event.target.report_details.value,
            dor: new Date().toISOString().slice(0, 10),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token needs 'Bearer ' prefix
            },
          }
        );
        setMedReports([...medReports, response.data]);
        closeModal();
        // Handle success here, e.g., show a message to the user or update state
      } catch (err) {
        console.error(err);
        // Handle error here, e.g., show an error message to the user
      }
    }
  };
  
  return (
    <div className="med-history-container">
      <button onClick={goBack} className="back-button">
        Back
      </button>
      <h1>Medical History</h1>
      <div className="patient-data-section">
        <h2>Patient Data</h2>
        <div className="patient-data">
          <div className="patient-data-field">
            <span className="patient-data-label">Name:</span>
            <span className="patient-data-value">{patient.first_name}</span>
          </div>
          <div className="patient-data-field">
            <span className="patient-data-label">Last Name:</span>
            <span className="patient-data-value">{patient.last_name}</span>
          </div>
          <div className="patient-data-field">
            <span className="patient-data-label">Email:</span>
            <span className="patient-data-value">{patient.email}</span>
          </div>
          <div className="patient-data-field">
            <span className="patient-data-label">Phone Number:</span>
            <span className="patient-data-value">{patient.phone}</span>
          </div>
          <div className="patient-data-field">
            <span className="patient-data-label">Address:</span>
            <span className="patient-data-value">{patient.address}</span>
          </div>
          <div className="patient-data-field">
            <span
              className="patient-data-label
            "
            >
              Date of Birth:
            </span>
            <span className="patient-data-value">{patient.dob}</span>
          </div>
        </div>
      </div>
      <button onClick={openModal} className="report-button">
        Create Med Report
      </button>
      <div className="reports">
        <h2>Medical Reports</h2>
        {medReportsLoaded &&
          medReports.map((report, index) => (
            <div key={report.id || index} className="report">
              <div className="report-field">
                <span className="report-label">Date of Report:</span>
                <span className="report-value">{report.dor}</span>
              </div>
              <div className="report-field">
                <span className="report-label">Report Details:</span>
                <span className="report-value">{report.report_details}</span>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Medical Report</h2>
            <form onSubmit={handleMedReportSubmit}>
              <textarea
                name="report_details"
                placeholder="Report Details"
                className="textarea-field"
              ></textarea>
              <button type="submit" className="submit-button">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedHistory;

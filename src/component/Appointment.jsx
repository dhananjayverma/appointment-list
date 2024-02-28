import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarAlt,
  faUserMd,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'; 

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/telematum/7751eec667033ac8acd244542e464e18/raw/d4710c6fb54224a0bd316ecdc5246633aceefce5/todays.json"
      );
      const data = await response.json();
      console.log(data); 
      setAppointments(data.appointments); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments: ", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Today's Appointments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                <FontAwesomeIcon icon={faUserMd} style={styles.icon} /> Patient Name
              </th>
              <th style={styles.th}>
                <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} /> Date
              </th>
              <th style={styles.th}>
                <FontAwesomeIcon icon={faClock} style={styles.icon} /> Time
              </th>
              <th style={styles.th}>
                <FontAwesomeIcon icon={faUserMd} style={styles.icon} /> Doctor
              </th>
              <th style={styles.th}>
                Injury
              </th>
              <th style={styles.th}>
                <FontAwesomeIcon icon={faTools} style={styles.icon} /> Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(appointments) && appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    <div style={{ ...styles.boldName }}>{appointment.patient_name}</div>
                    <div>{appointment.mobile_number}</div>
                  </td>
                  <td style={styles.td}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
                    {appointment.appointment_date}
                  </td>
                  <td style={styles.td}>
                    <FontAwesomeIcon icon={faClock} style={styles.icon} />
                    {appointment.appointment_time}
                  </td>
                  <td style={styles.td}>
                    <FontAwesomeIcon icon={faUserMd} style={styles.icon} />
                    {appointment.doctor}
                  </td>
                  <td style={styles.td}>
                    <button style={styles.button}>{appointment.injury}</button>
                  </td>
                  <td style={styles.td}>
                    <FontAwesomeIcon icon={faTools} style={styles.icon} />
                    {appointment.action}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.td}>
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointment;
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#f7fafc",
    borderRadius: "20px",
    boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    padding: "10px",
    fontSize: "0.875rem",
    color: "#4A5568",
    textTransform: "uppercase",
    borderBottom: "1px solid #CBD5E0",
    backgroundColor: "#EDF2F7",
  },
  td: {
    padding: "10px",
    alignItems: "center",
    borderBottom: "1px solid #CBD5E0",
  },
  icon: {
    marginRight: "10px",
  },
  boldName: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "rgb(220, 220, 220)",
    border: "none",
    color: "black",
    padding: "8px 16px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "14px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",

  },
};


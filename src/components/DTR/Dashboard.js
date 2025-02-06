import React, { useState } from "react";
import "./Dashboard.scss";
import { useAuth } from "../AuthContext";
import { useDeviceSize } from "react-device-sizes";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const sample = {
  "id": 1,
  "username": "dmates0",
  "email": "pcloney0@unblog.fr",
  "password": "gT2}X#%WYWa",
  "employee_info": {
    "id": 1,
    "user_id": 1,
    "first_name": "Athena",
    "last_name": "Froschauer",
    "role": "Account Executive",
    "leave_vacation": 4,
    "leave_sick": 2,
    "leave_bereavement": 5,
    "leave_emergency": 2,
    "leave_offset": 4,
    "leave_cto": 1
  },
  "time_records": [
    {
      "id": 4,
      "employee_id": 1,
      "date": "2024-06-01 04:41:51",
      "time_in": "22:48",
      "time_out": "8:10"
    },
    {
      "id": 7,
      "employee_id": 1,
      "date": "2024-04-29 03:24:05",
      "time_in": "4:40",
      "time_out": "7:29"
    },
    {
      "id": 19,
      "employee_id": 1,
      "date": "2024-06-06 19:13:33",
      "time_in": "3:01",
      "time_out": "18:15"
    },
    {
      "id": 22,
      "employee_id": 1,
      "date": "2024-08-23 15:37:28",
      "time_in": "8:36",
      "time_out": "16:23"
    },
    {
      "id": 23,
      "employee_id": 1,
      "date": "2024-02-06 14:28:51",
      "time_in": "9:22",
      "time_out": "14:08"
    },
    {
      "id": 25,
      "employee_id": 1,
      "date": "2024-06-14 20:04:51",
      "time_in": "12:36",
      "time_out": "3:45"
    }
  ]
}

const DATE_FORMAT = "mm/DD/yyyy"
const Dashboard = ({ user }) => {
  const deviceSize = useDeviceSize();
  const [timeRecord, setTimeRecord] = useState({
    timeIn: null,
    timeOut: null
  });
  const navigate = useNavigate();
  
  let currentDate = moment().format(DATE_FORMAT);
  const {
    xsUp
  } = deviceSize;

  const getTimeNow = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  const redirect = () => { 
    navigate("/");
  }

  const handleTime = () => {
    if (!timeRecord.timeIn) {
      setTimeRecord({
        ...timeRecord,
        timeIn: getTimeNow()
      });
    } else {
      setTimeRecord({
        ...timeRecord,
        timeOut: getTimeNow()
      });
    }
  }

  if (!user) redirect();
  else 
    return (
      <div className="dashboard-container">
        <header className="header">
          <h1>Exam track</h1>
          <nav>
            <ul>
              {xsUp && (
                <>
                  <li>My Request</li>
                  <li>Administration Tools</li>
                </>
              )}
              <li>My Account</li>
            </ul>
          </nav>
        </header>

        <div className="dashboard-content">
          <div className="table-container">
            <div className="table-head">
              <p>My Attendance</p>
              <button className="table-btn" onClick={handleTime}>
                {timeRecord?.timeIn ? "Time Out" : "Time In"}
              </button>
            </div>
            <table>
              <tr>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
              </tr>
              <tr>
                <td>{ currentDate }</td>
                <td>{ timeRecord?.timeIn || "-" }</td>
                <td>{ timeRecord?.timeOut || "-" }</td>
              </tr>
              {user?.time_records?.length && user.time_records.map(record => {
                return (
                <tr>
                  <td>{ record.date }</td>
                  <td>{ record.time_in }</td>
                  <td>{ record.time_out }</td>
                </tr>
                )})}
            </table>
          </div>

          <div className="table-container">
            <div div className="table-head">
              <p>Leave Credits</p>
              <button className="table-btn">Apply</button>
            </div>
            <table>
              <tr>
                <th style={{ textAlign: "center" }}>Leaves</th>
              </tr>
              <tr>
                <td>Vacation</td>
                <td>{ user.employee_info.leave_vacation }</td>
              </tr>
              <tr>
                <td>Sick</td>
                <td>{ user.employee_info.leave_sick }</td>
              </tr>
              <tr>
                <td>Bereavement</td>
                <td>{ user.employee_info.leave_bereavement }</td>
              </tr>
              <tr>
                <td>Emergency Leave</td>
                <td>{ user.employee_info.leave_emergency }</td>
              </tr>
              <tr>
                <td>Offset Leave</td>
                <td>{ user.employee_info.leave_offset }</td>
              </tr>
              <tr>
                <td>Compensatory Time Off</td>
                <td>{ user.employee_info.leave_cto }</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    )
}
export default Dashboard;
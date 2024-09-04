import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import "./Kudos.css";

function GiveKudos() {
  const [message, setMessage] = useState("");
  const [recipientId, setRecipient] = useState("");
  const [badge, setBadge] = useState("");
  const [employees, setEmployees] = useState([]);
  const Navigate=useNavigate()

  // Fetch all employees when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/allEmployees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data); // Assuming `data` is an array of employees
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!recipientId || !badge || !message) {
      alert("Please complete all fields");
      return;
    }
  
    // Create the payload for the kudos
    const data = {
      recipientId,  // This will contain the selected employee's _id
      badge,
      message,
    };
  
    console.log("Sending Kudos Data:", data);
  
    try {
      // Send kudos data to the backend
      const response = await fetch("http://localhost:5000/api/addKudos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        alert("Kudos sent successfully!");
        // Clear the form fields after successful submission
        setMessage("");
        setRecipient("");
        setBadge("");
        Navigate("/analytics")
      } else {
        // Handle errors from the response
        alert(`Failed to send kudos: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.log("Error sending kudos:", error);
      alert("Failed to send kudos. Please try again.");
    }
  };
  
  return (
    <div className="give-kudos-container">
      <h1 className="text-center text-primary">Give Kudos</h1>
      <form className="kudos-form" onSubmit={handleSubmit}>
        <label htmlFor="select1">Select the User You Want To Give Kudos</label>
        <select
          id="select1"
          value={recipientId} // This ensures that the selected value is reflected in the dropdown
          onChange={(e) => setRecipient(e.target.value)} // Updates recipientId with the selected employee's _id
          required
        >
          <option value="" disabled>
            -- Select User --
          </option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>

        <label htmlFor="select2">Select the Badge You Want To Give</label>
        <select
          id="select2"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          required
        >
          <option value="" disabled>
            -- Select Badge --
          </option>
          <option value="Star Performer">Star Performer</option>
          <option value="Team Player">Team Player</option>
          <option value="Client Focus">Client Focus</option>
          <option value="Innovator">Innovator</option>
          <option value="Leadership">Leadership</option>
        </select>

        <textarea
          placeholder="Write your kudos message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit" className="kudos-btn">
          Send Kudos
        </button>
      </form>
    </div>
  );
}

export default GiveKudos;

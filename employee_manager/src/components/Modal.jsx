import React, { useState } from "react";
// Import CSS for Modal styling

const Modal = ({ isOpen, onClose, onSubmit, employee ,checkIfEmailExists }) => {
  const [name, setName] = useState(employee ? employee.name : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  const [dob, setDob] = useState(employee ? employee.dob : "");
  const [address, setAddress] = useState(employee ? employee.address : "");
  const [photo, setPhoto] = useState(employee ? employee.photo : null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail) {
      alert("Name and Email are required");
      return;
    }

    if (!nameRegex.test(trimmedName)) {
      alert("Name should contain only alphabets and spaces");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      alert("Please enter a valid email address");
      return;
    }
    if(checkIfEmailExists(email)){
      alert("Email already exists");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageBlob = reader.result;
      onSubmit({
        name: trimmedName,
        email: trimmedEmail,
        dob,
        address,
        photo: imageBlob,
      });
      onClose();

      setName("");
      setEmail("");
      setDob("");
      setAddress("");
      setPhoto(null);
    };

    if (photo) {
      reader.readAsDataURL(photo);
    } else {
     
      onSubmit({
        name: trimmedName,
        email: trimmedEmail,
        dob,
        address,
        photo: null,
      });
      onClose();

     
      setName("");
      setEmail("");
      setDob("");
      setAddress("");
      setPhoto(null);
    }
  };

  const handleEmail =(event)=>{
    const email = event.target.value;
    setEmail(email)
  }

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <label className="modal-label">Name:</label>
            <input
              type="text"
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              pattern="[A-Za-z\s]+"
            />
            <label className="modal-label">Email:</label>
            <input
              type="email"
              className="modal-input"
              value={email}
              onChange={handleEmail}
              required
            />
            <label className="modal-label">Date of Birth:</label>
            <input
              type="date"
              className="modal-input"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <label className="modal-label">Address:</label>
            <textarea
              type="text"
              className="modal-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="modal-label">Photo:</label>
            <input
              type="file"
              className="modal-file-input"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <div className="modal-buttons">
              <button type="submit" className="modal-submit-button">
                {employee ? "Edit Employee" : "Add Employee"}
              </button>
              <button
                type="button"
                className="modal-cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;

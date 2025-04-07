import React, { useState } from 'react';

const RegistrationForm = ({ eventTitle, onClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: 'CSE',
    year: '2',
    phone: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.rollNo) newErrors.rollNo = 'Roll number is required';
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save to localStorage
      const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || []);
      registrations.push({
        ...formData,
        eventTitle,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
      
      alert('Registration successful for ${eventTitle}!');
      onClose();
    }
  };

  // Inline styles
  const styles = {
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    form: {
      backgroundColor: 'white',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '600px',
      padding: '25px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#666'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500',
      color: '#444'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px'
    },
    errorInput: {
      borderColor: '#e74c3c'
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '12px',
      marginTop: '5px',
      display: 'block'
    },
    formRow: {
      display: 'flex',
      gap: '15px'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    submitBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px'
    },
    submitBtnHover: {
      backgroundColor: '#2980b9'
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.form}>
        <div style={styles.header}>
          <h2>Register for {eventTitle}</h2>
          <button 
            onClick={onClose} 
            style={styles.closeBtn}
            aria-label="Close registration form"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.name && styles.errorInput)
              }}
              required
            />
            {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.email && styles.errorInput)
              }}
              required
            />
            {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div style={styles.formRow}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Roll Number *</label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.rollNo && styles.errorInput)
                }}
                required
              />
              {errors.rollNo && <span style={styles.errorMessage}>{errors.rollNo}</span>}
            </div>

            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="EEE">Electrical</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Year of Study *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
              </select>
            </div>

            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.phone && styles.errorInput)
                }}
                required
              />
              {errors.phone && <span style={styles.errorMessage}>{errors.phone}</span>}
            </div>
          </div>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              style={{
                width: 'auto',
                ...(errors.agreeTerms && styles.errorInput)
              }}
            />
            <label htmlFor="agreeTerms" style={styles.label}>
              I agree to the terms and conditions *
            </label>
            {errors.agreeTerms && <span style={styles.errorMessage}>{errors.agreeTerms}</span>}
          </div>

          <button 
            type="submit" 
            style={styles.submitBtn}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
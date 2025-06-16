import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "./SIdebar";

/*
const Sidebar = () => {
  return (
    <nav style={styles.sidebar}>
      <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>Admin Panel</h3>
      <ul style={styles.navList}>
        <li style={styles.navItem}><a href="/dashboard" style={styles.navLink}>Dashboard</a></li>
        <li style={styles.navItem}><a href="/settings" style={{ ...styles.navLink, fontWeight: 'bold', color: '#4CAF50' }}>Settings Profile</a></li>
        <li style={styles.navItem}><a href="/users" style={styles.navLink}>Users</a></li>
        <li style={styles.navItem}><a href="/reports" style={styles.navLink}>Reports</a></li>
      </ul>
    </nav>
  );
};
*/
const SettingsProfile = () => {
  // State for profile info including image (base64)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchAdminEmail = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/adminMail');
      if (res.data.success && res.data.emails.length > 0) {
        const emailFromAPI = res.data.emails[0];
        setProfile((prev) => ({ ...prev, email: emailFromAPI }));
        return emailFromAPI;
      } else {
        throw new Error('No admin email found');
      }
    } catch (err) {
      console.error('Failed to fetch admin email:', err.response?.data || err.message);
      setError('❌ Failed to fetch admin email.');
      setLoading(false);
      return null;
    }
  };

  const fetchProfileByEmail = async (email) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/admin/profile?email=${email}`);
      if (res.data && res.data.email) {
        setProfile({
          name: res.data.name || '',
          email: res.data.email,
          phone: res.data.phone || '',
          address: res.data.address || '',
          profileImage: res.data.profileImage || '',
        });
        setMessage('✅ Profile loaded from DB.');
      } else {
        setMessage('ℹ️ Profile not found, you can create one.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setMessage('ℹ️ Profile not found, you can create one.');
      } else {
        console.error('Error fetching profile:', err.response?.data || err.message);
        setError('❌ Error fetching profile.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const createProfile = async () => {
    try {
      setMessage('');
      setError('');
      await axios.post('http://localhost:4000/api/v1/admin/createProfile', profile);
      setMessage('✅ Profile successfully created!');
    } catch (err) {
      console.error('Error creating profile:', err.response?.data || err.message);
      setError('❌ Failed to create new profile with the same Admin ID.');
    }
  };

  const updateProfile = async () => {
    try {
      setMessage('');
      setError('');
      await axios.put('http://localhost:4000/api/v1/admin/updateProfile', profile);
      setMessage('✅ Profile successfully updated!');
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setError('❌ Failed to update profile.');
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const emailFromAPI = await fetchAdminEmail();
      if (emailFromAPI) {
        await fetchProfileByEmail(emailFromAPI);
      }
    };
    initialize();
  }, []);

  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.main}>
        <h2 style={{ marginBottom: '1rem' }}>Admin Settings Profile</h2>

        {loading && <p>🔄 Loading admin email and profile...</p>}

        {!loading && (
          <>
            <form style={styles.form} onSubmit={e => e.preventDefault()}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                />
              </div>

              {profile.profileImage && (
                <div style={styles.imagePreview}>
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    style={styles.image}
                  />
                </div>
              )}

              <div style={styles.buttonGroup}>
                <button type="button" onClick={createProfile} style={{ ...styles.button, backgroundColor: '#4CAF50' }}>
                  Create Profile
                </button>
                <button type="button" onClick={updateProfile} style={{ ...styles.button, backgroundColor: '#2196F3' }}>
                  Update Profile
                </button>
              </div>

              <div style={{ marginTop: 20 }}>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#2c3e50',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
  },
  navItem: {
    marginBottom: '1rem',
  },
  navLink: {
    color: '#bdc3c7',
    textDecoration: 'none',
    fontSize: '1rem',
    display: 'block',
    padding: '0.5rem 0',
  },
  main: {
    flex: 1,
    padding: '2rem 3rem',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    maxWidth: '500px',
  },
  formGroup: {
    marginBottom: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#34495e',
  },
  input: {
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  fileInput: {
    fontSize: '1rem',
  },
  imagePreview: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '1rem',
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default SettingsProfile;

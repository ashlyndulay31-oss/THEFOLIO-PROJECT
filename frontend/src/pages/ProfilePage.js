// frontend/src/pages/ProfilePage.js
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  const [name, setName]   = useState(user?.name || '');
  const [bio, setBio]     = useState(user?.bio  || '');
  const [pic, setPic]     = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg]     = useState('');
  const [msgType, setMsgType] = useState(''); // success | error

  const fileInputRef = useRef(null);

  // ── Handle Profile Update ───────────────────────────────
  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');
    setMsgType('');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);

    try {
      const { data } = await API.put('/auth/profile', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(data);
      setMsg('Profile updated successfully!');
      setMsgType('success');
      setPic(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Profile update error:', err.response || err);
      setMsg(err.response?.data?.message || 'Error updating profile');
      setMsgType('error');
    }
  };

  // ── Handle Password Change ──────────────────────────────
  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    setMsgType('');

    try {
      await API.put('/auth/change-password', {
        currentPassword: curPw,
        newPassword: newPw,
      });
      setMsg('Password changed successfully!');
      setMsgType('success');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      console.error('Password change error:', err.response || err);
      setMsg(err.response?.data?.message || 'Error changing password');
      setMsgType('error');
    }
  };

  // ── Profile Picture Source ──────────────────────────────
  const picSrc = user?.profilePic
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : '/default-avatar.png';

  return (
    <div className="profile-page">
      <h2 style={{textAlign:'center'}} className='font'>My Profile</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src={picSrc} alt="Profile" className="profile-pic font" />
</div>

      {msg && (
        <p className={msgType === 'success' ? 'success-msg' : 'error-msg'}>
          {msg}
        </p>
      )}

      {/* Edit Profile Form */}
      <form onSubmit={handleProfile}>
        <h3 className='font' style={{textAlign:'center'}}>Edit Profile</h3>
        <input
        className='font'
        style={{margin:20}}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Display name"
        />
        <textarea
        className='font'
        style={{margin:20}}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Short bio..."
          rows={3}
        />
        <label style={{marginLeft:20}} className='font'>Change Profile Picture:</label>
        <input
        className='font'
        style={{margin: 20}}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setPic(e.target.files[0])}
        />
        <button type="submit" style={{margin: 20}} className='font'>Save Profile</button>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handlePassword}>
        <h3 style={{marginTop:5, marginLeft:20}} className='font'>Change Password</h3>
        <input
        className='font'
        style={{margin:20}}
          type="password"
          placeholder="Current password"
          value={curPw}
          onChange={(e) => setCurPw(e.target.value)}
          required
        />
        <input
        className='font'
        style={{marginLeft:20, marginRight:20}}
          type="password"
          placeholder="New password (min 6 chars)"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" style={{margin: 20}}className='font'>Change Password</button>
      </form>
    </div>
  );
};

export default ProfilePage;

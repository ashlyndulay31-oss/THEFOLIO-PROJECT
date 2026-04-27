// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import API from '../api/axios';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab]     = useState('users');
  useEffect(() => {
    API.get('/admin/users').then(r => setUsers(r.data));
    API.get('/admin/posts').then(r => setPosts(r.data));
  }, []);
  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map(u => u._id === id ? data.user : u));
  };
  const removePost = async (id) => {
    await API.put(`/admin/posts/${id}/remove`);
    setPosts(posts.map(p => p._id === id ? { ...p, status: 'removed' } : p));
  };
   return (
    <div className='admin-page'>
      <h2 className='font' style={{textAlign: 'center',display:1}}>Admin Dashboard</h2>
      <div className='admin-tabs' style={{textAlign:'center'}}>
        <button onClick={() => setTab('users')} className={tab === 'users' ? 
'active' : ''} style={{textAlign:'center', marginRight: 10}}>
          Members ({users.length})
        </button>
        <button onClick={() => setTab('posts')} className={tab === 'posts' ? 
'active' : ''}>
          All Posts ({posts.length})
        </button>
      </div>
      {tab === 'users' && (
        <table className='border'>
          <div className='preview-content'><div className='preview'>
<thead><tr style={{padding:50}}><th style={{padding:50}}>Name</th><th style={{padding: 50}}>Email</th><th style={{padding:50}}>Status</th><th style={{padding:50}}>Action</th></tr></
thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={`status-badge 
${u.status}`}>{u.status}</span></td>
                <td>
                  <button onClick={() => toggleStatus(u._id)}
                    className={u.status === 'active' ? 'btn-danger' : 'btnsuccess'}>
                    {u.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </div></div>
        </table>
      )}
      {tab === 'posts' && (
        <table className='admin-table'>
          <thead><tr><th>Title</th><th>Author</th><th>Status</th><th>Action</
th></tr></thead>
          <tbody>
            {posts.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.author?.name}</td>
                <td><span className={`status-badge 
${p.status}`}>{p.status}</span></td>
                <td>
                  {p.status === 'published' && (
                    <button className='btn-danger' onClick={() => 
removePost(p._id)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  };
export default AdminPage;
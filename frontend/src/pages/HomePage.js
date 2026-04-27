import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import API from '../api/axios';
import "../style.css";

function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>

      <section className="hero">
        <div className="hero-text font">
          <h1 style={{ textAlign: "center" }}>Welcome to My Portfolio</h1>
          <p style={{ textAlign: "center"}}>
            Exploring my passion for Coding
          </p>
        </div>
      </section>

      <main>
        <div className="preview-container">
          <div className="preview">
            <h2>About My Journey</h2>
            <p>Learn how I got started with Coding and what inspires me.</p>
            <a href="/about">Read More →</a>
          </div>

          <div className="preview">
            <h2>Connect & Resources</h2>
            <p>Find useful resources and ways to reach out.</p>
            <a href="/contact">Explore →</a>
          </div>

          <div className="preview">
            <h2>Join the Community</h2>
            <p>Sign up to stay updated and share your interest.</p>
            <a href="/register">Register →</a>
          </div>
        </div>

        <section>
          <div className="preview-container">
            <div className="preview">
              <h2 style={{textAlign: "center"}} className="keyh2">Key Highlights</h2>
          <ul className="key">
            <li className="key">Highlight 1 about Coding</li>
            <li className="key">Highlight 2 about W3Schools</li>
            <li className="key">Highlight 3 about Stack Overflow</li>
            <li className="key">Highlight 4 about FreeCodeCamp</li>
            
          </ul>
          </div>
            
          </div>
          
        </section>

        <div className='home-page'>
          <h2 className="font">Latest Posts</h2>
          {posts.length === 0 ? (
            <p className="preview-container preview">No posts yet. Be the first to write one!</p>
          ) : (
            <div className='posts-grid'>
              {posts.map(post => (
                <div key={post._id} className='post-card'>
                  {post.image && (
                    <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
                  )}
                  <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                  <p>{post.body.substring(0, 120)}...</p>
                  <small>By {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <button className="theme-toggle font" onClick={toggleTheme}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <footer>
        <p className="previewfoot previewfooter">Contact: email@example.com | Phone: (000) 000-0000                                        © 2026 My Passion Portfolio</p>
      </footer>
    </div>
  );
}

export default HomePage;
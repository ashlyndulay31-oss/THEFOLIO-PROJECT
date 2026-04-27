// frontend/src/pages/SplashPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SplashPage() {
  const [dots, setDots] = useState("");
  const [fade, setFade] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let dotCount = 0;

    const dotInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setDots(".".repeat(dotCount));
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(dotInterval);
      setFade(true);

      setTimeout(() => setShowContent(true), 500);
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!showContent) {
    return (
      <div className={`loader-container ${fade ? "fade-out" : ""}`}>
        <div className="logo"></div>
        <h2 className="font" style={{textAlign: "center"}}>My Passion in Coding</h2>
        <div className="spinner" style={{display:1}}><h2 className="loading-text">
          🖳 Loading<span className="dots">{dots}</span>
        </h2></div>
        
      </div>
    );
  }

  return (
    <div className="splash-page">
      <div className="preview-content">
        <div className="preview margin: 10px map">
        <h1 className="font" style={{textAlign:"center"}}>Welcome to TheFolio</h1>
      <p>A community blog where members share ideas, stories, and inspiration.</p>
</div>
</div>
      
      <div className="splash-actions">
        <div className="preview-container">
          <div className="preview">
            <ul>
              <li className="key"><Link to="/home" className="btn-primary">
          Browse Posts
        </Link></li>
  
        {!user ? (
          <>
            <li className="key"><Link to="/register" className="btn-secondary font">
              Create Account
            </Link></li>
            <li className="key"><Link to="/login" className="btn-secondary font">
              Login
            </Link></li>
          </>
        ) : (
          <Link to="/create-post" className="btn-secondary font">
            Write a Post
          </Link>
        )}</ul>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SplashPage;

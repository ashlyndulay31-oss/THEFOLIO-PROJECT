import React, { useState, useEffect } from "react";
import "../style.css";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() && email.trim() && message.trim()) {
      setMsg("✅ Registration successful!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setMsg("❌ Please complete all fields.");
      alert("Error: Please fill in all required fields before registering.");
    }
  };

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

  return (
    <div>

      <main className="contact-form">

        <h2 className="font">Create Your Account</h2>

        <form onSubmit={handleSubmit}>

          <label className="font">Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="font">Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="font">Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <p
            style={{
              color: msg.includes("successful") ? "green" : "red"
            }}
          >
            {msg}
          </p>

          <input type="submit" value="Register" id="newcolor" />

        </form>
      </main>

      <section>
        <h2 className="contactpage font">Useful Resources</h2>

        <table className="border">
          <div className="preview-content">
            <div className="preview">
          <thead>
            <tr style={{padding: 20}}>
              <th>Resource Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>W3Schools</td>
              <td style={{padding: 20}}>
                Introductory guide to coding basics (HTML, CSS, JavaScript,
                Python, etc.)
              </td>
            </tr>

            <tr>
              <td>Stack Overflow</td>
              <td style={{padding: 20}}>
                Community forum where coding enthusiasts ask questions,
                share solutions, and learn collaboratively.
              </td>
            </tr>

            <tr>
              <td>FreeCodeCamp</td>
              <td style={{padding: 20}}>
                Advanced tutorials and hands-on projects to practice coding
                skills and build real applications.
              </td>
            </tr>
          </tbody>
          </div>
          </div>
        </table>
      </section>

      <section className="map">
        <h2 style={{marginBottom: 40}}className="font">Find Us</h2>

        <iframe
          src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="300"
          title="map"
        />
      </section>

      <section className="lengths">
        <h2  style={{marginBottom: 40}}className="font">Explore More</h2>
        <div className="preview-content">
          <div className="preview">
          <ul className="key">
          <li className="key" style={{marginLeft: 50}}>
            <a href="https://www.w3schools.com/" target="_blank" rel="noreferrer">
              Official W3Schools Website
            </a>
          </li>

          <li className="key">
            <a
              href="https://www.freecodecamp.org/learn/2022/responsive-web-design/"
              target="_blank"
              rel="noreferrer"
            >
              Educational Resource
            </a>
          </li>

          <li className="key">
            <a
              href="https://stackoverflow.com/questions"
              target="_blank"
              rel="noreferrer"
            >
              Community Hub
            </a>
          </li>
        </ul>
        </div>
        </div>
        
      </section>

      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <footer>
        <p className="previewfoot previewfooter">Contact: email@example.com | Phone: (000) 000-0000                                        © 2026 My Passion Portfolio</p>
      </footer>
    </div>
  );
}

export default ContactPage;
import React, { useState, useEffect } from "react";
import "../style.css";


function AboutPage() {
  const quiz = [
    {
      q: "Which symbol is used for single-line comments in JavaScript?",
      a: ["//", "/*", "#", "<!--"],
      correct: 0
    },
    {
      q: "What does '===' check in JavaScript?",
      a: [
        "Equality of values only",
        "Equality of values and type",
        "Assignment of values",
        "Comparison of memory addresses"
      ],
      correct: 1
    },
    {
      q: "Which keyword is used to declare a constant in JavaScript?",
      a: ["var", "let", "const", "static"],
      correct: 2
    },
    {
      q: "In C programming, which function is used to print output?",
      a: ["print()", "printf()", "cout <<", "System.out.println()"],
      correct: 1
    },
    {
      q: "What does CSS stand for?",
      a: [
        "Cascading Style Sheets",
        "Creative Style Syntax",
        "Computer Styled Sections",
        "Colorful Style System"
      ],
      correct: 0
    }
  ];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const current = quiz[index];

  const nextQuestion = () => {
    if (selected === null) {
      alert("Please select an answer!");
      return;
    }

    if (selected === current.correct) {
      setScore(score + 1);
    }

    const next = index + 1;

    if (next < quiz.length) {
      setIndex(next);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
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

      <main>
        <section className="about-section">
          <div class="preview-container">
            <div class="preview">
              <h2 style={{ textAlign: "center" }}>What I Love About Coding</h2>
          <p>
            I love coding because it turns ideas into reality. Each bug
            challenges me to think deeper, and every solution feels rewarding.
            It’s a mix of logic and creativity.
          </p>
          </div>
            
          </div>
          
        </section>

        <section className="about-section">
          <div className="preview-container">
            <div className="preview">
            <h2 style={{ textAlign: "center" }}>My Journey with Coding</h2>

          <p>
            Since first year, I want to explore different aspects of coding,
            from beginner steps to advanced projects.
          </p>

          <ul>
            <li>Learn basic programming concepts</li>
            <li>Start web development basics: HTML, CSS</li>
            <li>Understand debugging and error handling</li>
            <li>Explore numerical analysis and math in CS</li>
            <li>Reflect on coding as part of career vision</li>
          </ul>
          

        <blockquote style={{ textAlign: "right" }}>
          “Everybody in this country should learn to program a computer,
          because it teaches you how to think.” – Steve Jobs
        </blockquote>
        </div>
        </div>
          
        </section>
      </main>

      <div className="box">
        {!finished ? (
          <>
            <h2>{current.q}</h2>

            {current.a.map((option, i) => (
              <div className="choice" key={i}>
                <input
                  type="radio"
                  name="answer"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                <label>{option}</label>
              </div>
            ))}

            <button onClick={nextQuestion}>Next</button>
          </>
        ) : (
          <div id="score">
            Quiz Finished 🎉
            <br /><br />
            Your Score: {score} / {quiz.length}
            <br /><br />
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>
        )}
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <footer>
        <p className="previewfoot previewfooter">Contact: email@example.com | Phone: (000) 000-0000                                        © 2026 My Passion Portfolio</p>
      </footer>
    </div>
  );
}

export default AboutPage;
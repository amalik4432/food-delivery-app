import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      {/* HERO SECTION */}
      <div className="about-hero">
        <h1>About This Project 🍕</h1>
        <p>
          A modern Food Delivery Web App built for fast, smooth and
          user-friendly experience.
        </p>
      </div>

      {/* INTRO */}
      <div className="about-content">
        <h2>Who Am I</h2>
        <p>
          I am a passionate Full Stack Developer who loves building modern,
          scalable and interactive web applications using MERN stack and
          React.js.
        </p>

        <h2>What I Do</h2>
        <p>
          I specialize in frontend development with React.js, backend APIs with
          Node.js, and database management using MongoDB.
        </p>
      </div>

      {/* DEVELOPER BOX */}
      <div className="developer-box">
        <h2>👨‍💻 Developer Info</h2>

        <p>
          This project is designed and developed by a Full Stack Developer
          focused on building real-world production level applications.
        </p>

        <div className="developer-card">
          <h3>Tayyaba✨</h3>

          <p>Full Stack Developer | MERN Stack Developer</p>
        </div>

        <p className="note">🚀 “Code. Build. Improve. Repeat.”</p>
      </div>
    </div>
  );
};

export default About;

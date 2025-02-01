import React from 'react'
import "./About.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Me</h1>
          <p>Hello! I'm Vishal, a passionate full-stack developer specializing in the MERN stack.</p>
        </div>
        <img
          src="https://placeholder.antonshell.me/img?height=400"
          alt="Your profile"
          className="profile-image"
        />
      </section>

      <section className="project-info">
        <h2>About the Project</h2>
        <p>This tech forum application is designed to connect technology enthusiasts, offering a platform to share knowledge, exchange ideas, and collaborate on innovative concepts.</p>
        <p>It provides a welcoming space for professionals, aspiring developers, and tech enthusiasts to engage in meaningful discussions and find solutions to questions.</p>
        <p>
        The application encourages exploration of the latest tech advancements, fosters connections with like-minded individuals, and ensures a smooth, scalable experience for its growing community.
        </p>
        <p>With an emphasis on user-friendliness, the forum simplifies navigation, allowing users to focus on sharing insights, learning, and staying informed about the ever-evolving tech landscape.</p>
        <img
          src="https://via.placeholder.com/600x300"
          alt="Project demo"
          className="project-image"
        />
      </section>

    </div>
  );
}

export default AboutPage

// import React, { useState } from "react";
import "./Contact.css";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <div className="contact-page">
//       <h2 className=" text-2xl mb-4 -mt-4">Contact Us</h2>
//       <p>
//         If you have any questions or feedback, feel free to reach out to us.
//       </p>

//       {submitted ? (
//         <div className="thank-you-message">
//           <h3>Thank you for your message!</h3>
//           <p>We will get back to you shortly.</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="contact-form">

//           <button type="submit" className="mt-2 submit-button">
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import { UserIcon } from "../components/Icons";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill in all fields");
      return;
    }

    console.log("contact in with:", { email, password });
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setError("");
  };

  return (
    <div className="contact-page shadow-md">
      <UserIcon />
      <form onSubmit={handleSubmit} className="contact-form p-6 rounded ">
        <h2 className="text-center text-2xl mb-4 -mt-4">Contact</h2>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}

        <div className="form-group mt-9">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            required="required"
          />
          <span>Full name</span>
          {/* <label htmlFor="name">Full Name</label> */}
        </div>

        <div className="form-group mt-9">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required="required"
          />
          <span>Email</span>
          {/* <label htmlFor="email">Email Address</label> */}
        </div>

        <div className="form-group mt-9">
          <textarea id="message" name="message" value={message} required />
          <span>Feedback</span>
          {/* <label htmlFor="message">Your Message</label> */}
        </div>

        <button
          type="submit"
          className="btn-send font-bold py-2 mt-4 px-4 focus:outline-none focus:shadow-outline active:scale-95"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactPage;

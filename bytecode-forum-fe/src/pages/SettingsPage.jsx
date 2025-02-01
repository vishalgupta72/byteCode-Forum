import React, { useState } from "react";
import './Setting.css'
const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      console.log("Account deleted.");
    }
  };

  return (
    <div className={`settings-page ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="text-center">Settings</h1>
      <div className="section mb-8">
        <h2>Account Settings</h2>
        <button className="btn">Change Password</button>
        <div>
          <label className="gap-2">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() =>
                setNotifications({ ...notifications, email: !notifications.email })
              }
            />
            Email Notifications
          </label>
        </div>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      <div className="section mb-6">
        <h2>Privacy Settings</h2>
        <label className="gap-2">
          <input type="checkbox" />
          Show Email to Others
        </label>
        <label className="gap-2">
          <input type="checkbox" />
          Show Phone Number to Others
        </label>
        <button className="btn">Manage Block List</button>
      </div>

      <div className="section mb-6">
        <h2>App Preferences</h2>
        <div>
          <label>
            Dark Mode
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </label>
        </div>
        <div className="setting-language">
          <label>
            Language:
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Others</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Push Notifications
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() =>
                setNotifications({ ...notifications, push: !notifications.push })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

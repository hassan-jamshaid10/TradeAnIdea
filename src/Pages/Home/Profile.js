import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profileType, setProfileType] = useState("individual"); // State to toggle profile type
  const [individual, setIndividual] = useState({
    name: "",
    email: "",
    skills: "",
    education: "",
  });
  const [company, setCompany] = useState({
    companyName: "",
    companyEmail: "",
    location: "",
  });

  const handleProfileTypeChange = (type) => {
    setProfileType(type);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "individual") {
      setIndividual({ ...individual, [name]: value });
    } else {
      setCompany({ ...company, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileType === "individual") {
      if (!individual.name || !individual.email || !individual.skills || !individual.education) {
        alert("All fields are required for Individual Profile.");
        return;
      }
      console.log("Individual Profile Submitted:", individual);
      alert("Individual Profile Submitted Successfully!");
    } else {
      if (!company.companyName || !company.companyEmail || !company.location) {
        alert("All fields are required for Company Profile.");
        return;
      }
      console.log("Company Profile Submitted:", company);
      alert("Company Profile Submitted Successfully!");
    }
    // Reset Form
    setIndividual({
      name: "",
      email: "",
      skills: "",
      education: "",
    });
    setCompany({
      companyName: "",
      companyEmail: "",
      location: "",
    });
  };

  return (
    <div className="profile-container">
      <h1>Create Profile</h1>
      <div className="profile-toggle">
        <button
          className={profileType === "individual" ? "active" : ""}
          onClick={() => handleProfileTypeChange("individual")}
        >
          Individual Profile
        </button>
        <button
          className={profileType === "company" ? "active" : ""}
          onClick={() => handleProfileTypeChange("company")}
        >
          Company Profile
        </button>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        {profileType === "individual" && (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={individual.name}
                onChange={(e) => handleInputChange(e, "individual")}
                placeholder="Enter your name"
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={individual.email}
                onChange={(e) => handleInputChange(e, "individual")}
                placeholder="Enter your email"
                required
              />
            </label>
            <label>
              Programming Skills:
              <input
                type="text"
                name="skills"
                value={individual.skills}
                onChange={(e) => handleInputChange(e, "individual")}
                placeholder="Enter your programming skills"
                required
              />
            </label>
            <label>
              Recent Education:
              <input
                type="text"
                name="education"
                value={individual.education}
                onChange={(e) => handleInputChange(e, "individual")}
                placeholder="Enter your recent education"
                required
              />
            </label>
          </>
        )}
        {profileType === "company" && (
          <>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={company.companyName}
                onChange={(e) => handleInputChange(e, "company")}
                placeholder="Enter company name"
                required
              />
            </label>
            <label>
              Company Email:
              <input
                type="email"
                name="companyEmail"
                value={company.companyEmail}
                onChange={(e) => handleInputChange(e, "company")}
                placeholder="Enter company email"
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={company.location}
                onChange={(e) => handleInputChange(e, "company")}
                placeholder="Enter company location"
                required
              />
            </label>
          </>
        )}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;

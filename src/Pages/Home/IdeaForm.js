import React, { useState } from "react";
import "./IdeaForm.css";
import { useNavigate } from "react-router-dom";

const sdgList = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-Being",
  "Quality Education",
  "Gender Equality",
  "Clean Water and Sanitation",
  "Affordable and Clean Energy",
  "Decent Work and Economic Growth",
  "Industry, Innovation, and Infrastructure",
  "Reduced Inequalities",
  "Sustainable Cities and Communities",
  "Responsible Consumption and Production",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace, Justice, and Strong Institutions",
  "Partnerships for the Goals",
];

const IdeaForm = () => {
  const [idea, setIdea] = useState("");
  const [betterment, setBetterment] = useState("");
  const [description, setDescription] = useState("");
  const [sdg, setSdg] = useState("");
  const [presenter, setPresenter] = useState("");
  const [pemail, setPemail] = useState("");
  const [category, setCategory] = useState(""); // New state for category

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idea || !betterment || !description || !sdg || !presenter || !category) {
      alert("All fields are required.");
      return;
    }
    // alert("Idea submitted successfully!");
    // Clear the form after submission
    setIdea("");
    setBetterment("");
    setDescription("");
    setSdg("");
    setPresenter("");
    setPemail("");
    setCategory(""); // Clear category field
    navigate("/option");
  };

  return (
    <div className="idea-form-container">
      <h1>Submit Your Idea</h1>
      <form className="idea-form" onSubmit={handleSubmit}>
        <label>
          Idea Name:
          <input
            className="input"
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your idea name"
            required
          />
        </label>
        <label>
          Idea Betterment:
          <input
            className="input"
            type="text"
            value={betterment}
            onChange={(e) => setBetterment(e.target.value)}
            placeholder="Who will benefit from this idea?"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your idea in detail"
            rows="5"
            required
          ></textarea>
        </label>
        <label>
          Select SDG:
          <select
            className="input"
            value={sdg}
            onChange={(e) => setSdg(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose an SDG
            </option>
            {sdgList.map((goal, index) => (
              <option key={index} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </label>
        <label>
          Category:
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter the category of your idea"
            required
          />
        </label>
        <label>
          Presenter Name:
          <input
            className="input"
            type="text"
            value={presenter}
            onChange={(e) => setPresenter(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Presenter Email:
          <input
            className="input"
            type="email"
            value={pemail}
            onChange={(e) => setPemail(e.target.value)}
            placeholder="Your email"
            required
          />
        </label>
        <div className="btn">
          <button type="submit">Submit Idea</button>
        </div>
      </form>
    </div>
  );
};

export default IdeaForm;

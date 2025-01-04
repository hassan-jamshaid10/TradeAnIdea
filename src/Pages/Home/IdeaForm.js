import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitIdea, resetFormState } from "../../Features/ideaFormSlice";
import "./IdeaForm.css";

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
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.ideaForm);
  const token = useSelector((state) => state.auth.token); // Fetch the token from the auth slice

  useEffect(() => {
    if (success) {
      alert("Idea submitted successfully!");
      dispatch(resetFormState());
      setIdea("");
      setBetterment("");
      setDescription("");
      setSdg("");
      setCategory("");
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!idea || !betterment || !description || !sdg || !category) {
      alert("All fields are required.");
      return;
    }

    const ideaData = { idea_name: idea, description, betterment, category, sdg };

    // Pass token with the action
    dispatch(submitIdea({ ideaData, token }));
  };

  return (
    <div className="idea-form-container">
      <h1>Submit Your Idea</h1>
      <form className="idea-form" onSubmit={handleSubmit}>
        <label>
          Idea Name:
          <input
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your idea in detail"
            rows="5"
            required
          ></textarea>
        </label>
        <label>
          Select SDG:
          <select value={sdg} onChange={(e) => setSdg(e.target.value)} required>
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
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter the category of your idea"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Idea"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default IdeaForm;

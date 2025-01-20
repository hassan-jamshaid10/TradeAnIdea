import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeasibility, resetResult } from "../../Features/LLMSlice";

const LLM = () => {
  const dispatch = useDispatch();
  const { result, status, error } = useSelector((state) => state.llm);

  const [instruction, setInstruction] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchFeasibility({ instruction, project_description: projectDescription }));
  };

  return (
    <div>
      <h1>Project Feasibility Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Instruction:
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            rows="4"
            cols="50"
          />
        </label>
        <br />
        <label>
          Project Description:
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows="4"
            cols="50"
          />
        </label>
        <br />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Checking..." : "Check Feasibility"}
        </button>
      </form>
      <h2>Result: {status === "failed" ? error : result}</h2>
    </div>
  );
};

export default LLM;

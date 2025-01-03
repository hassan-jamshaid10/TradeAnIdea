import React from "react";
import "./List.css";

const ideasList = [
  {
    id: 1,
    title: "Renewable Energy App",
    description:
      "An app to monitor and optimize renewable energy usage at home, supporting SDG goals for clean energy.",
    category: "Environment",
    author: "John Doe",
    // image: "https://via.placeholder.com/600x300",
  },
  {
    id: 2,
    title: "Smart Water Management",
    description:
      "A system to track and reduce water wastage using IoT sensors, aimed at achieving sustainability.",
    category: "Sustainability",
    author: "Jane Smith",
    // image: "https://via.placeholder.com/600x300",
  },
  {
    id: 3,
    title: "Accessible Learning Platform",
    description:
      "An online platform that provides free learning resources for underprivileged communities.",
    category: "Education",
    author: "Alex Johnson",
    // image: "https://via.placeholder.com/600x300",
  },
];

const List = () => {
  return (
    <div className="ideas-page">
      <h1>Explore Innovative Ideas</h1>
      <div className="ideas-posts">
        {ideasList.map((idea) => (
          <div className="idea-post" key={idea.id}>
            {/* <img src={idea.image} alt={idea.title} className="idea-image" /> */}
            <div className="idea-content">
              <h2>{idea.title}</h2>
              <p className="category">{idea.category}</p>
              <p>{idea.description}</p>
              <p className="author">Posted by: {idea.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

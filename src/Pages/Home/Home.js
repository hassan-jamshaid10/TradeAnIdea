import React from 'react'
import { useNavigate } from 'react-router-dom';
// import logo from '../assets/images/logo.png';
import './Home.css'
const Home = () => {
  const navigate=useNavigate();
  const handleLoginClick=()=>{
    navigate('/login');
  }
  const handleSignUpClick=()=>{
    navigate('/signUp');
  }
    return (
      <>
        <div className="container1">
        <img src="/assets/images/logo.png" className="home-logo" />
          <h6>Welcome to Trade An Idea</h6>
          <p>
            Join our community to share your innovative ideas and see how they align with Sustainable Development Goals (SDG's).
            <br />
            Register now and make a difference!
          </p>
          <div className="for-button">
            <button type="button" className="button" onClick={handleLoginClick}>Login</button>
            <button type="button" className="button" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
        {/* <div className="container2" id="about">
          <div className="heading">
            <h3>About</h3>
          </div>
          <div className="about-text">
            <p>
              Welcome to Trade An Idea, where innovation meets sustainability. Our platform connects creative minds with software houses and individuals eager to bring impactful ideas to life. 
              We ensure that every idea aligns with Sustainable Development Goals (SDG's) and stands out with its uniqueness.
            </p>
            <a className="button" href="about.html">Read More</a>
          </div>
        </div> */}
      </>
    );
  };
  
export default Home;

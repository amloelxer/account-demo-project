import React from 'react';
import doge from './Doge.jpg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
    <div className="App">
      <header className="App-header">
        <p> BRIDGE TAKEHOME</p>
        <img src={doge} className="App-logo" alt="logo" />
        <button style={{marginTop: 50}} onClick={() => {
          navigate(`dashboard`)
        }}>
          Take Me To the dashboard!
        </button>
      </header>
    </div>
    )
}

export default LandingPage;
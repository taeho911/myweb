import React from 'react';
import './styles/Home.css';
import home from './images/home.png';

function Home(props) {
    return <img id="home" src={home} onClick={() => location.href="/index"}></img>;
}

export default Home;
import React from 'react';
import './styles/home.css';
import home from './images/home.png';

class Home extends React.Component {
    render() {
        return <img id="home" src={home} onClick={() => location.href="/index"}></img>;
    }
}

export default Home;
import React from 'react';
import './styles/clock.css'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        let now = new Date();
        this.state = {
            nowDate: this.toNowDate(now),
            nowTime: this.toNowTime(now)
        };
    }
    
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let now = new Date();
        this.setState({
            nowDate: this.toNowDate(now),
            nowTime: this.toNowTime(now)
        });
    }

    toNowDate(now) {
        return `${now.getFullYear()} - ${now.getMonth() + 1} - ${now.getDate()}`;
    }

    toNowTime(now) {
        let hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
        let min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        let sec = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
        return `${hour} : ${min} : ${sec}`;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="clock-date">{this.state.nowDate}</div>
                <div className="clock-time">{this.state.nowTime}</div>
            </div>
        );
    }
}

export default Clock;
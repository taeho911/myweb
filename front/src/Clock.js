import React from 'react';
import './styles/Clock.css'

function toNowDate(now) {
    let month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    let date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
    return `${now.getFullYear()} - ${month} - ${date}`;
}

function toNowTime(now) {
    let hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    let min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    let sec = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
    return `${hour} : ${min} : ${sec}`;
}

function Clock() {
    let now = new Date();
    const [clock, setClock] = React.useState({
        date: toNowDate(now),
        time: toNowTime(now)
    });

    let tick = () => {
        let now = new Date();
        setClock({
            date: toNowDate(now),
            time: toNowTime(now)
        });
    };

    React.useEffect(() => {
        let timerId = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className="wrapper">
            <div className="clock-date">{clock.date}</div>
            <div className="clock-time">{clock.time}</div>
        </div>
    );
}

export default Clock;
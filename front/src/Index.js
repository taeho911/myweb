import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';
import './styles/Common.css';
import './styles/Index.css';

function Index(props) {
    return (
        <div className="wrapper">
            <h1>{props.name}'s WEB</h1>
            <div className="grid">
                <div className="acc" onClick={() => location.href="/acc"}>
                    <section className="grid-content">Account Management</section>
                </div>
                <div className="memo" onClick={() => location.href="/memo"}>
                    <section className="grid-content">Memo</section>
                </div>
                <div className="tmp2">
                    <section className="grid-content">Temp 1</section>
                </div>
                <div className="tmp3">
                    <section className="grid-content">Temp 3</section>
                </div>
                <div className="tmp4" onClick={() => location.href="/test"}>
                    <section className="grid-content">Temp 4</section>
                </div>
            </div>
        </div>
    );
}

export default Index;

const element = (
	<React.Fragment>
		<Clock/>
		<Index name="Taeho"/>
	</React.Fragment>
);
ReactDOM.render(element, document.getElementById('root'));
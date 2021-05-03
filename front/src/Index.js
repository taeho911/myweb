import React from 'react';
import ReactDOM from 'react-dom';
// import Menu from './component/menu';
import Clock from './Clock';
import './styles/common.css';
import './styles/index.css';

// const element = (
// 	<div>
// 		<Clock />
// 		<Menu name="Taeho" />
// 	</div>
// );

// ReactDOM.render(
// 	element, document.getElementById('root')
// );

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    // accClick(event) {
    //     event.preventDefault();
    //     console.log('Acc is clicked');
    //     ReactDOM.render(<Acc/>, document.getElementById('root'))
    // }

    render() {
        return (
            <div className="wrapper">
                <h1>{this.name}'s WEB</h1>
                <div className="grid">
                    {/* <div className="acc" onClick={(event) => this.accClick(event)}> */}
                    <div className="acc" onClick={() => location.href="/acc"}>
                        <section className="grid-content">계정관리</section>
                    </div>
                    <div className="tmp1">
                        <section className="grid-content">REACT</section>
                    </div>
                    <div className="tmp2">
                        <section className="grid-content">임시박스</section>
                    </div>
                    <div className="tmp3">
                        <section className="grid-content">임시박스</section>
                    </div>
                    <div className="tmp4" onClick={() => location.href="/test"}>
                        <section className="grid-content">테스트박스</section>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
const element = (
	<React.Fragment>
		<Clock/>
		<Index name="Taeho"/>
	</React.Fragment>
);
ReactDOM.render(element, document.getElementById('root'));
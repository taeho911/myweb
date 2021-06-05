import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import './styles/Common.css';

function MemoList(props) {
    console.log('MemoList')
    const [renderCount, setRenderCount] = React.useState(1);

    return (
        <div className="wrapper">
            <h1>Memo</h1>
            <br></br>
            <button className="btn" onClick={e => testFunc(e)}>Test Function</button>
            <button className="btn" onClick={e => checkState(e)}>State Check</button>
            <br></br>
        </div>
    );
}

let elem = (
    <React.Fragment>
        <MemoList/>
        <Home/>
    </React.Fragment>
);
ReactDOM.render(elem, document.getElementById('root'));
export default MemoList;

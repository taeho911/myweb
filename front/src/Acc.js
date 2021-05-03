import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home'
import AccDetail from './AccDetail';
import './styles/common.css';
import './styles/acc.css';
import mg from './images/magnifying-glass.png';

class Acc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accMap: new Map(),
            accElem: new Map()
        };
    }

    componentDidMount() {
        console.log('componentDidMount')
        fetch('/acc/list')
            .then(res => res.json())
            // .then(data => this.setState({
            //     accs: data
            // }));
            .then(data => {
                // console.log(data);
                // let tmpMap = new Map();
                data.forEach(acc => {
                    // tmpMap.set(element._id, element);
                    this.state.accMap.set(acc._id, acc);
                    let elem = [
                        <tr className="acc-spacer" key={acc._id.toString() + "-spacer"}><td></td></tr>,
                        <tr className="acc-row" key={acc._id.toString() + "-row"}>
                            <td className="acc-row-left">{acc._id}</td>
                            <td>{acc.title}</td>
                            <td>{acc.uid}</td>
                            <td>{acc.pwd}</td>
                            <td className="acc-row-right">
                                <img className="acc-mg" src={mg} onClick={e => this.clickDetail(e, acc)}></img>
                            </td>
                        </tr>
                    ];
                    this.state.accElem.set(acc._id, elem);
                });
                this.setState({
                    // accMap: tmpMap
                    accMap: this.state.accMap,
                    accElem: this.state.accElem
                });
                // console.log(this.state.accMap);


                // TODO
                // 1. display: none 으로 detail 표시 전환
                // 2. document.getElementById("p2").style.display = "none";
                // 3. alias 리스트화
            });
    }

    // renderAcc(acc, i) {
    //     console.log('renderAcc');
    //     console.log(acc);
    //     let key = acc._id;
    //     let elem = [
    //         <tr className="acc-spacer" key={acc._id.toString() + "-spacer"}><td></td></tr>,
    //         <tr className="acc-row" key={acc._id.toString() + "-row"}>
    //             <td className="acc-row-left">{i + 1}</td>
    //             <td>{acc.title}</td>
    //             <td>{acc.uid}</td>
    //             <td>{acc.pwd}</td>
    //             <td className="acc-row-right">
    //                 <img className="acc-mg" src={mg} onClick={e => this.clickDetail(e, acc)}></img>
    //             </td>
    //         </tr>
    //     ];
    //     return <React.Fragment key={key}>{elem}</React.Fragment>;
    // }

    renderAcc() {
        console.log('renderAcc');
        // for(let acc of accMap.values()) {
        //     let elem = [
        //         <tr className="acc-spacer" key={acc._id.toString() + "-spacer"}><td></td></tr>,
        //         <tr className="acc-row" key={acc._id.toString() + "-row"}>
        //             <td className="acc-row-left">{acc._id}</td>
        //             <td>{acc.title}</td>
        //             <td>{acc.uid}</td>
        //             <td>{acc.pwd}</td>
        //             <td className="acc-row-right">
        //                 <img className="acc-mg" src={mg} onClick={e => this.clickDetail(e, acc)}></img>
        //             </td>
        //         </tr>
        //     ]
        //     this.state.accElem.set(acc._id, elem);
        //     this.state.accElemAll.push(...elem);
        // }

        // let elem = [
        //     <tr className="acc-spacer" key={key.toString() + "-spacer"}><td></td></tr>,
        //     <tr className="acc-row" key={key.toString() + "-row"}>
        //         <td className="acc-row-left">{key}</td>
        //         <td>{val.title}</td>
        //         <td>{val.uid}</td>
        //         <td>{val.pwd}</td>
        //         <td className="acc-row-right">
        //             <img className="acc-mg" src={mg} onClick={e => this.clickDetail(e, val)}></img>
        //         </td>
        //     </tr>
        // ];
        
        let elemAll = [];
        for(let elem of this.state.accElem.values()) {
            elemAll.push(...elem);
        }
        return <React.Fragment>{elemAll}</React.Fragment>;
    }

    clickDetail(e, acc) {
        e.preventDefault();
        console.log('clickDetail');

        if(this.state.accElem.get(acc._id).length < 3) {
            this.state.accElem.get(acc._id).push(
                <AccDetail acc={acc} key={acc._id.toString() + "-detail"}/>
            );
        } else if(this.state.accElem.get(acc._id).length >= 3) {
            this.state.accElem.get(acc._id).pop();
        }

        this.setState({
            accElem: this.state.accElem
        });
    }

    updateAcc(e) {
        e.preventDefault();
        console.log('updateAcc');
    }

    deleteAcc(e) {
        e.preventDefault();
        console.log('deleteAcc');
    }

    testFunc(e) {
        e.preventDefault();
        console.log('testFunc');
        this.state.accElem.pop();
    }

    checkState(e) {
        e.preventDefault();
        console.log('checkState');
        console.log(this.state);
    }

    render() {
        console.log('render');
        return (
            <div className="wrapper">
                <h1>Account Management</h1>
                <br></br>
                <button onClick={e => this.testFunc(e)}>Test Function</button>
                <button onClick={e => this.checkState(e)}>State Check</button>
                <br></br>
                <table className="acc-table">
                    <colgroup>
                        <col className="col1"></col>
                        <col className="col2"></col>
                        <col className="col3"></col>
                        <col className="col4"></col>
                        <col className="col5"></col>
                    </colgroup>
                    <thead>
                        <tr className="acc-header">
                            <th>No</th>
                            <th>Title</th>
                            <th>ID</th>
                            <th>PW</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAcc()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Acc;
const element = (
	<React.Fragment>
		<Acc/>
		<Home/>
	</React.Fragment>
);
ReactDOM.render(element, document.getElementById('root'));
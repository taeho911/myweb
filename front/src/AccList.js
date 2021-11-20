import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Acc from './Acc';
import './styles/Common.css';
import './styles/AccList.css';
import plus from './images/plus.png';
import plushover from './images/plus-hover.png';

function getIndexById(accList, _id) {
    for(let i in accList) {
        if (accList[i]._id === _id) return i;
    }
    return -1;
}

function AccList(props) {
    console.log('AccList')
    let accList = props.accList;
    const [renderCount, setRenderCount] = React.useState(1);
    React.useEffect(() => {
        let accNew = document.getElementById('acc-new');
        const closeAccNewEvent = e => {
            if (e.target == accNew) {
                accNew.style.display = 'none';
            }
        };
        window.addEventListener('click', closeAccNewEvent);
        return () => { window.removeEventListener('click', closeAccNewEvent); }
    }, []);

    let testFunc = e => {
        console.log('testFunc');
        e.preventDefault();
    };

    let checkState = e => {
        console.log('checkState');
        e.preventDefault();
        console.log(accList);
        console.log(renderCount);
    };

    let openAccNew = e => {
        console.log('openAccNew');
        e.preventDefault();
        document.getElementById('acc-new').style.display = 'block';
    };

    let closeAccNew = () => {
        console.log('closeAccNew');
        document.getElementById('acc-new').style.display = 'none';
        document.getElementById('acc-new-form').reset();
    }

    let createAcc = e => {
        console.log('createAcc');
        e.preventDefault();
        let formData = new FormData(e.target.form);
        let jsonData = Object.fromEntries(formData.entries());
        if (jsonData.pwd !== jsonData.pwdconfirm) {
            console.log(`${jsonData.pwd} !== ${jsonData.pwdconfirm}`);
        } else {
            jsonData.alias = jsonData.alias.replaceAll(',', ' ').split(' ');
            fetch('/acc/create', {
                method: 'post',
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(jsonData)
            })
                .then(res => res.json())
                .then(data => {
                    if (!data._id) {
                        console.log('Failed to create ...');
                    } else {
                        accList.push(data);
                        setRenderCount(renderCount + 1);
                    }
                });
        }
        closeAccNew();
    }

    let updateAcc = (e, _id) => {
        console.log('updateAcc');
        e.preventDefault();
        let formData = new FormData(e.target.form);
        let jsonData = Object.fromEntries(formData.entries());
        jsonData.alias = jsonData.alias.replaceAll(',', ' ').split(' ');
        fetch('/acc/update', {
            method: 'post',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(jsonData)
        })
            .then(res => res.json())
            .then(data => { if (!data._id) console.log('Failed to update ...'); })
        let i = getIndexById(accList, _id);
        if (i !== -1) {
            accList[i] = jsonData;
            setRenderCount(renderCount + 1);
        }
    }

    let deleteAcc = (e, _id) => {
        console.log('deleteAcc');
        e.preventDefault();
        if (!confirm('Do you want to delete the data ?')) return
        fetch('/acc/delete', {
            method: 'delete',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify({_id: _id})
        })
            .then(res => res.json())
            .then(data => { if (!data._id) console.log('Failed to delete ...'); })
        let i = getIndexById(accList, _id);
        if (i !== -1) {
            accList.splice(i, 1);
            setRenderCount(renderCount + 1);
        }
    }

    return (
        <div className="wrapper">
            <h1>Account Management</h1>
            <br></br>
            <button className="btn" onClick={e => testFunc(e)}>Test Function</button>
            <button className="btn" onClick={e => checkState(e)}>State Check</button>
            <br></br>
            <table className="acc-table">
                <colgroup>
                    <col className="col1"></col>
                    <col className="col2"></col>
                    <col className="col3"></col>
                    <col className="col4"></col>
                    <col className="col5"></col>
                    <col className="col6"></col>
                </colgroup>
                <thead>
                    <tr className="acc-header">
                        <th>No</th>
                        <th>Title</th>
                        <th>ID</th>
                        <th>PW</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {accList.map(acc => <Acc acc={acc}
                        key={acc._id.toString()}
                        updateAcc={updateAcc}
                        deleteAcc={deleteAcc}
                        />)}
                </tbody>
                <tfoot>
                    <tr className="acc-footer">
                        <td colSpan="6">
                            <div className="acc-create-container">
                                <img className="acc-create" src={plus}
                                    onMouseOver={e => e.currentTarget.src = plushover}
                                    onMouseOut={e => e.currentTarget.src = plus}
                                    onClick={e => openAccNew(e)}></img>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="acc-new" id="acc-new">
                <div className="acc-new-content">
                    <span className="acc-new-close" onClick={e => document.getElementById('acc-new').style.display = 'none'}>&times;</span>
                    <h2>Create New Account Data</h2>
                    <form id="acc-new-form">
                        <input type="text" name="title" placeholder="Title"></input><br></br>
                        <input type="text" name="uid" placeholder="User ID"></input><br></br>
                        <input type="password" name="pwd" placeholder="Password"></input><br></br>
                        <input type="password" name="pwdconfirm" placeholder="Password Confirmation"></input><br></br>
                        <input type="text" name="url" placeholder="URL"></input><br></br>
                        <input type="email" name="email" placeholder="E-mail"></input><br></br>
                        <input type="text" name="alias" placeholder="Alias"></input><br></br>
                        <input type="text" name="memo" placeholder="Memo"></input><br></br>
                        <br></br>
                        <button className="btn acc-new-btn" type="reset">Reset</button>
                        <button className="btn acc-new-btn" onClick={e => createAcc(e)}>Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function fetchAccList() {
    console.log('fetchAccList');
    fetch('acc/list')
        .then(res => res.json())
        .then(data => {
            let elem = (
                <React.Fragment>
                    <AccList accList={data}/>
                    <Home/>
                </React.Fragment>
            );
            ReactDOM.render(elem, document.getElementById('root'));
        })
        .catch(err => {
            console.log("No data");
            let elem = (
                <React.Fragment>
                    <AccList accList={[]}/>
                    <Home/>
                </React.Fragment>
            );
            ReactDOM.render(elem, document.getElementById('root'));
        });
}

export default AccList;

fetchAccList()

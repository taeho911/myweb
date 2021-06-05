import React from 'react';
import './styles/Acc.css';
import del from './images/delete.png';
import delhover from './images/delete-hover.png';
import mg from './images/magnifying-glass.png';
import mghover from './images/magnifying-glass-hover.png';

function Acc(props) {
    console.log('AccEntry');
    // const [acc, setAcc] = React.useState(props.acc);
    let acc = props.acc;
    const [detailSwitch, setDetailSwitch] = React.useState(false);

    return (
        <React.Fragment>
            <tr className="acc-spacer"><td></td></tr>
            <tr className="acc-row">
                <td className="acc-row-left">{acc._id}</td>
                <td>{acc.title}</td>
                <td>{acc.uid}</td>
                <td>{acc.pwd}</td>
                <td>
                    <img className="acc-del" src={del}
                        onMouseOver={e => e.currentTarget.src = delhover}
                        onMouseOut={e => e.currentTarget.src = del}
                        onClick={e => props.deleteAcc(e, acc._id)}></img>
                </td>
                <td className="acc-row-right">
                    <img className="acc-mg" src={mg}
                        onMouseOver={e => e.currentTarget.src = mghover}
                        onMouseOut={e => e.currentTarget.src = mg}
                        onClick={e => setDetailSwitch(detailSwitch ? false : true)}></img>
                </td>
            </tr>
            <tr className={detailSwitch ? "acc-detail-on" : "acc-detail-off"}>
                <td className="acc-detail" colSpan="6">
                    <form>
                        <div className="acc-detail-container">
                            <div className="acc-detail-index">
                                {acc._id}
                                <input type="hidden" name="_id" value={acc._id}></input>
                            </div>
                            <div className="acc-detail-info">
                                <label>Title: </label>
                                <input type="text" name="title" defaultValue={acc.title != null ? acc.title : ""}></input>
                                <br></br>
                                <label>User ID: </label>
                                <input type="text" name="uid" defaultValue={acc.uid != null ? acc.uid : ""}></input>
                                <br></br>
                                <label>Password: </label>
                                <input type="text" name="pwd" defaultValue={acc.pwd != null ? acc.pwd : ""}></input>
                                <br></br>
                                <label>URL: </label>
                                <input type="text" name="url" defaultValue={acc.url != null ? acc.url : ""}></input>
                                <br></br>
                                <label>E-mail: </label>
                                <input type="email" name="email" defaultValue={acc.email != null ? acc.email : ""}></input>
                                <br></br>
                                <label>Alias: </label>
                                <input type="text" name="alias" defaultValue={acc.alias != null ? acc.alias : ""}></input>
                                <br></br>
                                <label>Memo: </label>
                                <input type="text" name="memo" defaultValue={acc.memo != null ? acc.memo : ""}></input>
                            </div>
                            <div className="acc-detail-buttons">
                                <button className="btn" type="reset">Reset</button>
                                <button className="btn" onClick={e => props.updateAcc(e, acc._id)}>Update</button>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        </React.Fragment>
    );
}

export default Acc;
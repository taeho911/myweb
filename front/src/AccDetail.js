import React from 'react';

class AccDetail extends React.Component {
    constructor(props) {
        super(props);
        this.baseUniqueId = 'acc-detail';
        this.state = {
            acc: props.acc
        };
    }

    updateAcc(e) {
        e.preventDefault();
        console.log('updateAcc');

        let form = e.target.form;
        let formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries());
        
        // for(let key of fd.keys()) {
        //     console.log("FormData:", key, fd.getAll(key));
        // }

        fetch('/acc/update', {
            method: 'post',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(jsonData)
        })
            .then(res => res.json())
            .then(data => this.setState({ acc: data }));
    }

    deleteAcc(e) {
        e.preventDefault();
        console.log('deleteAcc');
    }

    makeUniqueIdForForm(id) { return this.baseUniqueId + '-id-' + id.toString() }
    makeUniqueIdForId(id) { return this.baseUniqueId + '-id-' + id.toString() }
    makeUniqueIdForTitle(id) { return this.baseUniqueId + '-title-' + id.toString() }
    makeUniqueIdForUid(id) { return this.baseUniqueId + '-uid-' + id.toString() }
    makeUniqueIdForPwd(id) { return this.baseUniqueId + '-pwd-' + id.toString() }
    makeUniqueIdForUrl(id) { return this.baseUniqueId + '-url-' + id.toString() }
    makeUniqueIdForEmail(id) { return this.baseUniqueId + '-email-' + id.toString() }
    makeUniqueIdForAlias(id) { return this.baseUniqueId + '-alias-' + id.toString() }
    makeUniqueIdForMemo(id) { return this.baseUniqueId + '-memo-' + id.toString() }
    
    render() {
        console.log('AccDetail.render');
        let id = this.state.acc._id;
        let uiForm = this.makeUniqueIdForForm(id);
        let uiId = this.makeUniqueIdForId(id);
        let uiTitle = this.makeUniqueIdForTitle(id);
        let uiUid = this.makeUniqueIdForUid(id);
        let uiPwd = this.makeUniqueIdForPwd(id);
        let uiUrl = this.makeUniqueIdForUrl(id);
        let uiEmail = this.makeUniqueIdForEmail(id);
        let uiAlias = this.makeUniqueIdForAlias(id);
        let uiMemo = this.makeUniqueIdForMemo(id);

        return (
            <tr className="acc-detail">
                <td colSpan="5">
                    <form id={uiForm}>
                        <div>
                            <label htmlFor={uiId}>Index:</label>
                            <span id={uiId}>{id}</span>
                            <input
                                type="hidden"
                                name="_id"
                                value={id}></input>
                            <br></br>
                            <label htmlFor={uiTitle}>Title:</label>
                            <input 
                                type="text"
                                id={uiTitle}
                                name="title"
                                defaultValue={this.state.acc.title != null ? this.state.acc.title : ""}></input>
                            <br></br>
                            <label htmlFor={uiUid}>User ID:</label>
                            <input
                                type="text"
                                id={uiUid}
                                name="uid"
                                defaultValue={this.state.acc.uid != null ? this.state.acc.uid : ""}></input>
                            <br></br>
                            <label htmlFor={uiPwd}>Password:</label>
                            <input
                                type="text"
                                id={uiPwd}
                                name="pwd"
                                defaultValue={this.state.acc.pwd != null ? this.state.acc.pwd : ""}></input>
                            <br></br>
                            <label htmlFor={uiUrl}>URL:</label>
                            <input
                                type="text"
                                id={uiUrl}
                                name="url"
                                defaultValue={this.state.acc.url != null ? this.state.acc.url : ""}></input>
                            <br></br>
                            <label htmlFor={uiEmail}>E-mail:</label>
                            <input
                                type="email"
                                id={uiEmail}
                                name="email"
                                defaultValue={this.state.acc.email != null ? this.state.acc.email : ""}></input>
                            <br></br>
                            <label htmlFor={uiAlias}>Alias:</label>
                            <input
                                type="text"
                                id={uiAlias}
                                name="alias"
                                defaultValue={this.state.acc.alias != null ? this.state.acc.alias : ""}></input>
                            <br></br>
                            <label htmlFor={uiMemo}>Memo:</label>
                            <input
                                type="text"
                                id={uiMemo}
                                name="memo"
                                defaultValue={this.state.acc.memo != null ? this.state.acc.memo : ""}></input>
                        </div>
                        <button onClick={e => this.updateAcc(e)}>Update</button>
                        <button onClick={e => this.deleteAcc(e)}>Delete</button>
                    </form>
                </td>
            </tr>
        );
    }
}

export default AccDetail;
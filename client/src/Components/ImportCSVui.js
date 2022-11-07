
import 'bulma/css/bulma.min.css';
import React from "react";
import { Icon as Iconify } from '@iconify/react';

import axios from 'axios';

import { UserContext } from "../Context/AddUserContext.js";
import {useAuth } from "../Context/AuthUser"

class ImportCSVuiClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorFile: "",
            loadFile: false,
            showSignup: false,
            importNewUser: []
        }

        this.uploadCSV = this.uploadCSV.bind(this);
    }

    uploadCSV(e) {
        this.setState({ errorFile: "" })
        var getFile = e.target.files;

        if (!getFile || getFile.length > 1) return;


        let getExrension, filejoinname;

        filejoinname = getFile[0].name;
        getExrension = filejoinname.substr(filejoinname.lastIndexOf('.') + 1).toLowerCase();
        if (getExrension != "csv") {
            this.setState({ errorFile: "The file format must be CSV " })
            return;
        }
        this.setState({ loadFile: true })
        var formFile = new FormData();
        formFile.append('csvfile', e.target.files[0]);

        let baseURL = process.env.REACT_APP_API_BASE_URL || 'localhost:8787';
        axios.request({
            method: "POST",
            url: "http://" + baseURL + "/upload",
            data: formFile,
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials:true,
            onUploadProgress: (p) => {
                console.log(p);

            }
        })
            .then(res => res.data)
            .then(res => {

                this.setState({ loadFile: false });

                if (res["error"] == 1) {

                    return this.setState({ errorFile: res["txt"] })
                }
                if (res["error"] == 2) {  return this.props.logout()}

                this.setState({ importNewUser: res })
                return;
            }).catch((err) => {

                console.log(err)
                this.setState({ errorFile: 'Please try again' })
                this.setState({ loadFile: false });
            });
    }
    componentDidMount() {
        //check component mounted times for Debug purpose
        console.log("check component mounted times for Debug purpose ")
        console.log("in case called Twice that because React.StrictMode in dev mode")
    }

    render() {

        return (
            <>
                <div className="control">

                    <div className="file is-primary is-rounded">
                        <label className="file-label">
                            <input onChange={(e) => this.uploadCSV(e)} className="file-input " disabled={this.state.loadFile} type="file" name="csv" />
                            <span className="file-cta">
                                <span className="file-icon">
                                    {
                                        (!this.state.loadFile)
                                            ?
                                            <Iconify icon="akar-icons:file" />
                                            :
                                            <div className="loader is-centered is-loading" style={{}}></div>
                                    }

                                </span>
                                <span className="file-label">
                                    Imort CSV File
                                </span>
                            </span>
                        </label>
                    </div>

                    <p className="help is-danger">{this.state.errorFile}</p>

                </div>


                <UserContext.Consumer>
                    {({ /*elementUser, */setMyUser }) => (

                        setMyUser(this.state.importNewUser)
                    )}
                </UserContext.Consumer>
            </>
        )
    }

}
const ImportCSVui = (props)=>{

    const {logout} = useAuth()

    return (<ImportCSVuiClass logout={logout} />)
};


export default ImportCSVui;

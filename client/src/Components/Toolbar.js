import { Block } from "react-bulma-components";
import 'bulma/css/bulma.min.css';
import React from "react";


import ButtonAddUser from "./ButtonAddUser";
import ImportCSVui from "./ImportCSVui";
function Toolbar() {


    return (
        <Block style={{ width: 400, margin: '20px auto', borderRadius: "49px", }}>
            <div className="field is-grouped is-center" >

                <ImportCSVui />

                <ButtonAddUser />

            </div>
        </Block>
    )


}


export default Toolbar

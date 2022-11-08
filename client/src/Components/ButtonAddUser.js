import { Box} from "react-bulma-components";
import 'bulma/css/bulma.min.css';
import React, { useState , lazy, Suspense } from "react";
import { Icon as Iconify } from '@iconify/react';
//import Signup from "../Views/Registration/signup";
import { UserContext } from "../Context/AddUserContext.js";
const Signup = lazy( () =>  import("../Views/Registration/signup"));


function ButtonAddUser(props) {
    const [showSignup, setShowSignup] = useState(false)
    return (
        <>
            <button className="button is-info is-rounded" onClick={() => setShowSignup(true)}>
                <span className="icon">
                    <Iconify icon="ant-design:usergroup-add-outlined" />
                </span>
                <span>Add User</span>
            </button>
            <BoxSignUp showSignup={showSignup} setShowSignup={() => setShowSignup(false)} />
        </>
    )


}


function BoxSignUp({ showSignup, setShowSignup }) {

    const [newUser, SetNewUser] = useState([]);

    const SignUpSucceed = (newUser) => {

        let userone = [];
        userone.push(newUser)
        setShowSignup()

         //you may use useContext instead of Component Consumer
        SetNewUser(userone)
    }
    return (
        <div className={"modal " + (showSignup ? " is-active" : "")}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <Box style={{ width: 400, margin: 'auto' }}>
                <Suspense fallback={ <div className="loader is-centered is-loading" style={{ margin: "20px auto", height: "70px", width: "70px" }}></div>}>
                <Signup createditUser="create" CreateUpdateSucceed={(newUser) => SignUpSucceed(newUser)} />
                </Suspense>
                
                </Box>
                {
                   (newUser.length != 0 &&
                
                <UserContext.Consumer>
                    {({ /*elementUser,*/ setMyUser }) => (

                        setMyUser(newUser)
                    )}
                </UserContext.Consumer>)
                }
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setShowSignup()}></button>
        </div>

    )

}

export default ButtonAddUser;
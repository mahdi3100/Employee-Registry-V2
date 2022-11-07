import {Button, Box, Level, Heading } from "react-bulma-components";
import 'bulma/css/bulma.min.css';

import {
    BrowserRouter,
    /*  Switch, replaced with Routes*/
    Route,
    Routes,
    NavLink,/**same use as link bu has more control for style */
    Link
  } from "react-router-dom";
  import {useAuth } from "../Context/AuthUser"

function HeaderNav() {

    const {authUser,logout} = useAuth()
    console.log("Im on NAV")
    console.log(authUser)
   
    return (
        <Box>
            <Level>
                <Level.Side>
                    <Level.Item>
                        <Heading
                            size={5}
                            subtitle
                        >
                            <strong>
                                Employee Registry
                            </strong>

                        </Heading>
                    </Level.Item>
                    <Level.Item>
            <b>
             {useAuth.username}
            </b>
                  
                   
                    </Level.Item>
                    </Level.Side>
                    <Level.Side align="right">
                    <Level.Item>
                    <Link to="/home">
                    Home
                    </Link>
                    </Level.Item>
                    <Level.Item>
                    <Link to={`/profile/${authUser.username}`}>
                    Profile
                    </Link>
                    </Level.Item>
                                    

                                
                         
                            <Level.Item>
                                {
                                    (!authUser)
                                    ?<Link to="/">Registration</Link>
                                    :<Button
                                    rounded color="link" onClick={() => logout()}>
                                        Logout
                                      </Button>                                    
                                    
                                }
                 
                             
                                    

                                
                            </Level.Item>       
                </Level.Side>

            </Level>
        </Box>
    )
}

export default HeaderNav;

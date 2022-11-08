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
    let activeStyle = {
        textDecoration: "underline",
        fontWeight: "bold"

      };
    const {authUser,logout} = useAuth()

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
         
                    </Level.Side>
                    <Level.Side align="right">
                    <Level.Item>
            Hello ,<b>
             {authUser}
            </b>
                  
                   
                    </Level.Item>
                    <Level.Item>
                    <NavLink to="/home"
                     style={({ isActive }) =>
                     isActive ? activeStyle : undefined
                   }
                   >
                    Home
                    </NavLink>
                    </Level.Item>
                    {
                        (authUser &&

                    <Level.Item>
                      
                            
                       
                    <NavLink to={`/profile/${authUser}`}
                     style={({ isActive }) =>
                     isActive ? activeStyle : undefined
                   }
                        state={{ 
                            user:authUser, profile: authUser
                        }}
                        >
                    Profile
                    </NavLink>
                    </Level.Item>
                    )
                    }  

                                
                         
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

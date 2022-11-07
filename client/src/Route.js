import React, { useContext } from 'react';

import Registration from './Views/Registration';
import HeaderNav from './Components/HeaderNav.js';
import Home from './Views/Home';
import { AuthUserContextProvider, useAuth } from "./Context/AuthUser"
import { UserContextProvider } from './Context/AddUserContext';
import Profile from './Views/Profile';
import {
    BrowserRouter,
    /*  Switch, replaced with Routes*/
    Route,
    Routes,
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";

function RouteApp() {
    const ProtectedRoute = ({ redirectPath = '/', children, }) => {
        const { state } = useLocation();


        //if user is not logged
        if (!state) {
            return <Navigate to={redirectPath} replace />;
        }

        return (children) ? children : <Outlet />;
    };

    return (
   
            <BrowserRouter>
                <AuthUserContextProvider>
                    <HeaderNav />
                    <Routes>

                        <Route index path="/" element={<Registration />}></Route>


                        <Route element={<ProtectedRoute />}>

                            <Route path="/home" element={<UserContextProvider>
                                <Home />
                            </UserContextProvider>
                            } />
                            <Route path="/profile/:username" element={<UserContextProvider><Profile /></UserContextProvider>} />
                        </Route>


                        <Route path="*" element={<p>404 ERROR NOT FOUND </p>} />

                    </Routes>
                </AuthUserContextProvider>
            </BrowserRouter>

   
    );
}


export default RouteApp ;

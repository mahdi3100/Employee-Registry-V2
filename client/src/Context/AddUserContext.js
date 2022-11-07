import React, {  useState } from 'react';
const UserContext = React.createContext({
  /*
    elemUser:"[]",
    setUser : (element)=>{}
    */
});

const UserContextProvider = (props) => {
  const [elemUser, setNewUser] = useState([])

  return (
    <UserContext.Provider value={{
      elementUser: elemUser,
      setMyUser: (newUser) => { setNewUser(newUser) }
    }}>
      {props.children}
    </UserContext.Provider>
  )
}
export { UserContext, UserContextProvider };
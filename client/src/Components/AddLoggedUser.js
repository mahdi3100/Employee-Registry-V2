import { useContext, useEffect } from "react";
import { UserContext } from "../Context/AddUserContext.js";



/**Component to catch Live Price comming From server by Websocket */
function AddLoggedUser(props) {
  var { elementUser } = useContext(UserContext);
  if (elementUser === undefined) {
    throw new Error("elementUser was used outside of its Provider");
  }
  useEffect(() => {
   
    if (elementUser.length != 0) {//initial state 

      props.setUsers(elementUser)
      
    }

  }, [elementUser])
  return (null);
}
export default AddLoggedUser;

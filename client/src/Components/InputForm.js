import { Form } from "react-bulma-components";
import 'bulma/css/bulma.min.css';
import { useReducer } from "react";

function inputReducer(state = "", action) {
    let nextState



    action.value = action.value.trim()
    switch (action.type) {
        case 'text':


            if (/^[a-zA-Z0-9]{4,13}$/g.test(action.value) != true) {
                nextState = "danger";
                action.props.getValue(null)
            } else if (action.value.length < 8) {
                nextState = "success";
                action.props.getValue(action.value)
            }

            return nextState || state
        case 'email':


            if (/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i.test(action.value) == true) {
                nextState = "success";
                action.props.getValue(action.value)
            } else {
                nextState = "danger";
                action.props.getValue(null)
            }
            return nextState
        case 'password':

            nextState = (() => {
                if (action.value.length < 4) {
                    action.props.getValue(null)
                    return "danger";

                } else if (action.value.length < 8) {
                    action.props.getValue(action.value)
                    return "warning";

                } else if (action.value.length >= 8) {
                    action.props.getValue(action.value)
                    return "success";
                }
            })()
            return nextState || state
        default:
            return state
    }
}
function InputFrom(props) {

    const { label, type, name, placeholder } = props;

    const [colorvalue, setColorValue] = useReducer(inputReducer, "")
    /**
     * Another approach , instead using useRedcuer 
     * const [colorvalue, setColorValue] = useState({type:typeInput , value:inputvalue})
     * and inside useEffect
     * switch(colorvalue.type){
     *    case "email":
     *      if ( colorvalue.type )
     *    break;
     * }
     */

    return (
        <Form.Field>
            <Form.Label>{label}</Form.Label>
            <Form.Control>
                <Form.Input rounded
                    placeholder={placeholder}

                    type={type}
                    name={name}
                    color={colorvalue}
                    onChange={(e) => setColorValue({ props: props, name: e.target.name, type: type, value: e.target.value })}
                />
                {props.children}
            </Form.Control>

        </Form.Field>
    )
}
export default InputFrom;
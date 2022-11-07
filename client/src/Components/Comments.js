

import { Message} from "react-bulma-components";
import Moment from 'react-moment';
function Comments({ comments }) {
    return (
        comments.map((comment, key) => (
            <Message color="" key={key} >


                <Message.Body>
                    <div><b>{comment.user}</b></div>

                    {comment.txt}
                    <div style={{ fontSize: "13px" }}> <b>
                        <Moment fromNow ago>{comment.date}</Moment>
                    </b></div>
                </Message.Body>
            </Message>
        )
        )
    )
}
export default Comments;
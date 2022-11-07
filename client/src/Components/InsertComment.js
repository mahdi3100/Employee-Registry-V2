
import 'bulma/css/bulma.min.css';
import { useState, useRef } from "react";

import {  Form, Button} from "react-bulma-components";
import {useAuth } from "../Context/AuthUser"
function InsertComment({ newComment, profileusername }) {

  const {logout} = useAuth()
  const [fetchloader, setFetchloader] = useState(false)
  const [errorFetch, setErrorFetch] = useState("")
  const textarea = useRef(null);
  const submitComment = (e) => {

    if (fetchloader) return;

    let baseURL = process.env.REACT_APP_API_BASE_URL || 'localhost:8787';
    let commentTxt = textarea.current.value

    if (commentTxt.length == 0) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ comment: commentTxt, username: profileusername })
    };

    setFetchloader(true);
    setErrorFetch('')
    fetch("http://" + baseURL + "/comment", requestOptions)
      .then(res => res.json())
      .then(res => {


        //current value must before set state to affect the change
        textarea.current.value = ""


        setFetchloader(false);

        if (res["error"] == 1) { return setErrorFetch(res["error"]); }
        if (res["error"] == 2) { 
          return logout()
        }
        newComment(res)
      }).catch((err) => {
        console.log(err)
        setErrorFetch('Please try again')
        setFetchloader(false);
      });;
  }
  return (
    <>
      <Form.Field>
        <Form.Control>
          <Form.Label>Add Comment</Form.Label>
          <textarea ref={textarea} className="textarea" placeholder="Post a comment"></textarea>

        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Button
            loading={fetchloader}
            color="info"
            renderAs="button"
            onClick={(e) => submitComment()}
          >
            Submit
          </Button>
        </Form.Control>
        <Form.Help color="danger">{errorFetch}</Form.Help>
      </Form.Field>
    </>

  )
}


export default InsertComment;
import React from "react";
import { Icon, Form, Button, Box } from "react-bulma-components";
import 'bulma/css/bulma.min.css';
import { Icon as Iconify } from '@iconify/react';
import InputForm from "../../Components/InputForm";
import { AuthUserContext } from "../../Context/AuthUser";
class Signin extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      formerror: "",
      fetchloader: false,
      userLoadInfo: false,
    }
    this.form = {

      username: null,
      password: null,


    }
    this.login = this.login.bind(this)
  }
  login() {

    for (const [key, value] of Object.entries(this.form)) {

      if (value == null) {

        this.setState({ formerror: `Please fill the field ${key}` })

        return;
      }
    }

    let baseURL = process.env.REACT_APP_API_BASE_URL || 'localhost:8787';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ user: this.form })
    };

    this.setState({ fetchloader: true, formerror: "" });

    fetch("http://" + baseURL + "/signin", requestOptions)
      .then(res => res.json())
      .then(res => {
        this.setState({ formerror: '' })
       

        if (res["error"] == 1) {
          this.setState({ formerror: res["txt"], fetchloader: false })
          return
        }
        if (res["error"] == 2) {
          return this.setState({ fetchloader: false, formerror: "This user does not exist" });

        }


        return this.setState({ userLoadInfo: res.fromValidate });




      }).catch((err) => {
        console.log(err)
        this.setState({ formerror: 'Please try again' })
        this.setState({ fetchloader: false });
      });
  }
  render() {
    return (
      <>
        <InputForm getValue={(username) => (this.form = { ...this.form, "username": username })} label="Username" type="text" name="Username" placeholder="* Username" value="">
          <Icon align="left">
            <Iconify icon="uil:user" />
          </Icon>
        </InputForm>

        <InputForm getValue={(password) => (this.form = { ...this.form, "password": password })} label="Password" type="password" name="password" placeholder="* Password" value="">
          <Icon align="left">
            <Iconify icon="bi:eye-fill" />
          </Icon>
        </InputForm>



        <Button.Group>
          <Button fullwidth rounded color="primary"
            loading={this.state.fetchloader}
            onClick={() => this.login()}>Login</Button>
          <Button fullwidth rounded color="link"

            onClick={this.props.onClick}>Sign up</Button>
        </Button.Group>
        <Form.Help color="danger">{this.state.formerror}</Form.Help>

        {
          (this.state.userLoadInfo &&
            <AuthUserContext.Consumer>
              {({ login }) => (

                login(this.state.userLoadInfo)
              )}
            </AuthUserContext.Consumer>)
        }
      </>
    )
  }

}

export default Signin;
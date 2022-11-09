import React from "react";
import 'bulma/css/bulma.min.css';
import { Icon as Iconify } from '@iconify/react';
import { Block, Icon, Content, Form, Heading, Card } from "react-bulma-components";
import InsertComment from "../../Components/InsertComment"
import Comments from "../../Components/Comments"
import ButtonEdditUser from "../../Components/ButtonEdditUser";
import AddLoggedUser from "../../Components/AddLoggedUser";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthUser"
class ProfileClass extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      fetched: false,//check if fetch return
  
      userInfo: {},
      errorFetch: false,
      comments: []


    }

    //Where username profile is located || You can use  useParams by react-route
    //this.getUserProfile = props.location.state.profile
   
    this.getUserProfile = props.userName;



    this.addNewComment = this.addNewComment.bind(this);

    this.getOneUser = this.getOneUser.bind(this);
  }
  componentDidUpdate(prevProps, prevState){

if(prevProps.userName != this.props.userName){
  this.getUserProfile = this.props.userName;
 this.getOneUser()
}
  }
  componentDidMount() {

    (this.state.fetched == false && this.getOneUser());

  }
  addNewComment(newComment) {
    this.setState({ comments: [...this.state.comments, newComment] })
  }

  getOneUser() {

    let baseURL = process.env.REACT_APP_API_BASE_URL || 'localhost:8787';
 


    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    fetch("http://" + baseURL + "/users/" + this.getUserProfile, requestOptions)
      .then(res => res.json())
      .then(res => {



        if (res["error"] == 1) { return this.setState({ errorFetch: res["error"] }); }

        if (res["error"] == 2) {
          return this.props.logout()

        }


        this.setState({ userInfo: res, fetched: true, comments: res.comments });

      }).catch((err) => {
        console.log(err)
        this.setState({ errorFetch: 'Please try again' })

      });
  }

  render() {
    return (
      <Block>
        {
          (!this.state.fetched)
            ?
            <div className="loader is-centered is-loading" style={{ margin: "20px auto", height: "70px", width: "70px" }}></div>
            : <>



              <ButtonEdditUser userInfo={this.state.userInfo} />
              <AddLoggedUser setUsers={(user) => { this.setState({ userInfo: user }) }} />


              <Card style={{ margin: '10px auto' }} >
                <Card.Content>
                  <Content>


                    <div style={{ display: "flex", justifyContent: "space-around", margin: '10px auto' }}>

                      <div align="left">
                        <Iconify width="100" height="100" icon="bxs:user" color="#000" />

                        <Heading size={4}>{this.state.userInfo.firstname} {this.state.userInfo.lastname}</Heading>
                        <Heading subtitle size={6}>
                          @{this.state.userInfo.username}
                        </Heading>
                      </div>


                      <div >
                        <div style={{ display: "flex", justifyContent: "center", margin: '10px auto' }}>
                          <Icon>
                            <Iconify icon="entypo:address" color="#000" width="30" height="30" />
                          </Icon>
                          <p>{this.state.userInfo.address}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", margin: '10px auto' }}>
                          <Icon>
                            <Iconify icon="ic:baseline-work" color="#000" width="30" height="30" />
                          </Icon>
                          <p>{this.state.userInfo.role}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                          <Icon>
                            <Iconify icon="dashicons:email" color="#000" width="30" height="30" />
                          </Icon>
                          <p>{this.state.userInfo.email}</p>
                        </div>

                      </div>

                    </div>

                  </Content>
                  <Content>
                    <div className="comments">
                      <Comments comments={this.state.comments} />
                    </div>
                    <InsertComment newComment={(comment) => this.addNewComment(comment)} profileusername={this.state.userInfo.username} />
                  </Content>
                </Card.Content>

              </Card>
            </>
        }
      </Block>
    )
  }
}
const Profile = (props) => {
  //let location = useLocation();
 // let navigate = useNavigate();
  let { logout } = useAuth()
  let { username } = useParams();

  return (<ProfileClass {...props} userName={username} logout={logout}/>)
};

export default Profile

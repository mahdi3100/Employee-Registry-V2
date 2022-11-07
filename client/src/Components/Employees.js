import { Icon, Card, Media, Heading, Content, Button } from "react-bulma-components";
import 'bulma/css/bulma.min.css';
import { Icon as Iconify } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthUser";
export default function Employees({ usersInfo }) {

  const { authUser } = useAuth();
  const navigate = useNavigate();
  const toProfile = (username) => {


    navigate(`/profile/${username}`, { state: { user: authUser, profile: username } })
  }
  return (
    usersInfo.map((userInfo, key) => (
      <Card style={{ width: 300, margin: '10px auto' }} key={key} >

        <Card.Content>
          <Media>
            <Media.Item renderAs="figure" align="left">
              <Iconify width="100" height="100" icon="bxs:user" color="#757575" />
            </Media.Item>
            <Media.Item>
              <Heading size={4}>{userInfo.firstname} {userInfo.lastname}</Heading>
              <Heading subtitle size={6}>
                @{userInfo.username}
              </Heading>
            </Media.Item>
          </Media>
          <Content>



            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <Icon>
                <Iconify icon="entypo:address" color="#b0b0b0" width="30" height="30" />
              </Icon>
              <p>{userInfo.address}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <Icon>
                <Iconify icon="ic:baseline-work" color="#b0b0b0" width="30" height="30" />
              </Icon>
              <p>{userInfo.role}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <Icon>
                <Iconify icon="dashicons:email" color="#b0b0b0" width="30" height="30" />
              </Icon>
              <p>{userInfo.email}</p>
            </div>


            <Button fullwidth rounded color="link"

              onClick={() => toProfile(userInfo.username)}>Profile</Button>



          </Content>
        </Card.Content>

      </Card>

    )
    )
  );
}
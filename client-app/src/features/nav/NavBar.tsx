import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/taco.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
        <Menu.Item name="Training" as={NavLink} to="/activities" />
        <Menu.Item name="Food" as={NavLink} to="/foods" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createactivity"
            color="blue"
            content="New Activity"
          />
        </Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createfood"
            color="blue"
            content="Add Food"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);

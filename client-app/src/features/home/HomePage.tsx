import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";

const HomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className="homepage">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/taco.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          FoodTrack
        </Header>
        <Button as={Link} to="/activities" size="huge" inverted icon="">
          Training
        </Button>
        <Button as={Link} to="/foods" size="huge" inverted icon="">
          Foods
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;

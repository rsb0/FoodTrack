import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  Label,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { user } from "../../../assets/images";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <SegmentGroup>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={user} />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
              <Item.Extra>
                <Label basic content="Category" />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {activity.date}
        <Icon name="marker" /> {activity.venue} {activity.city}
      </Segment>
      <Segment secondary>Attendies will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </SegmentGroup>
  );
};

export default ActivityListItem;

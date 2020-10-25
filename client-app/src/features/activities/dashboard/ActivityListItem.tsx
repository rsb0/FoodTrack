import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  Label,
  Segment,
  SegmentGroup,
  Header
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <SegmentGroup>
      <Segment>
        <Item>
          <Item.Content>
            <Header size="large">{activity.title}</Header>
          </Item.Content>
        </Item>
      </Segment>
      <Segment>
        <Icon name="clock" /> {activity.date}
      </Segment>
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

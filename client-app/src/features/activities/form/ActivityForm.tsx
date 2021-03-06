import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid, GridColumn } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailsParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length,
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={activity.title}
            />
            <Form.TextArea
              rows={2}
              name="description"
              onChange={handleInputChange}
              placeholder="Description"
              value={activity.description}
            />
            <Form.Input
              name="category"
              onChange={handleInputChange}
              placeholder="Category"
              value={activity.category}
            />
            <Form.Input
              name="date"
              onChange={handleInputChange}
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <Form.Input
              name="city"
              onChange={handleInputChange}
              placeholder="City"
              value={activity.city}
            />
            <Form.Input
              name="venue"
              onChange={handleInputChange}
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated="left"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={() => history.push("/activities")}
              floated="left"
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);

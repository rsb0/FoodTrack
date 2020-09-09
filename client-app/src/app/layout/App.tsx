import React, { useState, useEffect, SyntheticEvent, useContext } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");


  useEffect(() => {
    activityStore.loadActivities();
  }, 
  // using a function inside useEffect: have to tell useEffect about what dependencies it needs to run this particular function
  [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

export default observer(App);

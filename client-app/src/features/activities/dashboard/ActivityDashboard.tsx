import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <Grid.Column width={6}>
        <h2>Activity filter</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);

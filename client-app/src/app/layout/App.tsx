import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import FoodDashboard from "../../features/foods/dashboard/FoodDashboard";
import FoodForm from "../../features/foods/form/FoodForm";
import "./styles.css";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Container className="mainContainer">
        <Route exact path="/" component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <>
              <NavBar />
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                path={["/createactivity", "/manage/:id"]}
                component={ActivityForm}
              />
              <Route exact path="/foods" component={FoodDashboard} />
              <Route
                key={location.key}
                path={["/createfood", "/manage/:id"]}
                component={FoodForm}
              />
            </>
          )}
        />
      </Container>
    </>
  );
};

export default withRouter(observer(App));

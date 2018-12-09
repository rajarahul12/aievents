import React from "react";
// import { Grid } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsNav from "./SettingsNav";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";

const SettingsDashboard = () => {
  return (
    <div className="grid-container">
      <div className="margin_adj">
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/basic" component={BasicPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photo" component={PhotosPage} />
          <Route path="/settings/account" component={AccountPage} />
        </Switch>
      </div>
      <SettingsNav />
    </div>
  );
};

export default SettingsDashboard;

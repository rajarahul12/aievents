import React from "react";

const HomePage = ({ history }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo1.png"
              alt="logo"
            />
            <div className="content">School of AI Meetups</div>
          </h1>
          <h2>
            We provide world-class AI education to anyone through Meetups and
            more.
          </h2>
          <div
            onClick={() => history.push("/events")}
            className="ui huge white inverted button"
          >
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

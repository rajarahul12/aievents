import React from "react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { connect } from "react-redux";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    event
  };
};

const EventDetailedPage = ({ event }) => {
  return (
    <div className="flex-container">
      <div className="div1">
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </div>
      <div>
        <EventDetailedSidebar attendees={event.attendees} />
      </div>
    </div>
  );
};

export default connect(mapState)(EventDetailedPage);

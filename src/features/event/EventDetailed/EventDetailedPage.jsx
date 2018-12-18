import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
// import { toastr } from "react-redux-toastr";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { objectToArray } from "../../../app/common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = state => {
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  return {
    event,
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      requesting
    } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);

    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) {
      return <LoadingComponent inverted={true} />;
    } else {
      return (
        <Grid>
          <Grid.Column width={10}>
            <EventDetailedHeader
              event={event}
              isHost={isHost}
              isGoing={isGoing}
              goingToEvent={goingToEvent}
              cancelGoingToEvent={cancelGoingToEvent}
            />
            <EventDetailedInfo event={event} />
            <EventDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventDetailedSidebar attendees={attendees} />
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(EventDetailedPage)
);

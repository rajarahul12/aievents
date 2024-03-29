import React, { Component } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { getEventsForDashboard } from "../eventActions";
import EventList from "../EventList/EventList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
];

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {},
    width: 0
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    // console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
    this.setState({
      width: window.innerWidth
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    // console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    // console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleContextRef = contextRef => {
    this.setState({ contextRef });
  };

  render() {
    const { loading, activities } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.width <= 600) {
      if (this.state.loadingInitial)
        return <LoadingComponent inverted={true} />;
      else {
        return (
          <div>
            <div ref={this.handleContextRef}>
              <EventList
                loading={loading}
                moreEvents={moreEvents}
                events={loadedEvents}
                getNextEvents={this.getNextEvents}
              />
            </div>
          </div>
        );
      }
    } else {
      if (this.state.loadingInitial)
        return <LoadingComponent inverted={true} />;
      else {
        return (
          <Grid>
            <Grid.Column width={10}>
              <div ref={this.handleContextRef}>
                <EventList
                  loading={loading}
                  moreEvents={moreEvents}
                  events={loadedEvents}
                  getNextEvents={this.getNextEvents}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <EventActivity
                activities={activities}
                contextRef={this.state.contextRef}
              />
            </Grid.Column>
            <Grid.Column width={10} style={{ marginBottom: "20px" }}>
              <Loader active={loading} />
            </Grid.Column>
          </Grid>
        );
      }
    }
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(query)(EventDashboard));

import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { cuid } from "cuid";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  // console.log(event);
  return event;
};

const actions = {
  createEvent,
  updateEvent
};

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  onInputChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  };

  render() {
    const { handleCancel } = this.props;
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Meetup Title</label>
            <input
              value={event.title}
              name="title"
              onChange={this.onInputChange}
              placeholder="Meetup Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Meetup Date</label>
            <input
              value={event.date}
              type="date"
              onChange={this.onInputChange}
              name="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              value={event.city}
              name="city"
              onChange={this.onInputChange}
              placeholder="City where Meetup is going to taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              value={event.venue}
              name="venue"
              onChange={this.onInputChange}
              placeholder="Enter the Venue of the Meetup"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={event.hostedBy}
              onChange={this.onInputChange}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={handleCancel} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(
  mapState,
  actions
)(EventForm);

import React from "react";
import { Segment, Image, Item, Header, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const eventImageStyle = {
  filter: "brightness(30%)",
  height: "400px",
  width: "700px"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EventDetailedHeader = ({
  openModal,
  authenticated,
  loading,
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent
}) => {
  let eventDate;
  if (event.date) {
    eventDate = event.date.toDate();
  }
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpeg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{format(eventDate, "dddd Do MMMM")}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing && !event.cancelled && (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Cancel My Place
              </Button>
            )}

            {!isGoing && authenticated && !event.cancelled && (
              <Button
                loading={loading}
                onClick={() => goingToEvent(event)}
                color="teal"
              >
                JOIN THIS EVENT
              </Button>
            )}

            {!authenticated && !event.cancelled && (
              <Button
                loading={loading}
                onClick={() => openModal("UnauthModal")}
                color="teal"
              >
                JOIN THIS EVENT
              </Button>
            )}

            {event.cancelled && !isHost && (
              <Label
                size="large"
                color="red"
                content="This Event has been Cancelled"
              />
            )}
          </div>
        )}

        {isHost && (
          <Button as={Link} to={`/manage/${event.id}`} color="orange">
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;

import React from "react";
import { Card, Grid, Header, Image, Segment, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const panes = [
  { menuItem: "All Events", pane: { key: "allEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Hosted Events", pane: { key: "hostedEvents" } }
];

const UserDeteiledEvents = ({ events, eventsLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading} style={{ overflow: "auto" }}>
        <Header icon="calendar" content="Events" />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />
        <Card.Group style={{ overflow: "auto" }}>
          {events &&
            events.map(event => (
              <Card
                style={{ height: "250px", width: "150px" }}
                as={Link}
                to={`/event/${event.id}`}
                key={event.id}
              >
                <Image
                  style={{ height: "100px", width: "150px" }}
                  src={`/assets/categoryImages/${event.category}.jpeg`}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      {format(event.date && event.date.toDate(), "DD-MM-YYYY")}
                    </div>
                    <div>
                      {format(event.date && event.date.toDate(), "h:mm A")}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDeteiledEvents;

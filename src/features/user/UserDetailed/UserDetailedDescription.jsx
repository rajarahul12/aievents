import React from "react";
import { Grid, Header, Icon, Item, List, Segment } from "semantic-ui-react";
import format from "date-fns/format";

const UserDetailedDescription = ({ profile }) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), "D MMM YYYY");
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid stackable divided textAlign="center" columns={2}>
          <Grid.Column width={10}>
            <Header as="h2" icon textAlign="center">
              <Icon name="smile" />
              <Header.Content>{`About ${profile.displayName}`}</Header.Content>
            </Header>
            {/* <Header
              icon="smile"
              style={{ textAlign: "center" }}
              content={`About ${profile.displayName}`}
            /> */}
            <p>
              I am a: <strong>{profile.occupation || "tbn"}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin || "tbn"}</strong>
            </p>
            <p>
              Member Since: <strong>{createdAt}</strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h2" icon textAlign="center">
              <Icon name="heart outline" />
              <Header.Content>"Interests</Header.Content>
            </Header>
            {/* <Header icon="heart outline" content="Interests" /> */}
            {profile.interests ? (
              <List>
                {profile.interests &&
                  profile.interests.map((interest, index) => (
                    <Item key={index}>
                      <Icon name="heart" />
                      <Item.Content>{interest}</Item.Content>
                    </Item>
                  ))}
              </List>
            ) : (
              <p>No interests</p>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;

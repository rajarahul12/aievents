import React from "react";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import differenceInYears from "date-fns/difference_in_years";
import UserDetailedSidebar from "./UserDetailedSidebar";

const UserDetailedHeader = ({
  isCurrentUser,
  followUser,
  unfollowUser,
  profile,
  isFollowing
}) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "unknown age";
  }
  return (
    <Segment>
      <Grid stackable columns="equal" padded>
        <Grid.Column width={10}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="bottom">
                <Header textAlign="center" as="h1">
                  {profile.displayName}
                </Header>
                <br />
                <Header textAlign="center" as="h3">
                  {profile.occupation}
                </Header>
                <br />
                <Header textAlign="center" as="h3">
                  {age}, Lives in {profile.city || "unknown city"}
                </Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <UserDetailedSidebar
          isFollowing={isFollowing}
          isCurrentUser={isCurrentUser}
          unfollowUser={unfollowUser}
          followUser={followUser}
          profile={profile}
        />
      </Grid>
    </Segment>
  );
};

export default UserDetailedHeader;

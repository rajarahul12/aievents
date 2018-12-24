import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailedSidebar = ({
  isCurrentUser,
  followUser,
  unfollowUser,
  profile,
  isFollowing
}) => {
  return (
    <Grid.Column width={4}>
      {isCurrentUser && (
        <Button
          as={Link}
          to="/settings"
          color="teal"
          fluid
          basic
          content="Edit Profile"
        />
      )}
      {!isCurrentUser && !isFollowing && (
        <Button
          onClick={() => followUser(profile)}
          color="teal"
          fluid
          basic
          content="Follow user"
        />
      )}

      {!isCurrentUser && isFollowing && (
        <Button
          onClick={() => unfollowUser(profile)}
          color="teal"
          fluid
          basic
          content="Unfollow"
        />
      )}
    </Grid.Column>
  );
};

export default UserDetailedSidebar;

import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { toastr } from "react-redux-toastr";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";
import { userDetailedQuery } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEvents, followUser, unfollowUser } from "../userActions";

const actions = {
  getUserEvents,
  followUser,
  unfollowUser
};

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following
  };
};

class UserDetailedPage extends Component {
  async componentDidMount() {
    let user = await this.props.firestore.get(
      `users/${this.props.match.params.id}`
    );
    if (!user.exists) {
      toastr.error("Not Found", "User doesnot exist");
      this.props.history.push("/error");
    }
    await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      events,
      eventsLoading,
      followUser,
      following,
      unfollowUser
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = requesting[`users/${match.params.id}`];
    const isFollowing = !isEmpty(following);
    if (loading) {
      return <LoadingComponent inverted={true} />;
    } else {
      return (
        <Grid centered>
          <Grid.Column width={12}>
            <UserDetailedHeader
              profile={profile}
              isFollowing={isFollowing}
              isCurrentUser={isCurrentUser}
              unfollowUser={unfollowUser}
              followUser={followUser}
            />
          </Grid.Column>

          {/* <UserDetailedSidebar
            isFollowing={isFollowing}
            isCurrentUser={isCurrentUser}
            unfollowUser={unfollowUser}
            followUser={followUser}
            profile={profile}
          /> */}
          <UserDetailedDescription profile={profile} />
          {photos && photos.length > 0 && (
            <UserDetailedPhotos photos={photos} />
          )}
          <UserDetailedEvents
            changeTab={this.changeTab}
            events={events}
            eventsLoading={eventsLoading}
          />
        </Grid>
      );
    }
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid, match) =>
    userDetailedQuery(auth, userUid, match)
  )
)(UserDetailedPage);

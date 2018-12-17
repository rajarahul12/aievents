import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";
import { closeModal } from "../modals/modalActions";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      dispatch(asyncActionStart());
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
      dispatch(asyncActionFinish());
    } catch (error) {
      // console.log(error);
      dispatch(asyncActionError());
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const registerUser = user => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(asyncActionStart());
      //create the user in auth
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      console.log(createdUser);
      //update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      });
      //create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore.set(`users/${createdUser.uid}`, { ...newUser });
      dispatch(closeModal());
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      throw new SubmissionError({ _error: error.message });
    }
  };
};

export const socialLogin = selectedProvider => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: "popup"
      });
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
  };
};

export const updatePassword = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.newPassword1);
      await dispatch(reset("account"));
      toastr.success("Success", "Your Password has been updated");
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

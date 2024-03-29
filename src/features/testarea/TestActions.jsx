import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  COUNTER_ACTION_FINISHED,
  COUNTER_ACTION_STARTED
} from "./testConstants";

import firebase from "../../app/config/firebase";

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};

export const startCounterAction = () => {
  return {
    type: COUNTER_ACTION_STARTED
  };
};

export const finsihCounterAction = () => {
  return {
    type: COUNTER_ACTION_FINISHED
  };
};

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const incrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction());
    await delay(1000);
    dispatch({ type: INCREMENT_COUNTER });
    dispatch(finsihCounterAction());
  };
};

export const decrementAsync = () => {
  return async dispatch => {
    dispatch(startCounterAction());
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER });
    dispatch(finsihCounterAction());
  };
};

export const testPermissions = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    let userDocRef = await firestore
      .collection("users")
      .doc("n2a0GxQ92qWzB41k1eKhn0ucTYF2");
    userDocRef.update({
      displayName: "testing"
    });
  } catch (err) {
    console.log(err);
  }
};

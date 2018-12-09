import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

//Increment Action
export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

//Decrement Action
export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};

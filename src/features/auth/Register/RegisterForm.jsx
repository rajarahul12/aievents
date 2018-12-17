import React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser } from "../authActions";
// import SocialLogin from "../SocialLogin/SocialLogin";

const actions = {
  registerUser
};

const mapState = state => ({
  loading: state.async.loading
});

const validate = combineValidators({
  displayName: isRequired("Display Name"),
  email: isRequired("Email"),
  password: isRequired("Password")
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting,
  loading
}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button
            loading={loading}
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
          >
            Register
          </Button>
          {/* <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={socialLogin} /> */}
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  mapState,
  actions
)(reduxForm({ form: "registerForm", validate })(RegisterForm));

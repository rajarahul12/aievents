import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { login, socialLogin } from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";
// import { invalid } from "moment";

const actions = {
  login,
  socialLogin
};

const mapState = state => ({
  loading: state.async.loading
});

const LoginForm = ({ login, handleSubmit, error, socialLogin, loading }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
        <Button loading={loading} fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin loading={loading} socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

export default connect(
  mapState,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));

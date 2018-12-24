import React, { Component } from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { login, socialLogin } from "../authActions";
import SocialLogin from "../SocialLogin/SocialLogin";
import { openModal, closeModal } from "../../modals/modalActions";

const actions = {
  login,
  socialLogin,
  closeModal,
  openModal
};

const mapState = state => ({
  loading: state.async.loading
});

class LoginForm extends Component {
  handleRegisterInLogin = () => {
    this.props.closeModal();
    this.props.openModal("RegisterModal");
  };

  render() {
    const { login, handleSubmit, error, socialLogin, loading } = this.props;
    return (
      <div>
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
              placeholder="Password"
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
        <Divider horizontal>Or</Divider>
        <h4 className="text-align">New User</h4>
        <Button
          onClick={this.handleRegisterInLogin}
          disabled={loading}
          fluid
          size="large"
          color="teal"
        >
          Proceed to Register Form
        </Button>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));

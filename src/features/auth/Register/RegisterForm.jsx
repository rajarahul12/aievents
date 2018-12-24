import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser } from "../authActions";
// import SocialLogin from "../SocialLogin/SocialLogin";
import { openModal, closeModal } from "../../modals/modalActions";

const actions = {
  registerUser,
  openModal,
  closeModal
};

const mapState = state => ({
  loading: state.async.loading
});

const validate = combineValidators({
  displayName: isRequired("Display Name"),
  email: isRequired("Email"),
  password: isRequired("Password")
});

class RegisterForm extends Component {
  handleLoginInRegister = () => {
    this.props.closeModal();
    this.props.openModal("LoginModal");
  };

  render() {
    const {
      handleSubmit,
      registerUser,
      error,
      invalid,
      submitting,
      loading
    } = this.props;
    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(registerUser)}>
          <Segment>
            <Field
              name="displayName"
              type="text"
              component={TextInput}
              placeholder="Display Name"
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
        <Divider horizontal>Or</Divider>
        <h4 className="text-align">Already a User / To continue with Google</h4>
        <Button
          onClick={this.handleLoginInRegister}
          disabled={loading}
          fluid
          size="large"
          color="teal"
        >
          Proceed to Login Form
        </Button>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "registerForm", validate })(RegisterForm));

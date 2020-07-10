import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import signinImg from '../../../images/signin.jpg';
import Button from '../../../components/uielements/button';
import authAction from '../../../redux/auth/actions';
import { loginRequest } from '../../../redux/auth/apiUtils';
import TextField from '../../../components/uielements/textfield';
import Scrollbars from '../../../components/utility/customScrollBar';
import SignInStyleWrapper from './signin.style';

const { login } = authAction;
let errors = {};

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    usernameOrEmail: '',
    password: '',
    isError: false,
  };

  componentDidUpdate(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleLogin = () => {
    const { login } = this.props;
    const { usernameOrEmail, password } = this.state;
    const loginRequestObj = Object.assign({}, { usernameOrEmail, password });
    loginRequest(loginRequestObj)
      .then(response => {
        console.log('response ' + JSON.stringify(response));
        login({ usernameOrEmail, password });
        //this.props.history.push('/dashboard');
        errors['WrongCredentials'] = null;
      })
      .catch(error => {
        if (error.status === 401) {
          console.log(
            'Your Username or Password is incorrect. Please try again!'
          );
          errors['WrongCredentials'] =
            'Your Username or Password is incorrect. Please try again!';
          this.setState({ isError: true });
        } else {
          console.log('Sorry! Something went wrong. Please try again!');
          errors['WrongCredentials'] =
            'Sorry! Something went wrong. Please try again!';
          this.setState({ isError: true });
        }
      });
  };

  onChangeUsername = event =>
    this.setState({ usernameOrEmail: event.target.value });
  onChangePassword = event => this.setState({ password: event.target.value });

  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer, username, password } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="mateSignInPage">
        <div className="mateSignInPageImgPart">
          <div className="mateSignInPageImg">
            <img src={signinImg} alt="Kiwi standing on oval" />
          </div>
        </div>

        <div className="mateSignInPageContent">
          <div className="mateSignInPageLink">
            <Link to="/signup">
              <button className="mateSignInPageLinkBtn" type="button">
                Register
              </button>
            </Link>
            <Link to="#">
              <button className="mateSignInPageLinkBtn active" type="button">
                Login
              </button>
            </Link>
          </div>
          <Scrollbars style={{ height: '100%' }}>
            <div className="mateSignInPageGreet">
              <h1>Hello,</h1>
              <p>Please login in.</p>
            </div>
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="mateLoginSubmit">
                <Button type="button" onClick={this.handleLogin}>
                  Login
                </Button>
              </div>
            </div>
            <div className="mateInputWrapper">
              <span style={{ color: 'red' }}>{errors['WrongCredentials']}</span>
            </div>
          </Scrollbars>
        </div>
      </SignInStyleWrapper>
    );
  }
}
export default connect(
  state => ({
    isLoggedIn: state.Auth.user !== null ? true : false,
  }),
  { login }
)(SignIn);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import signinImg from '../../../images/signin.svg';
import TextField from '../../../components/uielements/textfield';
import Scrollbars from '../../../components/utility/customScrollBar';
import Button from '../../../components/uielements/button';
import authAction from '../../../redux/auth/actions';
import IntlMessages from '../../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import {checkUsernameAvailability, checkEmailAvailability} from '../../../redux/auth/apiUtils'
import { 
  NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
  USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../../redux/auth/constants';
import { Form, Input, notification } from 'antd';
const FormItem = Form.Item;

const { register } = authAction;


class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToReferrer: false,
      name: {
        value: ''
      },
      username: {
          value: ''
      },
      email: {
          value: ''
      },
      password: {
          value: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }
  
  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : {
            value: inputValue,
            ...validationFun(inputValue)
        }
    });
  }

  handleSubmit(event) {

    event.preventDefault();
    const { register } = this.props;
    console.log("in handle submit");
    const signupRequest = {
        name: this.state.name.value,
        email: this.state.email.value,
        username: this.state.username.value,
        password: this.state.password.value
    };
    register(signupRequest);
    this.props.history.push("/signin");
  }

  isFormInvalid() {
    return !(this.state.name.validateStatus === 'success' &&
        this.state.username.validateStatus === 'success' &&
        this.state.email.validateStatus === 'success' &&
        this.state.password.validateStatus === 'success'
    );
  }


  render() {
    return (
      <SignUpStyleWrapper className="mateSignUpPage">
        <div className="mateSignInPageImgPart">
          <div className="mateSignInPageImg">
            <img src={signinImg} alt="Kiwi standing on oval" />
          </div>
        </div>
        <div className="mateSignInPageContent">
        <div className="mateSignInPageLink">
            <Link to="#">
              <button className="mateSignInPageLinkBtn active" type="button">
                Register
              </button>
            </Link>
            <Link to="/signin">
              <button className="mateSignInPageLinkBtn " type="button">
                Login
              </button>
            </Link>
          </div>
          <Scrollbars style={{ height: '100%' }}>
            <div className="mateSignInPageGreet">
                <h1>Its Free, Join Us</h1>
                <p>
                  Welcome to Mate Admin, Please SignUp with your personal account
                  information.
                </p>
            </div>
            <div className="mateSignInPageForm">
              <FormItem 
                  label="Full Name"
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}>
                  <Input 
                      size="large"
                      name="name"
                      autoComplete="off"
                      placeholder="Your full name"
                      value={this.state.name.value} 
                      onChange={(event) => this.handleInputChange(event, this.validateName)} />    
              </FormItem>
              <FormItem label="Username"
                  hasFeedback
                  validateStatus={this.state.username.validateStatus}
                  help={this.state.username.errorMsg}>
                  <Input 
                      size="large"
                      name="username" 
                      autoComplete="off"
                      placeholder="A unique username"
                      value={this.state.username.value} 
                      onBlur={this.validateUsernameAvailability}
                      onChange={(event) => this.handleInputChange(event, this.validateUsername)} />    
              </FormItem>
              <FormItem 
                  label="Email"
                  hasFeedback
                  validateStatus={this.state.email.validateStatus}
                  help={this.state.email.errorMsg}>
                  <Input 
                      size="large"
                      name="email" 
                      type="email" 
                      autoComplete="off"
                      placeholder="Your email"
                      value={this.state.email.value} 
                      onBlur={this.validateEmailAvailability}
                      onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
              </FormItem>
              <FormItem 
                  label="Password"
                  validateStatus={this.state.password.validateStatus}
                  help={this.state.password.errorMsg}>
                  <Input 
                      size="large"
                      name="password" 
                      type="password"
                      autoComplete="off"
                      placeholder="A password between 6 to 20 characters" 
                      value={this.state.password.value} 
                      onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
              </FormItem>
              <div className="mateLoginSubmit">
                <Button type="button" onClick={this.handleSubmit} disabled={this.isFormInvalid()}>
                  Sign Up
                </Button>
              </div>
            </div>
          </Scrollbars>
        </div>
      </SignUpStyleWrapper>
      
    );
  }

  // Validation Functions

  validateName = (name) => {
    if(name.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
        }
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}

validateEmail = (email) => {
    if(!email) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email may not be empty'                
        }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(email)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email not valid'
        }
    }

    if(email.length > EMAIL_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
        }
    }

    return {
        validateStatus: null,
        errorMsg: null
    }
}

validateUsername = (username) => {
    if(username.length < USERNAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
        }
    } else if (username.length > USERNAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: null,
            errorMsg: null
        }
    }
}

validateUsernameAvailability() {
    // First check for client side errors in username
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if(usernameValidation.validateStatus === 'error') {
        this.setState({
            username: {
                value: usernameValue,
                ...usernameValidation
            }
        });
        return;
    }

    this.setState({
        username: {
            value: usernameValue,
            validateStatus: 'validating',
            errorMsg: null
        }
    });

    checkUsernameAvailability(usernameValue)
    .then(response => {
        if(response.available) {
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        } else {
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'error',
                    errorMsg: 'This username is already taken'
                }
            });
        }
    })
    
    .catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });
        console.log(error);
    });
    
}


validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if(emailValidation.validateStatus === 'error') {
        this.setState({
            email: {
                value: emailValue,
                ...emailValidation
            }
        });    
        return;
    }

    this.setState({
        email: {
            value: emailValue,
            validateStatus: 'validating',
            errorMsg: null
        }
    });

    checkEmailAvailability(emailValue)
    .then(response => {
        if(response.available) {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        } else {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'error',
                    errorMsg: 'This Email is already registered'
                }
            });
        }
    }).catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });
    });
}

validatePassword = (password) => {
    if(password.length < PASSWORD_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
        }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };            
    }
}

}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
  }),
  { register }
)(SignUp);
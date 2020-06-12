import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import signinImg from '../../../images/signup.jpg';
import TextField from '../../../components/uielements/textfield';
import Scrollbars from '../../../components/utility/customScrollBar';
import Button from '../../../components/uielements/button';
import authAction from '../../../redux/auth/actions';
import SignUpStyleWrapper from './signup.style';
import {checkUsernameAvailability, checkEmailAvailability} from '../../../redux/auth/apiUtils'
import { 
  NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
  USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../../redux/auth/constants';

const { register } = authAction;

let errors = {};

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToReferrer: false,
      isUsernameAvailable: '',
      isEmailAvailable: '',

      successOnName: '',
      successOnEmail: '',
      successOnUsername: '',
      successOnPassword: '',

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
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }
  
  handleInputChange(event, validationFun, type) {
    const target = event.target;
    //const inputName = target.name;        
    const inputValue = target.value;
    this.setState({
        [type] : {
            value: inputValue,
            ...validationFun(inputValue)
        }
    });
    console.log(this.state);
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
    
    return !(this.state.successOnEmail === 'success' &&
        this.state.successOnName === 'success' &&
        this.state.successOnPassword === 'success' &&
        this.state.successOnUsername === 'success'
    )
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
                <center><p>Please register to become one of our members!</p></center>
            </div>
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={(event) => this.handleInputChange(event, this.validateUsername, "username")}
                />
                <span style={{color: "red"}}>{errors["username"]}</span>
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  type="Email"
                  onChange={(event) => this.handleInputChange(event, this.validateEmail, "email")}
                />
                <span style={{color: "red"}}>{errors["email"]}</span>
              </div>

              <div className="mateInputWrapper">
                <TextField
                  label="Name"
                  placeholder="Name"
                  margin="normal"
                  onChange={(event) => this.handleInputChange(event, this.validateName, "name")}
                />
                <span style={{color: "red"}}>{errors["name"]}</span>
              </div>

              <div className="mateInputWrapper">
                <TextField
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  onChange={(event) => this.handleInputChange(event, this.validatePassword, "password")} 
                />
                <span style={{color: "red"}}>{errors["password"]}</span>
              </div>
              
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
      errors["name"] =`Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`;
      this.setState({successOnName: 'error'});
    } else if (name.length > NAME_MAX_LENGTH) {
      errors["name"] = `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`;
      this.setState({successOnName: 'error'});
    } else {
      errors["name"] = null;  
      this.setState({successOnName: 'success'});
    }
}

validateEmail = (email) => {
    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');

    checkEmailAvailability(email)
    .then(response => {
      if(!response.available){
        errors["email"] = "Email already in use";
        this.setState({successOnEmail: 'error'});
        this.setState({
          isUsernameAvailable: response
        });
      }
    });

    if(!email) {
      errors["email"] = "Email may not be empty";
      this.setState({successOnEmail: 'error'});
    }else if(!EMAIL_REGEX.test(email)) {
      errors["email"] = 'Email not valid';
      this.setState({successOnEmail: 'error'});
    }else if(email.length > EMAIL_MAX_LENGTH) {
      errors["email"] = `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`;
      this.setState({successOnEmail: 'error'});
    } else {
      errors["email"] = null;
      this.setState({successOnEmail: 'success'});
    }
}

validateUsername = (username) => {
    checkUsernameAvailability(username)
    .then(response => {
      if(!response.available){
        errors["username"] = "Username already in use";
        this.setState({successOnUsername: 'error'});
        this.setState({
          isUsernameAvailable: response
        });
      }
    })

    if(username.length < USERNAME_MIN_LENGTH) {
      errors["username"] = `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`;
      this.setState({successOnUsername: 'error'});
    } else if (username.length > USERNAME_MAX_LENGTH) {
      errors["username"] = `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`;
      this.setState({successOnUsername: 'error'});
    } else {
      errors["username"] = null;
      this.setState({successOnUsername: 'success'});
    }
}


validatePassword = (password) => {
    if(password.length < PASSWORD_MIN_LENGTH) {
      errors["password"] = `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`;
      this.setState({successOnPassword: 'error'});
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      errors["password"] = `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`;
      this.setState({successOnPassword: 'error'});
    } else {
      errors["password"] = null;   
      this.setState({successOnPassword: 'success'});   
    }
}

}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
  }),
  { register }
)(SignUp);
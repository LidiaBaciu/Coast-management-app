import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import {
  Row,
  FullColumn,
  HalfColumn,
} from '../../components/utility/rowColumn';
import PageTitle from '../../components/utility/paperTitle';
import Button from '../../components/uielements/button';
import TextField from '../../components/uielements/textfield';
import { Chip } from './chips.style';
//import Avatar from '../../components/uielements/avatars';
import Avatar from '../UiElements/Avatars/avatars.style'
import Image from '../../images/cover.jpg';

const reducer = combineReducers({ form: reduxFormReducer });
const store = createStore(reducer);

export default class extends Component {
  state = {
    result: '',
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name'),
    createdAt: localStorage.getItem('createdAt'),
    updatedAt: localStorage.getItem('updatedAt'),
    role: localStorage.getItem('role'),
    anotherUsername: '',
  };
  onSubmit = value => {
    if (value) {
      this.setState({ result: `${JSON.stringify(value, null, 4)}` });
    } else {
      this.setState({ result: '' });
    }
  };

  onChangeUsername = event =>
    this.setState({ anotherUsername: event.target.value });
  onChangeEmail = event => this.setState({ email: event.target.value });

  handleClick = () => {
    let username = this.state.anotherUsername;
    console.log(this.state.anotherUsername);
    alert('You clicked the Chip.' + username);
  };

  render() {
    //const { result } = this.state;
    return (
      <Provider store={store}>
         <center>
          {<Avatar className="blueAvatar" style={{marginTop: '50px'}}>{JSON.parse(this.state.name).charAt(0)}</Avatar>}
          <h2>{JSON.parse(this.state.name)}</h2>
        </center>
        <LayoutWrapper >
        {/*<img src={Image} style={{height : '70%', width : '100%'}} alt="user" />*/}
          <Row style={{ marginBottom: '5px' }}>
            <Row>
              <HalfColumn>
                <Papersheet style={{backgroundColor: '#E5ECF1'}}>
                  <Row>
                    <h3> Username: </h3>
                    <Chip label={JSON.parse(this.state.username)} />
                  </Row>
                  <Row>
                    <h3> Email: </h3>
                    <Chip label={JSON.parse(this.state.email)} />
                  </Row>
                  <Row>
                    <h3> Role: </h3>
                    <Chip label={JSON.parse(this.state.role)} />
                  </Row>
                </Papersheet>
              </HalfColumn>
              <HalfColumn>
                <Papersheet style={{backgroundColor: '#E5ECF1'}}>
                  <Row style={{ marginBottom: '5px' }}>
                    <h3> Created at: </h3>
                    <Chip label={JSON.parse(this.state.createdAt)} />
                  </Row>
                  <Row style={{ marginBottom: '5px' }}>
                    <h3> Updated at: </h3>
                    <Chip label={JSON.parse(this.state.updatedAt)} />
                  </Row>
                </Papersheet>
              </HalfColumn>
            </Row>
          </Row>
          {/** 
          <Row>
            <FullColumn>
              <Papersheet title="Do you want to change some profile details?" style={{backgroundColor: '#E5ECF1'}}>
                <TextField
                  label="New name"
                  fullWidth
                  placeholder="Please enter your new name"
                  margin="normal"
                  onChange={this.onChangeUsername}
                />
                <Button onClick={this.handleClick}>Save</Button>
              </Papersheet>
            </FullColumn>
          </Row>
          */}
        </LayoutWrapper>
      </Provider>
    );
  }
}

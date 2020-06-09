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
import IntlMessages from '../../components/utility/intlMessages';
import { FormsComponentWrapper, FormsMainWrapper } from './forms.style';
import PageTitle from '../../components/utility/paperTitle';
import Button from '../../components/uielements/button';
import TextField from '../../components/uielements/textfield';
import Image from '../../images/admin.png';
import { Chip, Icon, Wrapper } from './chips.style';
import Avatar from '../../components/uielements/avatars';

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

  handleClick() {
    alert('You clicked the Chip.');
  }

  render() {
    const { result } = this.state;
    return (
      <Provider store={store}>
        <LayoutWrapper>
          <Row style={{ marginBottom: '5px' }}>
            <FullColumn>
              <Row>
                <PageTitle title="Your information" data-single />
              </Row>
              <center>
                {<Avatar>{JSON.parse(this.state.name).charAt(0)}</Avatar>}
                <h2>{JSON.parse(this.state.name)}</h2>
              </center>
            </FullColumn>
            <Row>
              <HalfColumn>
                <Papersheet>
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
                <Papersheet>
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

            {/* 
							<Row>
								<TextField
									label="Username"
									placeholder="Username"
									margin="normal"
									onChange={this.onChangeUsername}
								/>
							</Row>
							<Row>
								<TextField
									label="Email"
									placeholder="Email"
									margin="normal"
									value={JSON.parse(this.state.email)}
									onChange={this.onChangeEmail}
								/>
							</Row>
							*/}

            <FormsComponentWrapper className=" mateFormsComponent "></FormsComponentWrapper>
            <FormsMainWrapper></FormsMainWrapper>
          </Row>
          <Row>
            <FullColumn>
              <Row>
                <h2>Do you want to change your name?</h2>
              </Row>
              <Row>
                <TextField
                  label="New name"
                  placeholder="Please enter your new name"
                  margin="normal"
                  onChange={this.onChangeUsername}
                />
              </Row>
            </FullColumn>
          </Row>
        </LayoutWrapper>
      </Provider>
    );
  }
}

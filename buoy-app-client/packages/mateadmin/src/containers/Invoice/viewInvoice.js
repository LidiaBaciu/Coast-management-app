import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Row, FullColumn } from '../../components/utility/rowColumn.js';
import Button from '../../components/uielements/button';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Papersheet from '../../components/utility/papersheet';
import InvoiceAddress from '../../components/invoice/address';
import InvoicePageWrapper, { PrintIcon } from './singleInvoice.style';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class SingleInvoiceView extends Component {
  state = {
    currentProblem : {},
  };
  componentDidMount(){
    const currentLocation = window.location;
    const id = String(currentLocation).split('/').pop();
    console.log("currentLocation id" + id);
    let webApiUrl = 'http://localhost:8080/api/problem/' + id;
    let tokenStr = JSON.parse(localStorage.getItem('token'));
    axios
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(res => {
        console.log(res.data);
        var data = res.data;
        this.setState({ currentProblem: data });
      });
  }

  handlePrint = () => {
    window.print();
  }

  render() {
    const { toggleView, redirectPath } = this.props;
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <InvoicePageWrapper className="InvoicePageWrapper">
              <div className="PageHeader">
                <Link to={redirectPath}>
                  <Button color="primary">
                    <PrintIcon>call_split</PrintIcon>
                    <span>Go To Problems</span>
                  </Button>
                </Link>
                <Button color="secondary" onClick={() => toggleView(true)}>
                  <PrintIcon>mode_edit</PrintIcon>
                  <span>Edit Problem</span>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mateInvoPrint"
                  onClick={this.handlePrint}
                >
                  <PrintIcon>print</PrintIcon>
                  <span>Print Problem report</span>
                </Button>
              </div>

              <Papersheet>
                <div className="PageContent">
                  <div className="OrderInfo">
                    <div className="LeftSideContent">
                      <h3 className="Title">Problem information</h3>
                      <span className="InvoiceNumber">
                        {this.state.currentProblem.id}
                      </span>
                    </div>
                    <div className="RightSideContent">
                      <p>
                        Problem Status:{' '}
                        <span className="orderStatus">
                          {this.state.currentProblem.solved ? "Solved" : "Unsolved"}
                        </span>
                      </p>
                      <p>
                        Report date:{' '}
                        <span className="orderDate">
                          {moment(this.state.currentProblem.timestamp).format(
                            'MMMM Do YYYY'
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="BillingInformation">
                    <div className="LeftSideContent">
                      <h3 className="Title">Reported by</h3>

                      <InvoiceAddress
                        companyName={this.state.currentProblem.username}
                      />
                    </div>
                    <div className="RightSidclassName=ent">
                      <h3 className="Title">For the buoy</h3>

                      <InvoiceAddress
                        companyName={this.state.currentProblem.buoyId}
                      />
                    </div>
                  </div>

                  <div className="BillingInformation">
                    <div className="CenteredContent">
                      <h3 className="Title">Description</h3>
                      <p>{this.state.currentProblem.description}</p>
                    </div>
                    
                  </div>

                  <div className="ButtonWrapper">
                    <Button
                      variant="contained"
                      color="primary"
                      className="mateInvoPrint"
                    >
                      <span>Share problem</span>
                    </Button>
                  </div>
                </div>
              </Papersheet>
            </InvoicePageWrapper>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SingleInvoiceView);

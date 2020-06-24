import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LayoutWrapper from "../../components/utility/layoutWrapper";
import Papersheet from "../../components/utility/papersheet";
import { FullColumn } from "../../components/utility/rowColumn";
import IntlMessages from "../../components/utility/intlMessages";

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

class BeachDetails extends Component {
  state = {
      loadedBeach: null,
  }

  componentDidMount () {
    console.log(this.props);
    this.loadData();
  } 

  componentDidUpdate() {
    this.loadData();
  }

  loadData () {
    if ( this.props.match.params.id ) {
        let tokenStr = JSON.parse(localStorage.getItem('token'));
        if ( !this.state.loadedBeach || (this.state.loadedBeach && this.state.loadedBeach.id !== +this.props.match.params.id) ) {
            axios.get( 'http://localhost:8080/api/beaches/' + this.props.match.params.id, { headers: { Authorization: `Bearer ${tokenStr}` } }  )
                .then( response => {
                    this.setState( { loadedBeach: response.data } );
                } );
        }
    }
}
  render() {
    let beach = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if ( this.props.match.params.id ) {
        beach = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }
    if ( this.state.loadedBeach ) {
        beach = (
            <LayoutWrapper>
            <FullColumn>
            <Papersheet title={<IntlMessages id="sidebar.blankPage" />}>
                <h1>{this.state.loadedBeach.id}</h1>
                <p>{this.state.loadedBeach.name}</p>
            </Papersheet>
            </FullColumn>
            </LayoutWrapper>
        );
    }
    return beach;
  }
}

export default withStyles(styles, { withTheme: true })(BeachDetails);

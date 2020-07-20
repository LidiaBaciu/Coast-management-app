import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditInvoice from './editInvoice';
import ViewInvoice from './viewInvoice';
import Loader from '../../components/utility/Loader';
import invoiceActions from '../../redux/problem/actions';

class SingleInvoice extends Component {
  componentDidMount() {
    const { initData } = this.props;
    initData();
    this.toggleCreatedInvoice(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.toggleCreatedInvoice(nextProps);
  }
  toggleCreatedInvoice(props) {
    const {
      match,
      initialProblems,
      currentProblem,
      selectCurrentInvoice
    } = props;
    const { invoiceId } = match.params;
    if (initialProblems && currentProblem.id !== invoiceId) {
      selectCurrentInvoice(invoiceId);
    }
  }
  render() {
    const { match, currentProblem, enableEditView } = this.props;
    const redirectPath = "/dashboard/problems";
    if (currentProblem.id !== match.params.invoiceId) {
      return <Loader />;
    } else if (enableEditView) {
      return <EditInvoice {...this.props} redirectPath={redirectPath} />;
    } else {
      return <ViewInvoice {...this.props} redirectPath={redirectPath} />;
    }
  }
}
function mapStateToProps(state) {
  return {
    ...state.Problems
  };
}
export default connect(mapStateToProps, invoiceActions)(SingleInvoice);

import React, { Component } from 'react';
import { loadAccount } from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC } from '../../../store/actions';
import IOU from './IOU';

const mapStateToProps = state => {
  return {
    privkey: state.user.privkey,
    pubkey: state.user.pubkey,
    account: state.user.account,
    trustlines: state.user.trustlines
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAccount: loadAccountAC
}, dispatch);

class IOUManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let rows = []

    if (this.props.account) {
      this.props.account.balances.forEach(asset => {
        if (parseFloat(asset.balance) > 0 && asset.asset_issuer != "native" && asset.asset_code == "STRTMUSD") {
          rows.push(<IOU key={ asset.asset_issuer } balance={ asset.balance } issuer={ asset.asset_issuer }
            loadAccount={ this.props.loadAccount } privkey={ this.props.privkey } pubkey={ this.props.pubkey } />);
        }
      });
    }

    if (this.state.loading) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      );
    }

    return (
      <div className="iou-container">
        <div className="panel-header">
          <h5>
            Payment Manager
          </h5>
        </div>
        <div className="iou-content">
          { (rows.length > 0) ? rows : <div className="no-iou-container"><p>You are not currently owed any money</p></div> }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IOUManager);
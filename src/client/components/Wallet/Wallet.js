import React, { Component } from 'react';
import ControlNavSide from '../Navbar/ControlNavSide';
import ControlNavTop from '../Navbar/ControlNavTop';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import Overview from './Overview';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPrivkey, setPubkey } from '../../../store/actions';
import KeyContainer from './KeyContainer';
import WalletSetup from './WalletSetup';

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    privkey: state.user.privkey,
    pubkey: state.user.pubkey
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPrivkey: setPrivkey,
  setPubkey: setPubkey
}, dispatch);

class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.privkey) {
      return (
        <div>
          <ControlNavTop loggedIn={ this.props.loggedIn } />
          <ControlNavSide loggedIn={ this.props.loggedIn } />
          <WalletSetup>
            <Switch>
              <Route path="/wallet" exact={ true } component={ Overview } />
            </Switch>
          </WalletSetup>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar fixed={ true } />
          <KeyContainer setPrivkey={ this.props.setPrivkey } setPubkey={ this.props.setPubkey } />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

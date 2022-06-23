import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAction } from '../actions';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

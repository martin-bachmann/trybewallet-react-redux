import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAction } from '../actions';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { email, expenses } = this.props;
    const expenseTotal = expenses.reduce((acc, e) => Number(e.value) + acc, 0);
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ expenseTotal }</p>
        <p data-testid="header-currency-field">BRL</p>
        <ExpenseForm />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

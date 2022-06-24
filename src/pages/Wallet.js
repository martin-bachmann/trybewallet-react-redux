import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAction } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  numberConverter = (num) => Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  render() {
    const { email, expenses } = this.props;
    const expenseTotal = this.numberConverter(expenses.reduce((acc, e) => Number(this
      .numberConverter(e.value * e.exchangeRates[e.currency].ask)) + acc, 0));
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ expenseTotal }</p>
        <p data-testid="header-currency-field">BRL</p>
        <ExpenseForm />
        <ExpensesTable />
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

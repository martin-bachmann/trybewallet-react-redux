import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAction } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import './wallet.css';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  numberConverter = (num) => Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  render() {
    const { email, expenses } = this.props;
    const expenseTotal = this.numberConverter(expenses.reduce(
      (acc, e) => Number(e.value * e.exchangeRates[e.currency].ask) + acc, 0,
    ));
    return (
      <div className="body">
        <header className="header">
          <div className="wallet-title">
            <h1>TrybeWallet</h1>
            <img src="wallet_image.png" alt="Wallet logo" className="logo" />
          </div>
          <div className="info-container">
            <p className="info-text">
              {'Email: '}
              <span data-testid="email-field">{ email }</span>
            </p>
            <p className="info-text">
              {'Despesa Total: '}
              <span data-testid="total-field">{ expenseTotal }</span>
            </p>
            <p className="info-text" data-testid="header-currency-field">BRL</p>
          </div>
          <ExpenseForm />
        </header>
        <main>
          <ExpensesTable />
        </main>
      </div>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenseAction } from '../actions';

export class ExpenseForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClick = () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, saveExpense } = this.props;
    const expenseObj = { id: expenses.length, value, currency, method, tag, description };
    saveExpense(expenseObj);
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <fieldset>
        <label htmlFor="value">
          { 'Valor: '}
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ this.onChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          { 'Descrição: '}
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.onChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          { 'Moeda: '}
          <select
            name="currency"
            data-testid="currencies-input"
            onChange={ this.onChange }
            value={ currency }
            aria-label="moeda"
          >
            { currencies.map((c) => (<option value={ c } key={ c }>{c}</option>)) }
          </select>
        </label>
        <label htmlFor="method">
          { 'Método de pagamento: '}
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.onChange }
            value={ method }
          >
            <option value=""> </option>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          { 'Categoria: '}
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.onChange }
            value={ tag }
          >
            <option value=""> </option>
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.onClick }>
          Adicionar despesa
        </button>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expenseObj) => dispatch(saveExpenseAction(expenseObj)),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
            { currencies.map((c, i) => (<option value={ c } key={ i }>{c}</option>)) }
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
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(ExpenseForm);

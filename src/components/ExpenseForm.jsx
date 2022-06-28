import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { endEditExpenseAction, saveExpenseAction } from '../actions';

const ALIMENTACAO = 'Alimentação';

export class ExpenseForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: ALIMENTACAO,
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickNewExpense = () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, saveExpense } = this.props;
    const expenseObj = { id: expenses.length, value, currency, method, tag, description };
    saveExpense(expenseObj);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
  }

 onClickEditExpense = () => {
   const { value, description, currency, method, tag } = this.state;
   const { idToEdit, endEditExpense, expenses } = this.props;
   const expenseObj = { id: idToEdit, value, currency, method, tag, description };
   const filteredExpenses = expenses.map((e) => (e.id === idToEdit
     ? { ...expenseObj, exchangeRates: e.exchangeRates } : e));
   endEditExpense(filteredExpenses);
   this.setState({
     value: '',
     description: '',
     currency: 'USD',
     method: 'Dinheiro',
     tag: ALIMENTACAO,
   });
 }

 render() {
   const { currencies, editor } = this.props;
   const { value, description, currency, method, tag } = this.state;
   return (
     <fieldset className="form-container">
       <label htmlFor="value">
         { 'Valor: '}
         <input
           className="wallet-input"
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
           className="wallet-input"
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
           className="wallet-input"
           name="currency"
           data-testid="currencies-input"
           onChange={ this.onChange }
           value={ currency }
           aria-label="moeda"
         >
           { currencies.map((c) => (
             <option value={ c } key={ c } id="currency">{c}</option>
           )) }
         </select>
       </label>
       <label htmlFor="method">
         { 'Método de pagamento: '}
         <select
           className="wallet-input"
           name="method"
           data-testid="method-input"
           onChange={ this.onChange }
           value={ method }
         >
           <option id="method">Dinheiro</option>
           <option id="method">Cartão de crédito</option>
           <option id="method">Cartão de débito</option>
         </select>
       </label>
       <label htmlFor="tag">
         { 'Categoria: '}
         <select
           className="wallet-input"
           name="tag"
           data-testid="tag-input"
           onChange={ this.onChange }
           value={ tag }
         >
           <option id="tag">Alimentação</option>
           <option id="tag">Lazer</option>
           <option id="tag">Trabalho</option>
           <option id="tag">Transporte</option>
           <option id="tag">Saúde</option>
         </select>
       </label>
       {
         editor
           ? (
             <button
               className="form-button"
               type="button"
               onClick={ this.onClickEditExpense }
             >
               Editar despesa
             </button>
           )
           : (
             <button
               className="form-button"
               type="button"
               onClick={ this.onClickNewExpense }
             >
               Adicionar despesa
             </button>
           )
       }
     </fieldset>
   );
 }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  endEditExpense: (expenses) => dispatch(endEditExpenseAction(expenses)),
  saveExpense: (expenseObj) => dispatch(saveExpenseAction(expenseObj)),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  endEditExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpense: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

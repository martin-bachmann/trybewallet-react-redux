import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenseAction, removeExpenseAction } from '../actions';

export class ExpensesTable extends Component {
  numberConverter = (num) => Number(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

  onClickDelete = (id) => {
    const { expenses, removeExpense } = this.props;
    const rmExpenses = expenses.filter((e) => e.id !== id);
    removeExpense(rmExpenses);
  };

  onClickEdit = (id) => {
    const { editExpense } = this.props;
    editExpense(id);
  };

  render() {
    const { editor, expenses } = this.props;
    return (
      <table className="table-container">
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {expenses.map((e) => (
          <tr key={ e.id }>
            <td>{e.description}</td>
            <td>{e.tag}</td>
            <td>{e.method}</td>
            <td>{this.numberConverter(e.value)}</td>
            <td>{e.exchangeRates[e.currency].name.split('/')[0]}</td>
            <td>{this.numberConverter(e.exchangeRates[e.currency].ask)}</td>
            <td>
              {this.numberConverter(e.value * e.exchangeRates[e.currency].ask)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                className="table-button"
                disabled={ editor }
                onClick={ () => this.onClickEdit(e.id) }
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                className="table-button"
                onClick={ () => this.onClickDelete(e.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (filteredExpenses) => dispatch(removeExpenseAction(filteredExpenses)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

ExpensesTable.propTypes = {
  editExpense: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

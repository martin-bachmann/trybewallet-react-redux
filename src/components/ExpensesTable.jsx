import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseAction } from '../actions';

export class ExpensesTable extends Component {
  numberConverter = (num) => Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  onClickDelete = (id) => {
    const { expenses, removeExpense } = this.props;
    const rmExpenses = expenses.filter((e) => e.id !== id);
    removeExpense(rmExpenses);
  }

  onClickEdit = (id) => {
    // const { editExpense } = this.props;
    editExpense(id);
    // criar action para alterar
    // alterar reducer
    // alterar forms para função editar
    // criar action terminar edição
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
        { expenses.map((e) => (
          <tr key={ e.id }>
            <td>{e.description}</td>
            <td>{e.tag}</td>
            <td>{e.method}</td>
            <td>{this.numberConverter(e.value) }</td>
            <td>{e.exchangeRates[e.currency].name.split('/')[0]}</td>
            <td>
              {this.numberConverter(e.exchangeRates[e.currency].ask)}
            </td>
            <td>
              {this.numberConverter(e.value * e.exchangeRates[e.currency].ask)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.onClickDelete(e.id) }
              >
                Excluir
              </button>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.onClickEdit(e.id) }
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (filteredExpenses) => dispatch(removeExpenseAction(filteredExpenses)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

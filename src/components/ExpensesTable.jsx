import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class ExpensesTable extends Component {
  numberConverter = (num) => Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

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
          <tr key={ e }>
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
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(ExpensesTable);

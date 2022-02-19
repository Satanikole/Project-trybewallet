/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { deleteExpense } from '../actions';
import './ExpenseTable.css';

class ExpenseTable extends React.Component {
  render() {
    const { expenses, delButton } = this.props;
    return (
      <div className="expense-table">
        <TableContainer component={ Paper }>
          <Table sx={ { minWidth: 650 } } size="small" aria-label="a dense table">
            <TableHead>
              <TableRow
                className="table-head"
              >
                <TableCell>Description</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>Payment method</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Exchange rate</TableCell>
                <TableCell>Exchanged value</TableCell>
                <TableCell>Conversion currency</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses ? expenses.map((bill) => {
                const { value, description, currency, method, tag, exchangeRates } = bill;
                const price = Number(exchangeRates[currency].ask).toFixed(2);
                const expenseValue = Number(value).toFixed(2);
                const priceValue = (expenseValue * exchangeRates[currency].ask).toFixed(2);
                const currencyName = exchangeRates[currency].name.split('/');
                return (
                  <TableRow
                    key={ bill.id }
                    className="table-body"
                  >
                    <TableCell align="center">{description}</TableCell>
                    <TableCell align="center">{tag}</TableCell>
                    <TableCell align="center">{method}</TableCell>
                    <TableCell align="center">{expenseValue}</TableCell>
                    <TableCell align="center">{currencyName[0]}</TableCell>
                    <TableCell align="center">{price}</TableCell>
                    <TableCell align="center">{priceValue}</TableCell>
                    <TableCell align="center">Real</TableCell>
                    <TableCell>
                      <Button
                        data-testid="delete-btn"
                        type="button"
                        color="secondary"
                        onClick={ () => delButton(bill) }
                      >
                        <img src="https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/000000/external-trash-can-layout-for-a-indication-to-throw-trash-mall-green-tal-revivo.png" alt="trash can" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }) : 'nothing happens feijoada'}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  delButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delButton: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

// link da documentação da tabela https://www.w3schools.com/html/html_tables.asp
// Link da documentação do método split https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split
// Coloquei um tbody porque os testes estão torrando o saco https://github.com/facebook/react/issues/5652

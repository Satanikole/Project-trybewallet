/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const expenseSum = expenses ? expenses.reduce((acumulator, expense) => {
      const price = Number(expense.exchangeRates[expense.currency].ask);
      const priceValue = (Number(expense.value) * price).toFixed(2);
      return acumulator + Number(priceValue);
    }, 0) : '';
    return (
      <Box>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography style={ { marginRight: 10 } }>T r y b e W a l l e t</Typography>
            <Icon icon="et:wallet" color="#132a13" width="40" height="50" hFlip className="icon" style={ { marginRight: 40 } } />
            <Typography
              style={ { marginRight: 30 } }
              data-testid="email-field"
            >
              {email}

            </Typography>
            <Typography
              style={ { marginRight: 30 } }
              data-testid="total-field"
            >
              Total expenses:
              {' '}
              {expenseSum}

            </Typography>
            <Typography
              style={ { marginRight: 30 } }
              data-testid="header-currency-field"
            >
              Currency: BRL

            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

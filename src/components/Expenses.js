/* eslint-disable max-lines */
import React from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import './Expenses.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchedCoins } from '../actions/index';
import fetchApi from '../services/api';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: '',
      id: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.initialState = this.initialState.bind(this);
    this.getCurrencyState = this.getCurrencyState.bind(this);
  }

  async componentDidMount() {
    const coins = await fetchApi();
    this.getCurrencyState(coins);
  }

  getCurrencyState(coins) {
    this.setState({
      exchangeRates: Object.values(coins),
    });
  }

  initialState() {
    this.setState((state) => ({
      id: state.id + 1,
      value: '',
      description: '',
    }));
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { getInputValues } = this.props;
    const {
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates,
      id,
    } = this.state;
    return (
      <form
        className="expense-form"
        onSubmit={ (e) => {
          e.preventDefault();
        } }
      >
        <TextField
          color="primary"
          data-testid="value-input"
          type="number"
          name="value"
          label="Expense value"
          value={ value }
          onChange={ this.handleInputChange }
          id="value"

        />
        <TextField
          color="primary"
          data-testid="description-input"
          type="text"
          name="description"
          label="Expense description"
          margin="normal"
          value={ description }
          onChange={ this.handleInputChange }

        />

        <FormControl>
          <InputLabel
            id="autowidth-label"
            data-testid="method-input"
          >
            Currency
          </InputLabel>
          <Select
            color="primary"
            label="Currency"
            labelId="autowidth-label"
            id="autowidth"
            name="currency"
            value={ currency }
            onChange={ this.handleInputChange }
            data-testid="currency-input"
          >
            { exchangeRates ? exchangeRates.map((coin, index) => {
              if (coin.codein === 'BRLT' || coin.code === 'USDT') { // codein é o atributo do real brasileiro na api, ja que o code é estrangeiro
                return '';
              }
              return (
                <MenuItem
                  key={ index }
                  value={ coin.code }
                >
                  {coin.code}
                </MenuItem>
              );
            }) : ''}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel
            id="simple-select-autowidth-label"

          >
            Methood
          </InputLabel>
          <Select
            color="primary"
            value={ method }
            name="method"
            label="Currency"
            labelId="simple-select-autowidth-label"
            id="simple-select-autowidth"
            data-testid="method-input"
            onChange={ this.handleInputChange }
          >
            <MenuItem
              value="money"
              name="money"
            >
              Money

            </MenuItem>
            <MenuItem
              value="credit"
              name="credit"
            >
              Credit Card

            </MenuItem>
            <MenuItem
              value="debit"
              name="debit"
            >
              Debit Card
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel
            id="select-autowidth-label"
          >
            Tag
          </InputLabel>
          <Select
            color="primary"
            label="Tag"
            value={ tag }
            name="tag"
            labelId="select-autowidth-label"
            id="select-autowidth"
            data-test-id="tag-input"
            onChange={ this.handleInputChange }
          >
            <MenuItem
              value="food"
              name="food"
            >
              Food
            </MenuItem>
            <MenuItem
              value="leisure"
              name="leisure"
            >
              Leisure
            </MenuItem>
            <MenuItem
              value="work"
              name="work"
            >
              Work
            </MenuItem>
            <MenuItem
              value="transportation"
              name="transportation"
            >
              Transportation
            </MenuItem>
            <MenuItem
              value="health"
              name="health"
            >
              Health
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          className="submit-button"
          style={ { marginTop: 20 } }
          onClick={ () => {
            getInputValues({
              id,
              value,
              description,
              currency,
              tag,
              method,
            });
            this.initialState();
          } }
        >
          Adicionar despesa
        </Button>
      </form>
    );
  }
}

Expenses.propTypes = {
  getInputValues: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getInputValues: (currencies) => dispatch(fetchedCoins(currencies)),
});

export default connect(null, mapDispatchToProps)(Expenses);

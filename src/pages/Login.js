/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { Icon } from '@iconify/react';
import { getLogin } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleValidation(email, password) {
    const SIX = 6;
    const passwordValidation = password.length >= SIX;
    const emailValidation = email.includes('@') && email.includes('.com');
    const validation = passwordValidation && emailValidation;
    return validation;
  }

  render() {
    const { email, password } = this.state;
    const { loginEmail, history } = this.props;
    return (
      <main className="loginComponent">
        <h1 id="title">T r y b e W a l l e t</h1>
        <Icon icon="et:wallet" color="#ffffff" width="50" height="50" hFlip className="icon" />
        <form
          className="loginForm"
          onSubmit={ (e) => {
            e.preventDefault();
          } }
        >
          <div className="inputsDiv">
            <TextField
              name="email"
              data-testid="email-input"
              label="email"
              type="email"
              value={ email }
              onChange={ this.handleInputChange }
              required
              margin="normal"
              className="inputs"
              id="email"
              color="primary"
            />
            <TextField
              name="password"
              data-testid="password-input"
              label="password"
              type="password"
              value={ password }
              onChange={ this.handleInputChange }
              required
              margin="normal"
              className="inputs"
              color="primary"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button"
              disabled={ !this.handleValidation(email, password) }
              onClick={ () => {
                loginEmail(email);
                history.push('/carteira');
              } }
            >
              Login

            </Button>
          </div>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  loginEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (email) => dispatch(getLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);

// Estava tendo um problema para fazer o redux funcionar corretamente e a colega Kaylane Silva me ajudou.

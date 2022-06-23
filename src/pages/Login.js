import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClick = () => {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  isDisabled = () => {
    const { email, password } = this.state;
    const MIN_LENGTH = 5;
    const MAIL_FORMAT = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return !(password.length > MIN_LENGTH && MAIL_FORMAT.test(email));
  }

  render() {
    const { email, password } = this.state;
    return (
      <fieldset>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.onChange }
            data-testid="email-input"
            placeholder="e-mail"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.onChange }
            data-testid="password-input"
            placeholder="password"
          />
        </label>
        <button type="button" onClick={ this.onClick } disabled={ this.isDisabled() }>
          Entrar
        </button>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,

};

export default connect(null, mapDispatchToProps)(Login);

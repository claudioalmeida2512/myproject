import React, { Component } from 'react';
import api from '../../base/api';
import { getToken, login, logout } from '../../base/auth';
import { Redirect } from 'react-router-dom';

class FormLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      errorMessage: null,
      style: "",
      isLogado: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      style: "",
      errorMessage: null,
    })
  }

  signIn = async () => {
    try {
      const response = await api.post('/auth/authenticate', {
        email: this.state.email,
        senha: this.state.senha
      });
      const { user, token } = response.data;
      login(response);
      this.setState({
        isLogado: true,
      }

      );

    } catch (response) {
      logout();
      this.setState({
        errorMessage: response.data.message,
        style: "alert alert-danger",
      });

    }



  };

  render() {
    if (this.state.isLogado) {
      return (
       
          <Redirect to={{ pathname: '/docs' }} />
       
      );
    } else {
      return (
        <div className="conteudoPrincipal">
          <div className="container col-4">
            <h1>Login</h1>

            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input className="form-control" type="text" id="email" name="email" value={this.email} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input className="form-control" type="password" id="senha" name="senha" value={this.senha} onChange={this.handleChange} className="form-control" />
              <br></br>
              <div className="col-8">
                <button className="btn btn-block btn-primary" onClick={this.signIn} >Logar</button>
                <br></br>
              </div>
              <div className={this.state.style}>
                {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
              </div>
            </div>

          </div>
        </div>
      );

    }

  }
}

export default FormLogin;


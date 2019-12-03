import React, { Component } from 'react';

class FormLogin extends Component {
  render() {
    return (
      <div class="conteudoPrincipal">
        <div class="container col-4">
          <h1>Login</h1>

            <div class="form-group">
              <label for="email">E-mail:</label>
              <input type="text" id="email" name="email" class="form-control" />
            </div>
            <div class="form-group">
              <label for="senha">Senha:</label>
              <input type="password" id="senha" name="senha" class="form-control" />
              <br></br>
              <div class="col-8">
              <button class="btn btn-block btn-primary">Sign</button>
              </div>
            </div>
      
        </div>
      </div>
    );
  }
}

export default FormLogin;


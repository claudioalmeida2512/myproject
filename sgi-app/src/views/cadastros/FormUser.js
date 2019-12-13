import React, { Component } from 'react';
import api from '../../base/api';
import Select from 'react-select/creatable'


export default class FormUser extends Component {
    constructor(props) {
        super(props);
        this.inicialState = {
            username: "",
            email: "",
            pass: "",
            status: "",
            listaFuncoes: [],
            listaDeparts: [],
            style: "",
            errorMessage: null,
        };
        this.state = this.inicialState;
        this.usernameInput = React.createRef();
        this.emailInput = React.createRef();
        this.senhaInput = React.createRef();
        this.depInput = React.createRef();
        this.funcInput = React.createRef();
      
    }

    getFuncoes = async () => {
        try {
            const response = await api.get('/list/funcao');
            let itens = [];
            response.data.map((item) => {
                let funcao = {
                    value: item.idfuncao,
                    label: item.func_desc
                }
                itens.push(funcao);
            });
            this.setState({
                listaFuncoes: itens,
            });
        }
        catch (response) {
            this.setState({
                listaFuncoes: [],
            });
        }
    };

    getDeparts = async () => {
        try {
            const response = await api.get('/list/depart');
            let itens = [];
            response.data.map((item) => {
                let depart = {
                    value: item.iddepart,
                    label: item.dept_desc
                }
                itens.push(depart);
            });
            this.setState({
                listaDeparts: itens,
            });
        }
        catch (response) {
            this.setState({
                listaDeparts: [],
            });
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            style: "",
            errorMessage: null,
        })
    }

    setUser = async () => {
        try {
            const response = await api.post('/create/users', {
                username: this.state.username,
                email: this.state.email,
                pass: this.state.pass,
                user_dep: this.state.user_dep,
                user_funcao: this.state.user_funcao,

            });
            this.setState(this.inicialState);
            this.setState({
                style: "alert alert-success",
                errorMessage: "Cadastro de Usuario efutuado com Sucesso !!",
            });
            this.props.getUsers();
            this.getFuncoes();
            this.getDeparts();
            this.usernameInput.current.focus();
        }
        catch (response) {
            this.setState({
                style: "alert alert-danger",
                errorMessage: "Não foi possivel cadastrar o Usuario !!",
            });
        }
    };

    handleSelectDptChange = (newValue: any, actionMeta: any) => {
        this.setState({
            user_dep: newValue.value,
        });
        this.funcInput.current.focus();
    };

    handleSelectFuncaoChange = (newValue: any, actionMeta: any) => {
        this.setState({
            user_funcao: newValue.value,
        });
        this.senhaInput.current.focus();  
    };

    handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    componentDidMount() {
        this.getFuncoes();
        this.getDeparts();
        this.usernameInput.current.focus();
    }

    _handleKeyDown = (e) => {
        const { name, value } = e.target;
        if (e.key === 'Enter' ) {
          if (name.match(/username/)){
           this.emailInput.current.focus();
          }
          if (name.match(/email/)){
            this.depInput.current.focus();
          }
                   
        }
      }

    render() {
        return (
            <div className='container col-12'>
                <h3>Novo Usuario</h3>
                <div class={this.state.style} role="alert">
                    {this.state.errorMessage}
                </div>
                <div className="row">
                    <div className="form-group col-md-5"  >
                        <label htmlFor="username">Usuario</label>
                        <input 
                        className="form-control" 
                        type="text" id="username" 
                        name="username" 
                        value={this.state.username} 
                        placeholder="Enter userName"
                        onChange={this.handleChange} 
                        ref={this.usernameInput}
                        onKeyDown={this._handleKeyDown}
                        />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="email">email</label>
                        <input 
                        className="form-control" 
                        type="text" 
                        id="email" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.handleChange}
                        ref= {this.emailInput}
                        onKeyDown={this._handleKeyDown}
                         />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-5"  >
                        <label htmlFor="sel_dept">Departamento</label>
                        <Select
                            isClearable
                            onChange={this.handleSelectDptChange}
                            onInputChange={this.handleInputChange}
                            options={this.state.listaDeparts} 
                            ref={this.depInput} 
                         />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="sel_func">Função</label>
                        <Select
                            isClearable
                            onChange={this.handleSelectFuncaoChange}
                            onInputChange={this.handleInputChange}
                            options={this.state.listaFuncoes}
                            ref={this.funcInput}  />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-5"  >
                        <label htmlFor="pass">Senha</label>
                        <input className="form-control" type="password" id="pass" 
                        name="pass" value={this.state.pass} onChange={this.handleChange}
                        ref={this.senhaInput}  
                      />
                    </div>
                    <div className="form-group col-md-2"  >
                        <label></label>
                        <button id="bt1" name="bt1" className="btn btn-block btn-primary" 
                        onClick={this.setUser} 
                        disabled={!this.state.username} 
                      >Incluir</button>
                    </div>
                </div>
            </div>

        );
    }
}
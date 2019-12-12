import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { height } from '@material-ui/system';
import api from '../../base/api';
import Select from 'react-select/creatable'

export default class FormFuncao extends Component {
    constructor(props) {
        super(props);
        this.inicialState = {
            idfuncao: "",
            func_desc: "",
            func_cargo: "",
            func_desc_cargo: "",
            func_sup: "",
            listaFuncoes: [],
            listaCargos: [],
            style: "",
            errorMessage: null,
        };
        this.state = this.inicialState;
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

    getCargos = async () => {
        try {
            const response = await api.get('/list/cargo');
            let itens = [];
            response.data.map((item) => {
                let cargo= {
                    value: item.idcargo,
                    label: item.cargo_desc
                }
                itens.push(cargo);
            });
            this.setState({
                listaCargos: itens,
            });
        }
        catch (response) {
            this.setState({
                listaCargos: [],
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

    setFuncao = async () => {
        try {
            const response = await api.post('/generic/funcao', {
                idfuncao: this.state.idfuncao,
                func_desc: this.state.func_desc,
                func_cargo: this.state.func_cargo,
                func_desc_cargo: this.state.func_desc_cargo,
                func_sup: this.state.func_sup,
            });
            this.setState(this.inicialState);
            this.setState({
                style: "alert alert-success",
                errorMessage: "Cadastro de Funcao efutuado com Sucesso !!",
            });
            this.props.getFuncoes();

        }
        catch (response) {
            this.setState({
                style: "alert alert-danger",
                errorMessage: "Não foi possivel cadastrar a Funcao !!",
            });
        }
    };


    handleSelect1Change = (newValue: any, actionMeta: any) => {
        this.setState({
            func_sup: newValue.value,
        });

    };

    handleSelect2Change = (newValue: any, actionMeta: any) => {
        this.setState({
            func_cargo: newValue.value,
        });

    };

    handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    componentDidMount() {
        this.getFuncoes();
        this.getCargos();
    }

    render() {
        return (
            <div className='container col-12'>
                <h3>Nova  Funcao</h3>
                <div class={this.state.style} role="alert">
                    {this.state.errorMessage}
                </div>
                <div className="row">
                    <div className="form-group col-md-1"  >
                        <label htmlFor="idfuncao">Codigo</label>
                        <NumberFormat format="###" mask="_" className="form-control" type="text" id="idfuncao" name="idfuncao" value={this.state.idfuncao} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="func_desc">Descrição</label>
                        <input className="form-control" type="text" id="func_desc" name="func_desc" value={this.state.func_desc} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-4"  >
                        <label htmlFor="sel_func_sup">Função Superior</label>
                        <Select
                            isClearable
                            onChange={this.handleSelect1Change}
                            onInputChange={this.handleInputChange}
                            options={this.state.listaFuncoes} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-4"  >
                        <label htmlFor="sel_func_cargo">Cargo</label>
                        <Select
                            isClearable
                            onChange={this.handleSelect2Change}
                            onInputChange={this.handleInputChange}
                            options={this.state.listaCargos} />
                    </div>
                    <div className="form-group col-md-2"  >
                        <label></label>
                        <button className="btn btn-block btn-primary" onClick={this.setFuncao} disabled={!this.state.idfuncao || !this.state.func_desc} >Incluir</button>
                    </div>
                </div>
            </div>

        );
    }
}
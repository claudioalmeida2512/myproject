import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { height } from '@material-ui/system';
import api from '../../base/api';

export default class FormFuncao extends Component{
    constructor(props) {
        super(props);
        this.inicialState = {
            idfuncao: "",
            func_desc: "",
            func_cargo: "",
            func_desc_cargo: "",
            func_sup: "",
            style: "",
            errorMessage: null,
        };
        this.state = this.inicialState ;
    }

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
            this.setState(this.inicialState) ;
            this.setState({
                style: "alert alert-success",
                errorMessage: "Cadastro de Funcao Efutuado com Sucesso !!",
            });
            this.props.getFuncoes() ;

        }
        catch (response) {
            this.setState({
                style: "alert alert-danger",
                errorMessage: "Não foi possivel cadastrar a Funcao !!",
            });
        }
    };



    render(){
        return(
            
        );
    }
}
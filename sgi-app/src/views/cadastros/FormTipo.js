import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { height } from '@material-ui/system';
import api from '../../base/api';

export default class FormTipo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cod_tipo: "",
            desc_tipo: "",
            obs_tipo: "",
            style: "",
            errorMessage: null,
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

    setTipo = async () => {
        try {
            const response = await api.post('/generic/tpdoc', {
                cod_tipo: this.state.cod_tipo,
                desc_tipo: this.state.desc_tipo,
                obs_tipo: this.state.obs_tipo,

            });
            this.setState({
                cod_tipo: "",
                desc_tipo: "",
                obs_tipo: "",
                style: "alert alert-success",
                errorMessage: "Cadastro de Tipo Efutuado com Sucesso !!",
            });
            this.props.getTipos() ;

        }
        catch (response) {
            this.setState({
                style: "alert alert-danger",
                errorMessage: "Não foi possivel cadastrar o Tipo !!",
            });
        }
    };

    render() {
        return (
            <div className={this.state.colsList}>
                <h3>Novo Documento</h3>
                <div class={this.state.style} role="alert">
                        {this.state.errorMessage}
                    </div>
                <div className="row">
                    <div className="form-group col-md-1"  >
                        <label htmlFor="cod_tipo">Tipo</label>
                        <input className="form-control" type="text"  id="cod_tipo" name="cod_tipo" value={this.state.cod_tipo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="desc_tipo">Descrição</label>
                        <input className="form-control" type="text" id="desc_tipo" name="desc_tipo" value={this.state.desc_tipo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="obs_tipo">Observação</label>
                        <textarea style={{ height: "120px" }} className="form-control" id="obs_tipo" name="obs_tipo" value={this.state.obs_tipo} onChange={this.handleChange} ></textarea>
                    </div>
                </div> 
                <div className="form-group col-md-2"  >
                    <label></label>
                    <button className="btn btn-block btn-primary" onClick={this.setTipo} disabled={!this.state.cod_tipo || !this.state.desc_tipo   } >Incluir</button>
                  
                </div>


            </div>
        );


    }

}
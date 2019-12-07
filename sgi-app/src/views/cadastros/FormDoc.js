import React, { Component } from 'react';
import api from '../../base/api';
import NumberFormat from 'react-number-format';
import { USER_LOGADO, ID_LOGADO }from '../../base/auth';

export default class FormDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colsList: 'container col-12',
            iddodumento: "",
            doc_tipo: "",
            doc_titulo: "",
            doc_emissao: "",
            doc_final: "",
            doc_rev: 1,
            doc_user: "",
            doc_aprov: "",
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


    render() {

        return (
            <div className={this.state.colsList}>
                <h3>Novo Documento</h3>
                <div className="row">
                    <div className="form-group col-md-1"  >
                        <label htmlFor="iddocumento">Cod.</label>
                        <NumberFormat format="######" mask="_" className="form-control" type="text" id="iddocumento" name="iddocumento" value={this.iddodumento} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-1"  >
                        <label htmlFor="doc_tipo">Tipo</label>
                        <input className="form-control" type="text" id="doc_tipo" name="doc_tipo" value={this.doc_tipo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-6"  >
                        <label htmlFor="doc_titulo">Titulo</label>
                        <input className="form-control" type="text" id="doc_titulo" name="doc_titulo" value={this.doc_titulo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-1"  >
                        <label htmlFor="doc_rev">Revisao</label>
                        <input className="form-control" type="number" id="doc_rev" name="doc_rev" value={this.doc_rev} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-2"  >
                        <label htmlFor="doc_emissao">Emissao</label>
                        <input className="form-control" type="date" id="doc_emissao" name="doc_emissao" value={this.doc_emissao} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2"  >
                        <label htmlFor="doc_final">Emissao</label>
                        <input className="form-control" type="date" id="doc_final" name="doc_final" value={this.doc_final} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-4"  >
                        <label htmlFor="doc_user">Usuario</label>
                        <input className="form-control" type="text" id="doc_user" name="doc_user" value={localStorage.getItem(USER_LOGADO)} onChange={this.handleChange} disabled="disabled"  />
                    </div>
                    <div className="form-group col-md-4"  >
                         <label htmlFor="doc_user"></label>
                        <button className="btn btn-block btn-primary"  >Incluir</button>
                    </div>
                </div>
            </div>
        );
    }
}
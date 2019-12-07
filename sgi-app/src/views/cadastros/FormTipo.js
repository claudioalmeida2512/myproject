import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { height } from '@material-ui/system';

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

    render() {
        return (
            <div className={this.state.colsList}>
                <h3>Novo Documento</h3>
                <div className="row">
                    <div className="form-group col-md-1"  >
                        <label htmlFor="cod_tipo">Codido</label>
                        <NumberFormat format="###" mask="_" className="form-control" type="text" id="cod_tipo" name="cod_tipo" value={this.state.cod_tipo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-1"  >
                        <label htmlFor="desc_tipo">Tipo</label>
                        <input className="form-control" type="text" id="desc_tipo" name="desc_tipo" value={this.state.desc_tipo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="obs_tipo">Descrição</label>
                        <input className="form-control" type="text" id="obs_tipo" name="obs_tipo" value={this.doc_titulo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="obs_tipo">Observação</label>
                        <textarea style={{height: "120px"}} className="form-control" id="obs_tipo" name="obs_tipo" value={this.doc_titulo} onChange={this.handleChange} ></textarea>
                    </div>
                </div>
                <div className="form-group col-md-4"  >
                    <label></label>
                    <button className="btn btn-block btn-primary"  >Incluir</button>
                </div>
            </div>
        );


    }

}
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import api from '../../base/api';

export default class FormCargo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idcargo: "",
            cargo_desc: "",
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

    setCargo = async () => {
        try {
            const response = await api.post('/generic/cargo', {
                idcargo: this.state.idcargo,
                cargo_desc: this.state.cargo_desc,
            });
            this.setState({
                idcargo: "",
                cargo_desc: "",
                style: "alert alert-success",
                errorMessage: "Cadastro de Cargo efetuado com Sucesso !!",
            });
            this.props.getCargos();

        }
        catch (response) {
            this.setState({
                style: "alert alert-danger",
                errorMessage: "Não foi possivel cadastrar o Cargo !!",
            });
        }
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const node = e.target.form ;   //TRAZ UM ARRAY DO form 
            const index = Array.prototype.indexOf.call(node, e.target);
            node.elements[index + 1].focus();
            e.preventDefault();
        }
    }

    render() {
        return (
            <form>
                <h3>Novo Cargo</h3>
                <div class={this.state.style} role="alert">
                    {this.state.errorMessage}
                </div>
                <div className="row">
                    <div className="form-group col-md-1"  >
                        <label htmlFor="idcargo">Cargo</label>
                        <NumberFormat format="###" mask="_" className="form-control"
                         type="text" id="idcargo" name="idcargo" value={this.state.idcargo} 
                         onChange={this.handleChange} 
                         onKeyDown={this._handleKeyDown} />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="cargo_desc">Descrição</label>
                        <input className="form-control" type="text" id="cargo_desc"
                         name="cargo_desc" value={this.state.cargo_desc}
                          onChange={this.handleChange} 
                          onKeyDown={this._handleKeyDown} />
                    </div>
                </div>
                <div className="form-group col-md-2"  >
                    <label></label>
                    <button className="btn btn-block btn-primary" onClick={this.setCargo} disabled={!this.state.idcargo || !this.state.cargo_desc} >Incluir</button>
                </div>
            </form>

        );
    }
}
import React, { Component } from 'react';
import api from '../../base/api';
import NumberFormat from 'react-number-format';
import { USER_LOGADO, ID_LOGADO } from '../../base/auth';
import Select from 'react-select/creatable'

export default class FormDoc extends Component {
    constructor(props) {
        super(props);
        this.inicialState = {
            colsList: 'container col-12',
            iddocumento: "",
            doc_tipo: "",
            doc_titulo: "",
            doc_emissao: "",
            doc_final: "",
            doc_rev: 1,
            doc_user: "",
            doc_aprov: "",
            doc_obs: "",
            style: "",
            listaTipo: [],
            errorMessage: null,
        };
        this.state = this.inicialState;
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            style: "",
            errorMessage: null,
        })
    }

    handleSelectChange = (newValue: any, actionMeta: any) => {
        this.setState({
            doc_tipo: newValue.value,
        });

    };

    handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };


    getTipos = async () => {
        try {
            const response = await api.get('/list/tpdoc');
            let itens = [];
            response.data.map((item) => {
                let tipo = {
                    value: item.cod_tipo,
                    label: item.cod_tipo
                }
                itens.push(tipo);
            });
            this.setState({
                listaTipo: itens,
            });

        }
        catch (response) {
            this.setState({
                listDocs: [],
            });
        }
    };


    //incluir documento 
    setDoc = async () => {
        let idLogado = parseInt(localStorage.getItem(ID_LOGADO));
        try {
            const response = await api.post('/generic/documento', {
                iddocumento: this.state.iddocumento,
                doc_tipo: this.state.doc_tipo,
                doc_rev: this.state.doc_rev,
                doc_emissao: this.state.doc_emissao,
                doc_titulo: this.state.doc_titulo,
                doc_obs: this.state.doc_obs,
                doc_final: this.state.doc_final,
                doc_status: 0,
                doc_user: idLogado,
                doc_aprov: 0,

            });
            this.setState(this.inicialState);
            this.setState({
                style: "alert alert-success",
                errorMessage: "Cadastrado de Documento Efutuado com Sucesso !!",
            });
            this.props.getDocs();

        }
        catch (response) {
            this.setState({
                style: "alert alert-danger",
                errorMessage: "Não foi possivel cadastrar o Documento !!",
            });
        }

    }

    componentDidMount() {
        this.getTipos();

    }

    render() {

        return (
            <div className={this.state.colsList}>
                <h3>Novo Documento</h3>
                <div class={this.state.style} role="alert">
                    {this.state.errorMessage}
                </div>
                <div className="row">
                    <div className="form-group col-md-1"  >
                        <label htmlFor="iddodumento">Cod.</label>
                        <NumberFormat format="######" mask="_" className="form-control" type="text" id="iddocumento" name="iddocumento" value={this.state.iddocumento} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-2"  >
                        <label htmlFor="doc_titulo">Tipo</label>
                        <Select
                            isClearable
                            onChange={this.handleSelectChange}
                            onInputChange={this.handleInputChange}
                            options={this.state.listaTipo} />
                    </div>
                    <div className="form-group col-md-6"  >
                        <label htmlFor="doc_titulo">Titulo</label>
                        <input className="form-control" type="text" id="doc_titulo" name="doc_titulo" value={this.state.doc_titulo} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-1"  >
                        <label htmlFor="doc_rev">Revisao</label>
                        <input className="form-control" type="number" id="doc_rev" name="doc_rev" value={this.state.doc_rev} disabled="disabled" />
                    </div>
                    <div className="form-group col-md-2"  >
                        <label htmlFor="doc_emissao">Emissao</label>
                        <input className="form-control" type="date" id="doc_emissao" name="doc_emissao" value={this.state.doc_emissao} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-2"  >
                        <label htmlFor="doc_final">Final</label>
                        <input className="form-control" type="date" id="doc_final" name="doc_final" value={this.state.doc_final} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-3"  >
                        <label htmlFor="doc_user">Usuario</label>
                        <input className="form-control" type="text" id="doc_user" name="doc_user" value={localStorage.getItem(USER_LOGADO)} disabled="disabled" />
                    </div>
                    <div className="form-group col-md-4"  >
                        <label htmlFor="doc_obs">Observação</label>
                        <textarea style={{ height: "120px" }} className="form-control" id="doc_obs" name="doc_obs" value={this.state.doc_obs} onChange={this.handleChange} ></textarea>
                    </div>
                    <div className="form-group col-md-4"  >
                        <label htmlFor="doc_user"></label>
                        <button className="btn btn-block btn-primary" onClick={this.setDoc} >Incluir</button>
                    </div>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import api from '../../base/api';
import Select from 'react-select/creatable'

export default class FormCargo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iddepart: "",
            dept_desc: "",
            dept_resp: 0,
            style: "",
            listaUsers:[],
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


    getUsers = async () => {
        try {
            const response = await api.get('/list/users');
            let itens = [];
            response.data.map((item) => {
                let user= {
                    value: item.id,
                    label: item.username
                }
                itens.push(user);
            });
            this.setState({
                listaUsers: itens,
            });
        }
        catch (response) {
            this.setState({
                listaUsers: [],
            });
        }
    };

    setDepart = async () => {
        try {
            const response = await api.post('/generic/depart', {
                iddepart: this.state.iddepart,
                dept_desc: this.state.dept_desc,
                dept_resp: this.state.dept_resp,
            });
            this.setState({
                iddepart: "",
                dept_desc: "",
                dept_resp: 0,
                style: "alert alert-success",
                errorMessage: "Cadastro de Departamento efetuado com Sucesso !!",
            });
            this.props.getDeparts();

        }
        catch (response) {
            this.setState({
                style: "alert alert-danger",
                errorMessage: "Não foi possivel cadastrar o Departamento !!",
            });
        }
    };

    handleSelectChange = (newValue: any, actionMeta: any) => {
        this.setState({
            dept_resp: newValue.value,
        });

    };

    handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };


    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className='container col-12'>
                <h3>Novo Departamento</h3>
                <div class={this.state.style} role="alert">
                    {this.state.errorMessage}
                </div>
                <div className="row">
                    <div className="form-group col-md-1"  >
                        <label htmlFor="iddepart">Departamento</label>
                        <NumberFormat format="###" mask="_" className="form-control" type="text" id="iddepart" name="iddepart" value={this.state.iddepart} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-5"  >
                        <label htmlFor="dept_desc">Descrição</label>
                        <input className="form-control" type="text" id="dept_desc" name="dept_desc" value={this.state.dept_desc} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-4"  >
                        <label htmlFor="sel_user">Responsavel</label>
                        <Select
                            isClearable
                            onChange={this.handleSelectChange}
                            onInputChange={this.handleInputChange}
                            options={this.state.listaUsers} />
                    </div>
                </div>
                <div className="form-group col-md-2"  >
                    <label></label>
                    <button className="btn btn-block btn-primary" onClick={this.setDepart} disabled={!this.state.iddepart || !this.state.dept_desc} >Incluir</button>
                </div>
            </div>

        );
    }
}
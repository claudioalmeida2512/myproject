import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm' ;

const columns = [
    {
        Header: "Status",
        accessor: "doc_status"
    },
    {
        Header: "Doc.Id",
        accessor: "iddocumento"
    },
    {
        Header: "Tipo",
        accessor: "doc_tipo",
       
    },
    {
        Header: "Titulo",
        accessor: "doc_titulo",
        
    },
    {
        Header: "Revisao",
        accessor: "doc_rev"
    },
    {
        Header: "Emissao",
        accessor: "doc_emissao"
    },
    {
        Header: "Fim",
        accessor: "doc_final"
    },
    {
        Header: "Usuario",
        accessor: "doc_user"
    },
    {
        Header: "Aprovadores",
        accessor: "doc_aprov"
    },
];


export default class FormList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colsList: 'container col-12',
            listDocs: [],
        };
    }

    getDocs = async () => {
        try {
            const response = await api.get('/list/documento');
            this.setState({
                listDocs: response.data,
            });
            console.log(JSON.stringify(response.data));
        }
        catch (response) {
            this.setState({
                listDocs: [],
            });
        }
    };

    componentDidMount() {
        this.getDocs();

    }

    render() {
        const data = this.state.listDocs;
        return (
            <div className="conteudoPrincipal">
                <div className={this.state.colsList}>
                    <h1>Lista de Documentos</h1>
                    
                        <TableForm columns={columns} data={data}  />
                   

                </div>
            </div>
        );
    }

}






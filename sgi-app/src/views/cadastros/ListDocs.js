import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm';
import FormDoc from './FormDoc';



export default class FormList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colsList: 'container col-12',
            colDoc: '',
            btCad: 'Cadastrar Doc',
            listDocs: [],
            isNew: false,
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

    deleteRow = async (idDoc) => {
        const aLista = this.state.listDocs ;
        const index = aLista.findIndex(doc => {
            return doc.iddocumento === idDoc
        });
        console.log("Delete Iniciado");
        try{
            const response = await api.delete('/delete/documento/iddocumento/'+idDoc)
            console.log(response);
            aLista.splice(index,1) ;
            this.setState({
                    listDocs: aLista,
                }) ;

        }  catch (response) {
            console.log("Não foi possivel deletar o documento!!!") ;
        }
      
       
        
    }

    newDoc = () => {

        if (!this.state.isNew) {
            this.setState({
                isNew: true,
                colsList: 'container col-12',
                colDoc: 'container col-12',
                btCad: 'Expandir Lista',
            });
        } else {
            this.setState({
                isNew: false,
                colsList: 'container col-12',
                colDoc: 'container col-12',
                btCad: 'Cadastrar Doc',
            });

        }
    }

    render() {
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
                Filter: this.SelectColumnFilter,
                filter: 'includes',

            },
            {
                Header: "Titulo",
                accessor: "doc_titulo",

            },
            {
                Header: "Revisao",
                accessor: "doc_rev",
                Filter: this.SelectColumnFilter,
                filter: 'includes',
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
                Header: "Actions",
                Cell: props => {
                    return (
                        <button onClick={() => {
                            this.deleteRow(props.row.original.iddocumento)
                        }
                        } >Delete</button>
                    )
                },
                width: 50

            },
            {
                Header: "te",
                Cell: props => {
                    return (
                        <button>Edit</button>
                    )
                }
            },
        ];
        const data = this.state.listDocs;
        return (
            <>
                <div className="conteudoPrincipal">
                    <div className={this.state.colsList}>
                        {this.state.isNew &&
                            <div className={this.state.colDoc}>
                                <FormDoc getDocs={this.getDocs.bind(this)} />
                            </div>
                        }<br></br>
                        <h1>Lista de Documentos</h1>
                        <button className="btn btn-block btn-primary" onClick={this.newDoc} >{this.state.btCad}</button>
                        <TableForm columns={columns} data={data} />

                    </div>

                </div>

            </>

        );
    }



    // This is a custom filter UI for selecting
    // a unique option from a list
    SelectColumnFilter = ({
        column: { filterValue, setFilter, preFilteredRows, id },
    }) => {
        // Calculate the options for filtering
        // using the preFilteredRows
        const options = React.useMemo(() => {
            const options = new Set()
            preFilteredRows.forEach(row => {
                options.add(row.values[id])
            })
            return [...options.values()]
        }, [id, preFilteredRows])

        // Render a multi-select box
        return (
            <select
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        )
    }



}


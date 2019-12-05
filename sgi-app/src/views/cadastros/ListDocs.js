import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm';




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
                Filter: this.SelectColumnFilter ,
                filter: 'includes',

            },
            {
                Header: "Titulo",
                accessor: "doc_titulo",

            },
            {
                Header: "Revisao",
                accessor: "doc_rev",
                Filter: this.SelectColumnFilter ,
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
                Header: "Usuario",
                accessor: "doc_user"
            },
            {
                Header: "Aprovadores",
                accessor: "doc_aprov"
            },
        ];
        const data = this.state.listDocs;
        return (
            <div className="conteudoPrincipal">
                <div className={this.state.colsList}>
                    <h1>Lista de Documentos</h1>

                    <TableForm columns={columns} data={data} />


                </div>
            </div>
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


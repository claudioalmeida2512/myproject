import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm';
import FormTipo from './FormTipo';

export default class ListaTipos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btCad: 'Cadastrar Tipo',
            listaTipos: [],
            isNew: false,
        };
    }

    getTipos = async () => {
        try {
            const response = await api.get('/list/tpdoc');
            this.setState({
                listaTipos: response.data,
            });

        }
        catch (response) {
            this.setState({
                listaTipos: [],
            });
        }
    };

    componentDidMount() {
        this.getTipos();

    }


    newTipo = () => {

        if (!this.state.isNew) {
            this.setState({
                isNew: true,
                btCad: 'Expandir Lista',
            });
        } else {
            this.setState({
                isNew: false,
                btCad: 'Cadastrar Tipo',
            });

        }
    }

    render() {
        const columns = [
            {
                Header: "Tipo",
                accessor: "cod_tipo",
            },
            {
                Header: "Descrição",
                accessor: "desc_tipo",
            },
            {
                Header: "Observação",
                accessor: "obs_tipo",
            },
        ];
        const data = this.state.listaTipos;
        return (
            <>
            <div className="conteudoPrincipal">
                <div className='container col-12'>
                    {this.state.isNew &&
                         <FormTipo  getTipos={this.getTipos.bind(this)} />
                     }<br></br>
                    <h1>Lista de Tipos</h1>
                    <button className="btn btn-block btn-primary" onClick={this.newTipo} >{this.state.btCad}</button>
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
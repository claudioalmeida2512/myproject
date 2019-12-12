import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm';
import FormCargo from './FormCargo';

export default class ListaCargos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btCad: 'Cadastrar Cargo',
            listaCargos: [],
            isNew: false,
        };
    }

    getCargos = async () => {
        try {
            const response = await api.get('/list/cargo');
            this.setState({
                listaCargos: response.data,
            });

        }
        catch (response) {
            this.setState({
                listaCargos: [],
            });
        }
    };

    componentDidMount() {
        this.getCargos();

    }

    newCargo = () => {

        if (!this.state.isNew) {
            this.setState({
                isNew: true,
                btCad: 'Expandir Lista',
            });
        } else {
            this.setState({
                isNew: false,
                btCad: 'Cadastrar Cargo',
            });

        }
    }

    render() {
        const columns = [
            {
                Header: "Cargo",
                accessor: "idcargo",
            },
            {
                Header: "Descrição",
                accessor: "cargo_desc",
            },
        ];
        const data = this.state.listaCargos;
        return (
            <>
                <div className="conteudoPrincipal">
                    <div className='container col-12'>
                        {this.state.isNew &&
                            <FormCargo getCargos={this.getCargos.bind(this)} />
                        }<br></br>
                        <h1>Lista de Cargos</h1>
                        <button className="btn btn-block btn-primary" onClick={this.newCargo} >{this.state.btCad}</button>
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
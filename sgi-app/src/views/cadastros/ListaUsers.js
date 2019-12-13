import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm';
import FormUser from './FormUser';

export default class ListaUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btCad: 'Cadastrar Usuario',
            listaUsers: [],
            isNew: false,
        };
    }

    getUsers = async () => {
        try {
            const response = await api.get('/list/users');
            this.setState({
                listaUsers: response.data,
            });
        }
        catch (response) {
            this.setState({
                listaUsers: [],
            });
        }
    };

    newUser = () => {

        if (!this.state.isNew) {
            this.setState({
                isNew: true,
                btCad: 'Expandir Lista',
            });
        } else {
            this.setState({
                isNew: false,
                btCad: 'Cadastrar Usuario',
            });

        }
    }

    componentDidMount() {
        this.getUsers();

    }

    render() {
        const columns = [
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Codigo",
                accessor: "id",
            },
            {
                Header: "Usuario",
                accessor: "username",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Departamento",
                accessor: "user_dep",
            },
            {
                Header: "Função",
                accessor: "user_funcao",
            },
        ];
        const data = this.state.listaUsers;
        return (
            <>
                <div className="conteudoPrincipal">
                    <div className='container col-12'>
                        {this.state.isNew &&
                            <FormUser getUsers={this.getUsers.bind(this)} />
                        }<br></br>
                        <h1>Lista de Usuários</h1>
                        <button className="btn btn-block btn-primary" onClick={this.newUser} >{this.state.btCad}</button>
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
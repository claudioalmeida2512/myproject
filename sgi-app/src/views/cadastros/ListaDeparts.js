import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm';
import FormDepart from './FormDepart';

export default class ListaDeparts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btCad: 'Cadastrar Departamento',
            listaDeparts: [],
            isNew: false,
        };
    }

    getDeparts = async () => {
        try {
            const response = await api.get('/list/depart/users/id/dept_resp');
            this.setState({
                listaDeparts: response.data,
            });

        }
        catch (response) {
            this.setState({
                listaDeparts: [],
            });
        }
    };

    componentDidMount() {
        this.getDeparts();

    }

    newDepart = () => {

        if (!this.state.isNew) {
            this.setState({
                isNew: true,
                btCad: 'Expandir Lista',
            });
        } else {
            this.setState({
                isNew: false,
                btCad: 'Cadastrar Departamento',
            });

        }
    }

    deleteRow = async (idDep) => {
        const aLista = this.state.listaDeparts;
        const index = aLista.findIndex(dep => {
            return dep.iddepart === idDep
        });
        try {
            const response = await api.delete('/delete/depart/iddepart/' + idDep)
            console.log(response.data);
            aLista.splice(index, 1);
            this.setState({
                listaDeparts: aLista,
            });

        } catch (response) {
            console.log("Não foi possivel deletar o departamento!!!");
        }

    }

    render() {
        const columns = [
            {
                Header: "Departamento",
                accessor: "iddepart",
            },
            {
                Header: "Descrição",
                accessor: "dept_desc",
            },
            {
                Header: "Responsável",
                accessor: "username",
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (
                        <button onClick={() => {
                            this.deleteRow(props.row.original.iddepart)
                        }
                        } >Delete</button>
                    )
                },
                width: 50

            },
        ];
        const data = this.state.listaDeparts;
        return (
            <>
                <div className="conteudoPrincipal">
                    <div className='container col-12'>
                        {this.state.isNew &&
                            <FormDepart getDeparts={this.getDeparts.bind(this)} />
                        }<br></br>
                        <h1>Lista de Departamentos</h1>
                        <button className="btn btn-block btn-primary" onClick={this.newDepart} >{this.state.btCad}</button>
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
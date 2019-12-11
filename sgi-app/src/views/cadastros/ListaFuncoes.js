import React, { Component } from 'react';
import api from '../../base/api';
import TableForm from '../base/TableForm';
import FormFuncao from './FormFuncao';

export default class  ListaFuncoes extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            btCad: 'Cadastrar Funcao',
            listaFuncoes: [],
            isNew: false,
        };
    }

    getFuncoes = async () => {
        try {
            const response = await api.get('/list/funcao');
            this.setState({
                listaFuncoes: response.data,
            });

        }
        catch (response) {
            this.setState({
                listaFuncoes: [],
            });
        }
    };

    newFuncao = () => {

        if (!this.state.isNew) {
            this.setState({
                isNew: true,
                btCad: 'Expandir Lista',
            });
        } else {
            this.setState({
                isNew: false,
                btCad: 'Cadastrar Funcao',
            });

        }
    }


    componentDidMount() {
        this.getFuncoes();

    }

    render(){
        const columns = [
            {
                Header: "Codigo",
                accessor: "idfuncao",
            },
            {
                Header: "Desc. Funcao",
                accessor: "func_desc",
            },
            {
                Header: "Cargo",
                accessor: "func_cargo",
            },
            {
                Header: "Desc. Cargo",
                accessor: "func_desc_cargo",
            },
            {
                Header: "Funcao Superior",
                accessor: "func_sup",
            },
        ];
        const data = this.state.listaFuncoes;
       return(
        <>
        <div className="conteudoPrincipal">
            <div className='container col-12'>
                {this.state.isNew &&
                     <FormFuncao getFuncoes={this. getFuncoes.bind(this)} />
                 }<br></br>
                <h1>Lista de Funcoes</h1>
                <button className="btn btn-block btn-primary" onClick={this.newFuncao} >{this.state.btCad}</button>
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
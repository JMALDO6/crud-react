import React, { useState } from 'react';
import uniqid from 'uniqid';

const ListadoNombres = () => {

    const [nombre, setNombre] = useState('')
    const [listaNombres, setListaNombres] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState (null)

    const AddNombre = (e) => {
        e.preventDefault()

        if (!nombre.trim()) {
            setError('El campo nombre está vacío')
            return
        }

        const nuevoNombre = {
            id:uniqid(),
            tituloNombre:nombre
        }
        setListaNombres([...listaNombres, nuevoNombre])
        setNombre('')
        setError(null)
    }

    const deleteNombre = (id) => {
        const nuevoArray = listaNombres.filter(item => item.id != id)
        setListaNombres(nuevoArray)
    }

    const update = (item) => {
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const updateNombre = (e) => {
        e.preventDefault()
        const nuevoArray = listaNombres.map(item => item.id === id ? {id:item.id, tituloNombre:nombre} : item)
        setListaNombres(nuevoArray)
        setModoEdicion(false)
        setNombre('')
    }

    return (
        <div>
            <h2>Aplicación CRUD</h2>
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            listaNombres.map(item => 
                                <li className="list-group-item" key={item.id}>
                                    {item.tituloNombre}
                                    <button onClick={() => deleteNombre(item.id)} className="btn btn-danger float-right">Borrar</button>
                                    <button onClick={() => update(item)} className="btn btn-info float-right">Editar</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form   onSubmit={(e) => modoEdicion ? updateNombre(e) : AddNombre(e)} 
                            className="form-group">
                        <input  onChange={(e) => setNombre(e.target.value)} 
                                className="form-control mb-3" 
                                value={nombre} type="text" 
                                placeholder="Introduce el nombre" />
                        <input  className="btn btn-info btn-block" 
                                type="submit" 
                                value={modoEdicion ? 'Editar nombre' : 'Registrar nombre'} />
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger"> {error} </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListadoNombres
import React, { useContext, useState } from 'react'

// Context - Toma el que se declara como createContext
import { CategoriasContext  } from '../context/CategoriasContext'
import { RecetasContext  } from '../context/RecetasContext'

const Formulario = () => {  
    
    // Context
    const { categorias } = useContext(CategoriasContext)
    const { setBuscarReceta, setConsultar } = useContext(RecetasContext)

    // State del componente
    const [busqueda, setBusqueda] = useState({
        ingrediente: '',
        categoria: ''
    })

    // Función para obtener datos del contenido
    const obtenerDatosReceta = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    return ( 
        <form
            className="col-12"
            onSubmit={
                e => {
                    e.preventDefault()
                    setBuscarReceta(busqueda)
                    setConsultar(true)
                }
            }
        >
            <fieldset className="text-center">
                <legend>Buscar bebidas por categoría o ingrediente</legend>
                <div className="row mt-2">
                    <div className="col-md-4">
                        <input 
                            type="text"
                            className="form-control"
                            name="ingrediente"
                            placeholder="¿Cuál ingrediente buscas?"
                            onChange={obtenerDatosReceta}
                        />
                    </div>
                    <div className="col-md-4">
                        <select 
                            className="form-control"
                            name="categoria"
                            onChange={obtenerDatosReceta}
                        >
                            <option value="">Selecciona</option>
                            {
                                categorias.map(categoria => (
                                    <option 
                                        key={categoria.strCategory}
                                        value={categoria.strCategory}
                                    >{categoria.strCategory}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-md-4">
                        <input 
                            type="submit"
                            className="btn btn-block btn-primary"
                            value="Buscar bebidas"
                        />
                    </div>
                </div>
            </fieldset>
        </form>
     )
}
 
export default Formulario
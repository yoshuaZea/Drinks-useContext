import React, { createContext, useState, useEffect } from 'react'

// Crear el Context
export const CategoriasContext = createContext()

// Siempre que se crea context, se debe utilizar el provider
// Provider donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

    // Crear el state del Context
    const [ categorias, setCategorias ] = useState([])

    // Ejecutar llamado a la API
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

            const respuesta = await fetch(url)
            const categorias = await respuesta.json()

            setCategorias(categorias.drinks);
        }

        obtenerCategorias()
    }, [])
    
    /**
     * 1. En el return se utiliza el context como componente
     * 2. En el VALUE se colocan los valores disponibles en los demás componentes como objeto
     * 3. Dentro del componente, los diferentes componentes están dentro del props.children
     */

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider
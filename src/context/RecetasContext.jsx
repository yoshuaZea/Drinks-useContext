import React, { createContext, useState, useEffect } from 'react'

export const RecetasContext = createContext()

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([])
    const [buscarreceta, setBuscarReceta] = useState({
        ingrediente: '',
        categoria: ''
    })
    const [consultar, setConsultar] = useState(false)

    // Consultar API
    useEffect(() => {
        if(consultar){
            const obtenerRecetas = () => {
                const { ingrediente, categoria } = buscarreceta
    
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`
                const ejecutar = fetch(url)
                const respuesta = ejecutar.then(data => data.json())
                respuesta.then(res => setRecetas(res.drinks))
                setConsultar(false)
            }
    
            obtenerRecetas()
        }

    }, [buscarreceta, consultar])

    return ( 
        <RecetasContext.Provider
            value={{
                recetas,
                setBuscarReceta,
                setConsultar
            }}
        >
            { props.children }
        </RecetasContext.Provider>
    )
}
 
export default RecetasProvider;
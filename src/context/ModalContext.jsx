import React, { createContext, useState, useEffect } from 'react'

export const ModalContext = createContext()

const ModalProvider = (props) => {

    // State del provider
    const [idreceta, setIdreceta] = useState(null)
    const [recetaInfo, setRecetaInfo] = useState({})

    // Buscar la receta por ID
    useEffect(() => {
        if(!idreceta) return

        const buscarRecetaPorId = () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`
            const api = fetch(url).then(respuesta => respuesta.json())
            api.then(receta => setRecetaInfo(receta.drinks[0]))
        }

        buscarRecetaPorId()
    }, [idreceta])

    return ( 
        <ModalContext.Provider
            value={{
                recetaInfo,
                setIdreceta,
                setRecetaInfo
            }}
        >
            { props.children }
        </ModalContext.Provider>
    )
}
 
export default ModalProvider


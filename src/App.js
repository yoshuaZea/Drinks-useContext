import React, {  } from 'react';

// Components
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListaRecetas from './components/ListaRecetas'

/** CONTEXT
 * Al usar context se coloca como padre de los demas componentes
 */
import CategoriasContext from './context/CategoriasContext'
import RecetasContext from './context/RecetasContext'
import ModalContext from './context/ModalContext'

function App() {
  return(
    <CategoriasContext>
      <RecetasContext>
        <ModalContext>
          <Header 
            titulo="Buscador de recetas de bebidas"
          />

          <div className="container mt-5">
            <div className="row">
              <Formulario />
            </div>
            <ListaRecetas />
          </div>
          </ModalContext>
      </RecetasContext>
    </CategoriasContext>
  )
}

export default App;

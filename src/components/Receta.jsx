import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Context
import { ModalContext } from '../context/ModalContext'

// Modal
function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // Configuración del modal de material-ui
    const [ modalStyle ] = useState(getModalStyle)
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // Usar context
    const { recetaInfo, setIdreceta, setRecetaInfo } = useContext(ModalContext)

    // Muestra y formatea los ingredientes
    const mostrarIngredientes = (info) => {
        let ingredientes = []
        for(let i = 1; i < 16; i++){
            if(info[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{info[`strIngredient${i}`]}, {info[`strMeasure${i}`]}</li>
                )
            }
        }

        return ingredientes
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img
                    className="img-fluid"
                    src={receta.strDrinkThumb} 
                    alt="Drink"
                />
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={ 
                            () => {
                                setIdreceta(receta.idDrink)
                                handleOpen()
                            }
                        }
                    >
                        Ver receta
                    </button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={ () => {
                            handleClose()
                            setIdreceta(null)
                            setRecetaInfo({})  
                        }}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div style={modalStyle} className={classes.paper}>
                                <h2>{recetaInfo.strDrink}</h2>
                                <h4>Ingredientes y cantidades</h4>
                                <ul>
                                    {
                                        mostrarIngredientes(recetaInfo)
                                    }
                                </ul>
                                <h4 className="mt-3">Instrucciones</h4>
                                <p>
                                    { recetaInfo.strInstructions }
                                </p>

                                <img className="img-fluid my-4" src={recetaInfo.strDrinkThumb} alt="Drink"/>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
 
export default Receta;
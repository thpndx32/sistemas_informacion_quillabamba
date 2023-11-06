import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const Ficha = ({
    show, handleClose, idFicha
}) => {
    console.log("id ficha", idFicha);
    const arrHuespedes = idFicha.data()?.Huespedes;
    return (<Modal 
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Ficha
            </Typography>
            {idFicha.data().Huespedes.map((row)=>{
                return (
                <>
                    {row?.nombre}{row?.telefono}{row?.dni}
                </>
                )
            })}
            <div>
            {idFicha.data().Numero_Habitacion}
            </div>
            <div>
            {idFicha.data().Inicio_Estadia.toDate().toDateString()}
            </div>
            <div>
            {idFicha.data().Final_Estadia[idFicha.data().Final_Estadia.length-1].toDate().toDateString()}
            </div>
            {idFicha.data().Activo&&<Button>
                Añadir productos
            </Button>}
            {idFicha.data().Activo&&<Button>
                Modificar estadia
            </Button>}
        </Box>
    </Modal>);
}
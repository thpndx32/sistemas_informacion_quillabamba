import { Box, Button, Modal, Typography } from "@mui/material"
import { BoxStyle } from "../../../styles/Box"

export const FormEliminar = (
    {show,handleClose,sinConfirmar}
) => {
    return (
        <Modal
            open={show}
            onClose={sinConfirmar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={BoxStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={
                    {textTransform : "uppercase"}
                }>
                Se van a eliminar las habitaciones seleccionadas
                </Typography>
                <Button onClick={handleClose}>
                    Confirmar
                </Button>
                <Button onClick={sinConfirmar}>
                    No Confirmar
                </Button>
            </Box>
        </Modal>
    )
}
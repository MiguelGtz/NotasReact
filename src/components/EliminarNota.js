import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

import { useState } from "react";

import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const EliminarNota = (props) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const deleteDocument = () => {
    deleteDoc(doc(db, "Notas", props.idDoc));
  };

  return (
    <div className="EliminarNota">
      <Container>
        <Button
          variant="contained"
          color="error"
          fullWidth={true}
          onClick={openDialog}
        >
          Eliminar
        </Button>
        <Dialog open={open} onClose={closeDialog}>
          <DialogTitle>{"¿Seguro que quieres eliminar la nota?"}</DialogTitle>
          <DialogActions>
            <Button
              variant="contained"
              color="success"
              onClick={deleteDocument}
            >
              Aceptar
            </Button>
            <Button variant="contained" color="error" onClick={closeDialog}>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default EliminarNota;

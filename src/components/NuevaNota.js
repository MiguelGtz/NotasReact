import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useState } from "react";

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const NuevaNota = () => {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setTitulo("");
    setDescripcion("");
  };

  const saveData = () => {
    const fecha = new Date();

    addDoc(collection(db, "Notas"), {
      titulo: titulo,
      descripcion: descripcion,
      fecha: fecha,
    });

    setOpen(false);
    setTitulo("");
    setDescripcion("");
  };

  return (
    <div className="NuevaNota">
      <Container>
        <Button variant="contained" color="success" onClick={openDialog}>
          Nueva Nota
        </Button>
        <Dialog open={open} onClose={closeDialog}>
          <DialogTitle>{"Agregar Nueva Nota"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth={true}
              margin="normal"
              label="Titulo"
              variant="filled"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <TextField
              fullWidth={true}
              margin="normal"
              label="Descripcion"
              variant="filled"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={saveData}>
              Guardar
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

export default NuevaNota;

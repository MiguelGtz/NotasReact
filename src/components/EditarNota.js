import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useState, useEffect } from "react";

import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const EditarNota = (props) => {
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

    setDoc(doc(db, "Notas", props.idDoc), {
      titulo: titulo,
      descripcion: descripcion,
      fecha: fecha,
    });

    setOpen(false);
    setTitulo("");
    setDescripcion("");
  };

  const loadData = () => {
    getDoc(doc(db, "Notas", props.idDoc)).then((data) => {
      setTitulo(data.data().titulo);
      setDescripcion(data.data().descripcion);
    });
  };

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);

  return (
    <div className="EditarNota">
      <Container>
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={openDialog}
        >
          Editar
        </Button>
        <Dialog open={open} onClose={closeDialog}>
          <DialogTitle>{"Editar Nota"}</DialogTitle>
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

export default EditarNota;

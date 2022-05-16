import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useState, useEffect } from "react";

import NuevaNota from "./NuevaNota";
import EditarNota from "./EditarNota";
import EliminarNota from "./EliminarNota";

import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";

const TablaNotas = () => {
  const [arrayNotas, setArrayNotas] = useState([]);

  const cargarDatos = () => {
    const colRef = collection(db, "Notas");
    const q = query(colRef, orderBy("fecha", "desc"));

    onSnapshot(q, (snapshot) => {
      setArrayNotas([]);
      snapshot.forEach((doc) => {
        const nota = {
          id: doc.id,
          titulo: doc.data().titulo,
          descripcion: doc.data().descripcion,
          fecha: doc.data().fecha.toDate(),
        };
        setArrayNotas((arrayNotas) => [...arrayNotas, nota]);
      });
    });
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="TablaNotas">
      <Container align="center">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">#ID</TableCell>
                <TableCell align="center">Titulo</TableCell>
                <TableCell align="center">Descripcion</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrayNotas.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell align="center">{doc.id}</TableCell>
                  <TableCell align="center">{doc.titulo}</TableCell>
                  <TableCell align="center">{doc.descripcion}</TableCell>
                  <TableCell align="center">
                    {doc.fecha.toDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <EditarNota idDoc={doc.id}></EditarNota>
                    <EliminarNota idDoc={doc.id}></EliminarNota>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NuevaNota></NuevaNota>
      </Container>
    </div>
  );
};

export default TablaNotas;

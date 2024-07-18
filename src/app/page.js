'use client'
import { useState } from 'react';
import { Button, Container, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import styles from './page.module.css'


const Home = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState('');
  const [search, setSearch] = useState('');

  const handleAddBook = () => {
    setBooks([...books, newBook]);
    setNewBook('');
    setOpen(false);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredBooks = books.filter(book => book.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container className={styles.main}>
      <Typography variant="h2" className={styles.header}>Recopilación de libros</Typography>
      <div className={styles.buttonGroup}>
        <Button variant="contained" onClick={() => setOpen(true)}>Agregar Libro</Button>
        <TextField label="Buscar Libros" variant="outlined" value={search} onChange={handleSearch} />
      </div>
      <List>
        {filteredBooks.map((book, index) => (
          <ListItem key={index}>
            <ListItemText primary={book} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Nuevo Libro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Libro"
            type="text"
            fullWidth
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddBook}>Agregar</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="body1" className={styles.header}>
        <strong>Objetivo de la Aplicación:</strong> Gestionar y buscar o agregar libros de manera eficiente.
      </Typography>
      <Typography variant="body1" className={styles.header}>
        <strong>Autor:</strong> Andres Vargas
      </Typography>
    </Container>
  );
};

export default Home;

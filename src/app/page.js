'use client'
import { useState } from 'react';
import { Button, Container, Typography, TextField,  List, ListItem, ListItemText } from '@mui/material';
import styles from './page.module.css'
import Link from 'next/link';


const Home = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState('');
  const [search, setSearch] = useState('');


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredBooks = books.filter(book => book.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container className={styles.main}>
      <Typography variant="h2" className={styles.header}>Tus Libros a un click</Typography>
      <div className={styles.buttonGroup}>
        <TextField label="Buscar Libros" variant="outlined" value={search} onChange={handleSearch} />
      </div>
      <List>
        {filteredBooks.map((book, index) => (
          <ListItem key={index}>
            <ListItemText primary={book} />
          </ListItem>
        ))}
      </List>
      <Link href="/AgregarLibros" passHref>
          <Button variant="contained">Agregar Libros</Button>
        </Link>
      <Link href="/VerLibros" passHref>
          <Button variant="contained">Ver Libros</Button>
        </Link>
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

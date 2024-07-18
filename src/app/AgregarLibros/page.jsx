'use client'
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { css } from '@emotion/react';
import axios from 'axios';

const containerStyle = css`
  background-color: red; // Color de fondo claro
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const buttonStyle = css`
  align-self: flex-start;
`;

const errorMessageStyle = css`
  color: red;
`;

const successMessageStyle = css`
  color: green;
`;

const AgregarLibro = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publication_date: '',
    image_url: '',
    download_url: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('https://apisergiecode.onrender.com/books', formData);
      setLoading(false);
      setSuccess(true);
      setFormData({
        title: '',
        author: '',
        genre: '',
        publication_date: '',
        image_url: '',
        download_url: '',
        description: ''
      });
      console.log('Libro agregado:', response.data);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error('Error al agregar el libro:', err);
    }
  };

  return (
    <Container maxWidth="sm" css={containerStyle}>
      <Typography variant="h4" component="h1" gutterBottom>
        Agregar Libro
      </Typography>
      <form onSubmit={handleSubmit} css={formStyle}>
        <TextField
          name="title"
          label="Título"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          name="author"
          label="Autor"
          fullWidth
          value={formData.author}
          onChange={handleChange}
          required
        />
        <TextField
          name="genre"
          label="Género"
          fullWidth
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <TextField
          name="publication_date"
          label="Fecha de Publicación"
          fullWidth
          value={formData.publication_date}
          onChange={handleChange}
          required
        />
        <TextField
          name="image_url"
          label="URL de la Imagen"
          fullWidth
          value={formData.image_url}
          onChange={handleChange}
        />
        <TextField
          name="download_url"
          label="URL de Descarga"
          fullWidth
          value={formData.download_url}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Descripción"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        {loading && <CircularProgress />}
        {error && <Typography css={errorMessageStyle}>Error al agregar el libro: {error.message}</Typography>}
        {success && <Typography css={successMessageStyle}>Libro agregado exitosamente</Typography>}
        <Button type="submit" variant="contained" color="primary" css={buttonStyle} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Libro'}
        </Button>
      </form>
    </Container>
  );
};

export default AgregarLibro;

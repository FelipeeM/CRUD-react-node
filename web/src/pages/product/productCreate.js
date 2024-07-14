import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dialog,
  Button,
  Snackbar,
  Backdrop,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';

const ProductCreate = ({
  onClose,
  onSave,
  product
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (product) {
        await axios.put(`http://localhost:3000/api/v1/product`, {
          id: product.id,
          name,
          description,
          price: parseFloat(price),
        });
        setSnackbar({ open: true, message: 'Produto Atualizado!', severity: 'success' });
      } else {
        await axios.post('http://localhost:3000/api/v1/product', {
          name,
          description,
          price: parseFloat(price),
        })
        setSnackbar({ open: true, message: 'Produto Criado!', severity: 'success' });
      }
      onSave();
      onClose();
      setLoading(false);
    } catch (error) {
      console.error("error saving the product!", error);
      if (error.response) setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
      else setSnackbar({ open: true, message: 'Erro ao salvar Produto!', severity: 'error' });
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div>
      <Dialog open onClose={onClose}>
        <DialogTitle>{product ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <TextField
                autoFocus
                margin="dense"
                label="Nome"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                margin="dense"
                label="Preço"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                margin="dense"
                label="Descrição"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop style={{ zIndex: 1200 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductCreate;

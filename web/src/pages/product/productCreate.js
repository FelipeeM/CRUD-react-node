import React, { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PriceInput from '../../components/form/PriceInput';

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string(),
  price: z.number().min(0.01, 'Preço é obrigatório'),
});

const ProductCreate = ({ onClose, onSave, product }) => {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
    } else {
      reset();
    }
  }, [product, setValue, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (product) {
        await axios.put(`http://localhost:3000/api/v1/product`, {
          id: product.id,
          ...data,
        });
        setSnackbar({ open: true, message: 'Produto Atualizado!', severity: 'success' });
      } else {
        await axios.post('http://localhost:3000/api/v1/product', data);
        setSnackbar({ open: true, message: 'Produto Criado!', severity: 'success' });
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("error saving the product!", error);
      if (error.response) setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
      else setSnackbar({ open: true, message: 'Erro ao salvar Produto!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div>
      <Dialog open onClose={onClose}>
        <DialogTitle>{product ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      margin="dense"
                      label="Nome"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={4}>
                <Controller
                  name="price"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <PriceInput
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.price}
                      helperText={errors.price?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      label="Descrição"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Salvar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
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

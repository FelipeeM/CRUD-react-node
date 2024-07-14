import React, { useEffect, useState } from 'react';
import {
  Alert,
  Table,
  Paper,
  Button,
  Snackbar,
  Backdrop,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Typography,
  IconButton,
  TableContainer,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ProductCreate from './ProductCreate';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/product/findAll');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the products!", error);
      setSnackbar({ open: true, message: 'Erro ao buscar produtos!', severity: 'error' });
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/v1/product/${id}`);
      getProducts();
      setSnackbar({ open: true, message: 'Produto deletado com sucesso!', severity: 'success' });
    } catch (error) {
      console.error("Error deleting the Product!", error);
      setSnackbar({ open: true, message: 'Erro ao deletar Produto!', severity: 'error' });
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
    setOpenForm(false);
    getProducts();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Produtos
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
        Adicionar Produtos
      </Button>
      {openForm && <ProductCreate onClose={handleFormClose} product={selectedProduct} onSave={getProducts} />}
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell style={{
                  maxWidth: '50px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>{product.description}</TableCell>

                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Container>
  );
};

export default ProductList;

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
  CircularProgress,
  TextField,
  InputAdornment,
  TableSortLabel
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductCreate from './productCreate';
import ConfirmDialog from '../../components/confirmDIalog/ConfirmDialog';

import ProductService from '../../services/product';

import { monetaryMask } from "../../utils/masks"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.findAll();
      const productsWithPriceFormated = response.data.map(product => ({...product, priceFormated: monetaryMask(Number(product.price).toFixed(2))}))
      setProducts(productsWithPriceFormated);
    } catch (error) {
      console.error("Error fetching the products!", error);
      setSnackbar({ open: true, message: 'Erro ao buscar produtos!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const runConfirmDialog = async (id) => {
    setConfirmDialogOpen(!confirmDialogOpen)
    setIdToDelete(id)
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await ProductService.delete(idToDelete);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedProducts = products.slice().sort((a, b) => {
    if (orderBy === 'price') {
      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    } else {
      return orderBy ?
        (order === 'asc'
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy])) : products
    }
  });

  const formatValue = (value) => value.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replaceAll(' ','');

  const filteredProducts = sortedProducts.filter(product =>
    formatValue(product.name).toLowerCase().includes(formatValue(searchTerm)) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.priceFormated.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {openForm && <ProductCreate onClose={handleFormClose} product={selectedProduct} onSave={getProducts} onSetSnackbar={setSnackbar} />}
      {confirmDialogOpen && <ConfirmDialog
        onAction={handleDelete}
        open={confirmDialogOpen}
        onOpen={setConfirmDialogOpen}
        title="Confirmar Acão"
        message="Deseja deletar esse produto? Esta ação não pode ser desfeita."
      />}
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Produtos
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={9}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={3}>
          <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
            Adicionar Produtos
          </Button>
        </Grid>
        <Grid xs={12}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 155px)' }} component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={orderBy === 'name' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Nome
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'price' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'price'}
                      direction={orderBy === 'price' ? order : 'asc'}
                      onClick={() => handleRequestSort('price')}
                    >
                      Preço (R$)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'description' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'description'}
                      direction={orderBy === 'description' ? order : 'asc'}
                      onClick={() => handleRequestSort('description')}
                    >
                      Descrição
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.priceFormated}</TableCell>
                    <TableCell style={{
                      maxWidth: '150px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>{product.description}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => runConfirmDialog(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

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

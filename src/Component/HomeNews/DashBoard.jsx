import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Tooltip,
    Chip
} from '@mui/material';
import { Edit, Delete, Add, Sort } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const ProductCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
}));

export default function DashBoard() {
    const [data, setData] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', rating: '', color: '', category: '', price: '', image: '' });
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
    const url = "https://670a18feaf1a3998baa30962.mockapi.io/HoaLan";

    useEffect(() => {
        axios.get(url)
            .then(res => setData(res.data));
    }, []);

    const handleSortByRating = () => {
        const sortedData = [...data].sort((a, b) => sortAsc ? a.rating - b.rating : b.rating - a.rating);
        setData(sortedData);
        setSortAsc(!sortAsc);
    };

    const handleOpen = () => {
        setCurrentProduct({ name: '', rating: '', color: '', category: '', price: '', image: '' });
        setEditMode(false);
        setOpen(true);
    };

    const handleEdit = (id) => {
        const productToEdit = data.find(item => item.id === id);
        setCurrentProduct(productToEdit);
        setEditMode(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const generateNewId = () => {
        const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
        return maxId + 1;
    };

    const handleSave = () => {
        if (editMode) {
            axios.put(`${url}/${currentProduct.id}`, currentProduct)
                .then(() => {
                    setData(data.map(item => (item.id === currentProduct.id ? currentProduct : item)));
                    handleClose();
                    alert("Product updated successfully!");
                });
        } else {
            const newProduct = { ...currentProduct, id: generateNewId() };
            axios.post(url, newProduct)
                .then(res => {
                    setData([...data, newProduct]);
                    handleClose();
                    alert("Product added successfully!");
                });
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            axios.delete(`${url}/${id}`)
                .then(() => {
                    setData(data.filter(hoalan => hoalan.id !== id));
                    alert("Item deleted successfully!");
                })
                .catch((error) => {
                    alert("Error deleting item: " + error.message);
                });
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Product Dashboard
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleOpen}
                    >
                        Add Product
                    </Button>
                    <Box>
                        <Button
                            variant={viewMode === 'table' ? 'contained' : 'outlined'}
                            onClick={() => setViewMode('table')}
                            sx={{ mr: 1 }}
                        >
                            Table View
                        </Button>
                        <Button
                            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid View
                        </Button>
                    </Box>
                </Box>

                {viewMode === 'table' ? (
                    <TableContainer component={Paper} elevation={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Image</StyledTableCell>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            Rating
                                            <Tooltip title="Sort by Rating">
                                                <IconButton size="small" onClick={handleSortByRating}>
                                                    <Sort />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">Color</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Price</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((hoalan) => (
                                    <StyledTableRow key={hoalan.id}>
                                        <TableCell align="center">
                                            <img
                                                src={hoalan.image}
                                                alt={hoalan.name}
                                                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center"><strong>{hoalan.name}</strong></TableCell>
                                        <TableCell align="center">
                                            <Chip label={hoalan.rating} color="primary" />
                                        </TableCell>
                                        <TableCell align="center">{hoalan.color}</TableCell>
                                        <TableCell align="center">{hoalan.category}</TableCell>
                                        <TableCell align="center">${hoalan.price}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton color="primary" onClick={() => handleEdit(hoalan.id)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton color="secondary" onClick={() => handleDelete(hoalan.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Grid container spacing={3}>
                        {data.map((hoalan) => (
                            <Grid item xs={12} sm={6} md={4} key={hoalan.id}>
                                <ProductCard>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={hoalan.image}
                                        alt={hoalan.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {hoalan.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {hoalan.category}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Color: {hoalan.color}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                            <Chip label={`Rating: ${hoalan.rating}`} color="primary" />
                                            <Typography variant="h6" color="text.primary">
                                                ${hoalan.price}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                        <Button size="small" color="primary" startIcon={<Edit />} onClick={() => handleEdit(hoalan.id)}>
                                            Edit
                                        </Button>
                                        <Button size="small" color="secondary" startIcon={<Delete />} onClick={() => handleDelete(hoalan.id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </ProductCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.name}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Rating"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.rating}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, rating: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Color"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.color}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, color: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.category}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.price}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Image URL"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.image}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        {editMode ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
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
    IconButton,
    Tooltip,
    Chip,
    createTheme,
    ThemeProvider
} from '@mui/material';

import { Edit, Delete, Add, Sort } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Tạo theme với màu hồng chủ đạo
const theme = createTheme({
    palette: {
        primary: {
            main: '#FF69B4',
            light: '#FFB6C1',
            dark: '#FF1493',
        },
        secondary: {
            main: '#FF69B4',
        },
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: '#FF69B4',
    color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FFF0F5',  // Màu hồng nhạt cho hàng lẻ
    },
    '&:hover': {
        backgroundColor: '#FFB6C1',  // Màu hồng nhạt khi hover
    },
}));

export default function DashBoard() {
    const [data, setData] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', rating: '', color: '', category: '', price: '', image: '' });
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
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{ color: '#FF69B4' }}
                    >
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
                    </Box>

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
                                                    <Sort sx={{ color: 'white' }} />
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
                                            <Chip
                                                label={hoalan.rating}
                                                color="primary"
                                                sx={{
                                                    '& .MuiChip-label': {
                                                        color: 'white'
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{hoalan.color}</TableCell>
                                        <TableCell align="center">{hoalan.category}</TableCell>
                                        <TableCell align="center">{hoalan.price} VNĐ</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    onClick={() => handleEdit(hoalan.id)}
                                                    sx={{ color: '#FF69B4' }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    onClick={() => handleDelete(hoalan.id)}
                                                    sx={{ color: '#FF1493' }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle sx={{ color: '#FF69B4' }}>
                        {editMode ? 'Edit Product' : 'Add Product'}
                    </DialogTitle>
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
                        <Button onClick={handleClose} sx={{ color: '#FF69B4' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            {editMode ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}
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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Checkbox, FormControlLabel } from '@mui/material';

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
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        axios.get(url)
            .then(res => setData(res.data));
    }, [data]);

    const handleSortByRating = () => {
        const sortedData = [...data].sort((a, b) => sortAsc ? a.rating - b.rating : b.rating - a.rating);
        setData(sortedData);
        setSortAsc(!sortAsc);
    };


    const handleOpen = () => {
        setCurrentProduct(formik.values);
        setEditMode(false);
        setOpen(true);
    };

    const handleEdit = (id) => {

        const productToEdit = data.find(item => item.id === id);
        formik.values = productToEdit;
        formik.setValues(productToEdit);
        setCurrentProduct({ ...formik.values, id: id }); console.log(currentProduct)
        setEditMode(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    const generateNewId = () => {
        const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
        return maxId + 1;
    };

    const handleSave = () => {
        if (editMode) {
            console.log(formik.values)
            axios.put(`${url}/${currentProduct.id}`, formik.values)
                .then(() => {
                    setData(data.map(item => (item.id === currentProduct.id ? currentProduct : item)));
                    handleClose();
                    alert("Product updated successfully!");
                }).catch(errors => console.log(errors));
        } else {
            const newProduct = { ...formik.values, id: generateNewId() };
            axios.post(url, newProduct)
                .then(res => {
                    setData([...data, newProduct]);
                    handleClose();
                    alert("Product added successfully!");
                });
        }
        formik.resetForm();
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


    const formik = useFormik({
        validateOnChange: false, //được kích hoạt khi giá trị input thay đổi
        validateOnBlur: false, //kích hoạt khi thoát khỏi input
        initialValues: {

            name: '',
            rating: 0,
            isSpecial: false,
            image: '',
            color: '',
            origin: '',
            category: '',
            description: '',
            price: 0,
            videoUrl: '',

        },
        onSubmit: handleSave,

        validationSchema: Yup.object({
            name: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            rating: Yup.number()
                .required("Required.")
                .min(1, "Rating phải lớn hơn 1.")
                .max(5, "Phải nhỏ hơn hoặc bằng 5."),
            image: Yup.string()
                .required("Required."),
            color: Yup.string()
                .required("Required."),
            origin: Yup.string()
                .required("Required."),
            category: Yup.string()
                .required("Required."),
            description: Yup.string()
                .required("Required."),
            price: Yup.number()
                .required("Required.")
                .min(0, "Price must be greater than or equal to 0."),
            videoUrl: Yup.string()
                .url("Must be a valid URL.")
                .required("Required."),
        }),
    })
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
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <TextField
                                name='name'
                                autoFocus
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name && (<Typography variant="error" component="h4"> {formik.errors.name}   </Typography>
                            )}
                            <TextField
                                name='rating'
                                margin="dense"
                                label="Rating"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.rating && (<Typography variant="error" component="h4"> {formik.errors.rating}   </Typography>
                            )}
                            <TextField
                                name='image'
                                margin="dense"
                                label="Image URL"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.image && (<Typography variant="error" component="h4"> {formik.errors.image}   </Typography>
                            )}
                            <TextField
                                name='color'
                                margin="dense"
                                label="Color"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formik.values.color}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.color && (<Typography variant="error" component="h4"> {formik.errors.color}   </Typography>
                            )}
                            <TextField
                                name='origin'
                                margin="dense"
                                label="Origin"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formik.values.origin}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.origin && (<Typography variant="error" component="h4"> {formik.errors.origin}   </Typography>
                            )}
                            <TextField
                                name='category'
                                margin="dense"
                                label="Category"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.category && (<Typography variant="error" component="h4"> {formik.errors.category}   </Typography>
                            )}
                            <TextField
                                name='description'
                                margin="dense"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.description && (<Typography variant="error" component="h4"> {formik.errors.description}   </Typography>
                            )}
                            <TextField
                                name='price'
                                margin="dense"
                                label="Price"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.price && (<Typography variant="error" component="h4"> {formik.errors.price}   </Typography>
                            )}
                            <TextField
                                name='videoUrl'
                                margin="dense"
                                label="Video URL"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formik.values.videoUrl}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.videoUrl && (<Typography variant="error" component="h4"> {formik.errors.videoUrl}   </Typography>
                            )}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isSpecial"
                                        checked={formik.values.isSpecial}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Special"
                            />
                        </DialogContent>
                    </form>
                    <DialogActions>

                        <Button onClick={handleClose} sx={{ color: '#FF69B4' }}>
                            Cancel
                        </Button>
                        <Button onClick={formik.handleSubmit} variant="contained" color="primary">
                            {editMode ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}
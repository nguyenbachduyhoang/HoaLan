import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    TextField,
    Button,
    Box,
    Typography,
    Rating,
    Avatar,
    Paper,
    Alert,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';

const Comment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [editRating, setEditRating] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [isValidAccount, setIsValidAccount] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [openReplyDialog, setOpenReplyDialog] = useState(false);
    const [commentToReply, setCommentToReply] = useState(null);
    const [replies, setReplies] = useState([]);
    const [parentReplyId, setParentReplyId] = useState(null);
    const [editingReply, setEditingReply] = useState(null);
    const [editReplyContent, setEditReplyContent] = useState('');
    const [openEditReplyDialog, setOpenEditReplyDialog] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const profile = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        fetchComments();
        fetchReplies();
        checkValidAccount();
    }, [id]);

    const fetchComments = async () => {
        try {
            const response = await axios.get('https://67251ffbc39fedae05b40096.mockapi.io/Comment');
            const productComments = response.data.filter(comment => comment.productId === id);
            setComments(productComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchReplies = async () => {
        try {
            const response = await axios.get('https://67251ffbc39fedae05b40096.mockapi.io/Replies');
            setReplies(response.data.filter(reply => reply.productId === id));
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const checkValidAccount = async () => {
        if (!user) return;

        try {
            const response = await axios.get('https://670a18feaf1a3998baa30962.mockapi.io/Account');
            const accounts = response.data;
            
            const isAdmin = accounts.some(acc => acc.email === user.email && acc.role === 'admin');
            
            setIsValidAccount(!isAdmin);
            
        } catch (error) {
            console.error('Error checking account:', error);
            setIsValidAccount(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
            setError('Vui lòng đăng nhập để bình luận!');
            return;
        }
    
        if (!isValidAccount) {
            setError('Admin không được phép nhận xét sản phẩm, chỉ được trả lời khách hàng!');
            return;
        }
    
        if (!newComment.trim()) {
            setError('Vui lòng nhập nội dung bình luận!');
            return;
        }
    
        if (rating === 0) {
            setError('Vui lòng chọn số sao đánh giá!');
            return;
        }
    
        try {
            const response = await axios.get('https://67251ffbc39fedae05b40096.mockapi.io/Comment');
            // Only check for comments on the current product
            const existingComment = response.data.find(comment => 
                comment.userEmail === user.email && 
                comment.productId === id
            );
            
            if (existingComment) {
                setError('Bạn đã đánh giá sản phẩm này rồi!');
                return;
            }
    
            const newCommentData = {
                productId: id,
                userEmail: user.email,
                userName: profile.name,
                userAvatar: profile.picture,
                content: newComment,
                rating: rating,
                createdAt: new Date().toISOString()
            };
    
            await axios.post('https://67251ffbc39fedae05b40096.mockapi.io/Comment', newCommentData);
            setSuccess('Đánh giá của bạn đã được gửi thành công!');
            setNewComment('');
            setRating(0);
            setError('');
            fetchComments();
        } catch (error) {
            console.error('Error posting comment:', error);
            setError('Có lỗi xảy ra khi gửi đánh giá!');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleDeleteClick = async (comment) => {
        const message = "Sau khi xóa đánh giá này, bạn có thể đánh giá sản phẩm khác. Bạn có chắc chắn muốn xóa?";
        if (window.confirm(message)) {
            setCommentToDelete(comment);
            setOpenDialog(true);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`https://67251ffbc39fedae05b40096.mockapi.io/Comment/${commentToDelete.id}`);
            setSuccess('Bình luận đã được xóa thành công!');
            fetchComments(); // Refresh comments list
            setOpenDialog(false);
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Có lỗi xảy ra khi xóa bình luận!');
        }
    };

    const handleDeleteCancel = () => {
        setOpenDialog(false);
        setCommentToDelete(null);
    };

    const handleEditClick = (comment) => {
        setEditingComment(comment);
        setEditContent(comment.content);
        setEditRating(comment.rating);
        setOpenEditDialog(true);
    };

    const handleEditCancel = () => {
        setOpenEditDialog(false);
        setEditingComment(null);
        setEditContent('');
        setEditRating(0);
    };

    const handleEditConfirm = async () => {
        if (!editContent.trim()) {
            setError('Vui lòng nhập nội dung bình luận!');
            return;
        }

        if (editRating === 0) {
            setError('Vui lòng chọn số sao đánh giá!');
            return;
        }

        try {
            const updatedComment = {
                ...editingComment,
                content: editContent,
                rating: editRating,
                updatedAt: new Date().toISOString()
            };

            await axios.put(`https://67251ffbc39fedae05b40096.mockapi.io/Comment/${editingComment.id}`, updatedComment);
            setSuccess('Bình luận đã được cập nhật thành công!');
            fetchComments();
            handleEditCancel();
        } catch (error) {
            console.error('Error updating comment:', error);
            setError('Có lỗi xảy ra khi cập nhật bình luận!');
        }
    };

    const handleReplyClick = (comment, replyId = null) => {
        setCommentToReply(comment);
        setParentReplyId(replyId);
        setOpenReplyDialog(true);
    };

    const handleReplyCancel = () => {
        setOpenReplyDialog(false);
        setCommentToReply(null);
        setReplyContent('');
    };

    const handleReplySubmit = async () => {
        if (!replyContent.trim()) {
            setError('Vui lòng nhập nội dung trả lời!');
            return;
        }

        try {
            const newReply = {
                productId: id,
                commentId: commentToReply.id,
                parentReplyId: parentReplyId,
                userEmail: user.email,
                userName: profile.name,
                userAvatar: profile.picture,
                content: replyContent,
                createdAt: new Date().toISOString()
            };

            await axios.post('https://67251ffbc39fedae05b40096.mockapi.io/Replies', newReply);
            setSuccess('Trả lời đã được gửi thành công!');
            fetchReplies();
            handleReplyCancel();
        } catch (error) {
            console.error('Error posting reply:', error);
            setError('Có lỗi xảy ra khi gửi trả lời!');
        }
    };

    const handleEditReplyClick = (reply) => {
        setEditingReply(reply);
        setEditReplyContent(reply.content);
        setOpenEditReplyDialog(true);
    };

    const handleEditReplyCancel = () => {
        setOpenEditReplyDialog(false);
        setEditingReply(null);
        setEditReplyContent('');
    };

    const handleEditReplyConfirm = async () => {
        if (!editReplyContent.trim()) {
            setError('Vui lòng nhập nội dung trả lời!');
            return;
        }

        try {
            const updatedReply = {
                ...editingReply,
                content: editReplyContent,
                updatedAt: new Date().toISOString()
            };

            await axios.put(`https://67251ffbc39fedae05b40096.mockapi.io/Replies/${editingReply.id}`, updatedReply);
            setSuccess('Trả lời đã được cập nhật thành công!');
            fetchReplies();
            handleEditReplyCancel();
        } catch (error) {
            console.error('Error updating reply:', error);
            setError('Có lỗi xảy ra khi cập nhật trả lời!');
        }
    };

    const handleDeleteReply = async (replyId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa trả lời này?')) {
            try {
                await axios.delete(`https://67251ffbc39fedae05b40096.mockapi.io/Replies/${replyId}`);
                setSuccess('Trả lời đã được xóa thành công!');
                fetchReplies();
            } catch (error) {
                console.error('Error deleting reply:', error);
                setError('Có lỗi xảy ra khi xóa trả lời!');
            }
        }
    };

    const renderReplies = (commentId, parentReplyId = null, level = 0) => {
        const filteredReplies = replies.filter(reply => 
            reply.commentId === commentId && 
            reply.parentReplyId === parentReplyId
        );

        return filteredReplies.map(reply => (
            <Box key={reply.id} sx={{ ml: level * 4, mt: 1 }}>
                <Paper
                    elevation={0}
                    sx={{ 
                        p: 1, 
                        mb: 1, 
                        backgroundColor: '#f8f8f8',
                        borderLeft: '3px solid #FF69B4'
                    }}
                >
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'flex-start' 
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar
                                src={reply.userAvatar}
                                alt={reply.userName}
                                sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                {reply.userName}
                            </Typography>
                        </Box>
                        <Box>
                            {user && (
                                <IconButton 
                                    onClick={() => handleReplyClick(commentToReply, reply.id)}
                                    sx={{ 
                                        color: '#FF69B4',
                                        '&:hover': { color: '#FF1493' }
                                    }}
                                >
                                    <ReplyIcon />
                                </IconButton>
                            )}
                            {user && user.email === reply.userEmail && (
                                <>
                                    <IconButton 
                                        onClick={() => handleEditReplyClick(reply)}
                                        sx={{ 
                                            color: '#FF69B4',
                                            '&:hover': { color: '#FF1493' }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => handleDeleteReply(reply.id)}
                                        sx={{ 
                                            color: '#FF69B4',
                                            '&:hover': { color: '#FF1493' }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ ml: 4 }}>
                        {reply.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
                        {new Date(reply.createdAt).toLocaleDateString()}
                        {reply.updatedAt && ' (đã chỉnh sửa)'}
                    </Typography>

                    {renderReplies(commentId, reply.id, level + 1)}
                </Paper>
            </Box>
        ));
    };

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Đánh giá & Bình luận
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            {user ? (
                isValidAccount ? (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                        <Rating
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Nhập bình luận của bạn..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                bgcolor: '#FF69B4',
                                '&:hover': {
                                    bgcolor: '#FF1493',
                                },
                            }}
                        >
                            Gửi bình luận
                        </Button>
                    </Box>
                ) : (
                    <Alert 
                        severity="warning" 
                        sx={{ mb: 2 }}
                    >
                        Admin không được phép nhận xét sản phẩm, chỉ được trả lời khách hàng!
                    </Alert>
                )
            ) : (
                <Alert 
                    severity="info" 
                    sx={{ 
                        mb: 2,
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#e3f2fd'
                        }
                    }}
                    onClick={handleLoginRedirect}
                >
                    Vui lòng đăng nhập để bình luận! (Click để đăng nhập)
                </Alert>
            )}

            <Box>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <Paper
                            key={comment.id}
                            elevation={1}
                            sx={{ p: 2, mb: 2 }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Avatar
                                        src={comment.userAvatar}
                                        alt={comment.userName}
                                        sx={{ mr: 2 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {comment.userName}
                                        </Typography>
                                        <Rating value={comment.rating} readOnly size="small" />
                                    </Box>
                                </Box>
                                {user && (
                                    <Box>
                                        <IconButton 
                                            onClick={() => handleReplyClick(comment)}
                                            sx={{ 
                                                color: '#FF69B4',
                                                '&:hover': { color: '#FF1493' }
                                            }}
                                        >
                                            <ReplyIcon />
                                        </IconButton>
                                        {user.email === comment.userEmail && (
                                            <>
                                                <IconButton onClick={() => handleEditClick(comment)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteClick(comment)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </Box>
                                )}
                            </Box>
                            <Typography variant="body1">
                                {comment.content}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(comment.createdAt).toLocaleDateString()}
                                {comment.updatedAt && ' (đã chỉnh sửa)'}
                            </Typography>

                            <Box sx={{ ml: 4, mt: 2 }}>
                                {renderReplies(comment.id)}
                            </Box>
                        </Paper>
                    ))
                ) : (
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            p: 3, 
                            textAlign: 'center',
                            backgroundColor: '#fafafa',
                            border: '1px dashed #ccc'
                        }}
                    >
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ fontStyle: 'italic' }}
                        >
                            Sản phẩm này chưa có ai đánh giá & bình luận
                        </Typography>
                    </Paper>
                )}
            </Box>

            {/* Edit Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={handleEditCancel}
                fullWidth
            >
                <DialogTitle>
                    Chỉnh sửa bình luận
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Rating
                            value={editRating}
                            onChange={(event, newValue) => {
                                setEditRating(newValue);
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Nhập bình luận của bạn..."
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleEditCancel}
                        sx={{ color: '#666' }}
                    >
                        Hủy
                    </Button>
                    <Button 
                        onClick={handleEditConfirm}
                        sx={{
                            bgcolor: '#FF69B4',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#FF1493',
                            },
                        }}
                    >
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog xác nhận xóa */}
            <Dialog
                open={openDialog}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>
                    Xác nhận xóa bình luận
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa bình luận này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleDeleteCancel}
                        sx={{ color: '#666' }}
                    >
                        Hủy
                    </Button>
                    <Button 
                        onClick={handleDeleteConfirm}
                        sx={{
                            bgcolor: '#FF69B4',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#FF1493',
                            },
                        }}
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reply Dialog */}
            <Dialog
                open={openReplyDialog}
                onClose={handleReplyCancel}
                fullWidth
            >
                <DialogTitle>
                    Trả lời bình luận
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Nhập trả lời của bạn..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleReplyCancel}
                        sx={{ color: '#666' }}
                    >
                        Hủy
                    </Button>
                    <Button 
                        onClick={handleReplySubmit}
                        sx={{
                            bgcolor: '#FF69B4',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#FF1493',
                            },
                        }}
                    >
                        Gửi trả lời
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Reply Dialog */}
            <Dialog
                open={openEditReplyDialog}
                onClose={handleEditReplyCancel}
                fullWidth
            >
                <DialogTitle>
                    Chỉnh sửa trả lời
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Nhập trả lời của bạn..."
                            value={editReplyContent}
                            onChange={(e) => setEditReplyContent(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleEditReplyCancel}
                        sx={{ color: '#666' }}
                    >
                        Hủy
                    </Button>
                    <Button 
                        onClick={handleEditReplyConfirm}
                        sx={{
                            bgcolor: '#FF69B4',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#FF1493',
                            },
                        }}
                    >
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Comment;

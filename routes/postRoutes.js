const express = require("express");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    commentOnPost,
    dislikePost,
    getPostMetrics,
    searchAndFilterPosts
} = require("../controllers/postControllers");


const router = express.Router();

router.post('/', createPost);

router.get('/', getAllPosts);
router.get('/search', searchAndFilterPosts);
router.get('/:id', getPostById);

router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

router.post('/:postId/like', likePost);
router.post('/:postId/dislike', dislikePost);
router.post('/:postId/comment', commentOnPost);
router.get('/:postId/metrics', getPostMetrics);



module.exports = router;
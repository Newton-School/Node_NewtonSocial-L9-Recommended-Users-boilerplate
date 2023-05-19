const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'newtonSchool';


// Create a new post
const createPost = async (req, res) => {
    try {
        const { author, content, tags } = req.body;

        if (!author || !content) {
            return res.status(400).json({ message: 'Author and content are required fields' });
        }

        const post = new Post({
            author: author,
            content: content,
            tags: tags
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Controller for searching a post
/*
You need to implement a controller function called searchAndFilterPosts that handles searching and filtering of posts in a social media application. The function should extract the following parameters from the request query: searchQuery, tags, sortBy, page, and limit.

The searchQuery parameter represents a string that specifies the search query to find posts that contain a specific text pattern in their content. The tags parameter is an optional array of strings that represents the tags to filter the posts. Only posts that have at least one of the provided tags should be included in the filtered results. The sortBy parameter is an optional string that represents the field to sort the filtered posts. The supported values for sortBy are 'createdAt' for ascending order sorting based on the creation date of the post and '-createdAt' for descending order sorting.

The page parameter represents the page number of the paginated results, and the limit parameter specifies the maximum number of posts per page. If these parameters are not provided or their values are invalid, default values should be used (page = 1, limit = 10).

The function should perform the following tasks:

Validate and sanitize the input parameters (searchQuery, tags, sortBy, page, and limit).
Construct a query object based on the provided parameters to filter the posts.
Implement pagination by calculating the skip value based on the current page and limit.
Perform a database query using the constructed query object, sorting options, skip value, and limit to retrieve the filtered posts.
Return a success response with the filtered posts in the response body.
Sample Input:

Request Query Parameters:

searchQuery: "example"
tags: ["tag1", "tag2"]
sortBy: "createdAt"
page: 2
limit: 5
Sample Output:

Status code: 200
Response body:
{
"posts": [
      <Array of filtered paginated posts (e.g., [{ post1 }, { post2 }])>
]
}

Possible Errors and Outputs:

If an error occurs during the searching and filtering process:
Status code: 500
Response body: { "error": "An error occurred while searching and filtering posts" }
Note: The actual contents of the filtered posts and specific error messages may vary based on the implementation details and database interactions.
*/
async function searchAndFilterPosts(req, res) {
    const { searchQuery, tags, sortBy, page, limit } = req.query;
    let pageNumber = parseInt(page) || 1;
    let limitNumber = parseInt(limit) || 10;
    pageNumber = Math.max(pageNumber, 1); // Ensure page number is at least 1
    limitNumber = Math.max(limitNumber, 1); // Ensure limit is at least 1

    const skip = (pageNumber - 1) * limitNumber;

    try {
        let query = {};

        if (searchQuery) {
            query.content = { $regex: searchQuery, $options: 'i' };
        }

        if (tags && Array.isArray(tags) && tags.length > 0) {
            query.tags = { $in: tags };
        }

        let sortOptions = {};

        if (sortBy === 'createdAt') {
            sortOptions.createdAt = 1;
        } else if (sortBy === '-createdAt') {
            sortOptions.createdAt = -1;
        }

        const filteredPosts = await Post.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json({ posts: filteredPosts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while searching and filtering posts' });
    }
}

//Controller for liking a post
async function likePost(req, res) {
    const postId = req.params.postId;
    const token = req.headers.authorization;

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.user_id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({ error: 'Post already liked by the user' });
        }

        post.likes.push(userId);

        await post.save();

        res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while liking the post' });
    }
}

// Controller for disliking a post
async function dislikePost(req, res) {
    const postId = req.params.postId;
    const token = req.headers.authorization;

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.user_id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (!post.likes.includes(userId)) {
            return res.status(400).json({ error: 'Post not liked by the user' });
        }

        post.likes = post.likes.filter((id) => id !== userId);

        await post.save();

        res.status(200).json({ message: 'Post disliked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while disliking the post' });
    }
}

// Controller for commenting on a post
async function commentOnPost(req, res) {
    const postId = req.params.postId;
    const token = req.headers.authorization;
    const { content } = req.body;

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.user_id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const comment = {
            author: userId,
            content
        };
        post.comments.push(comment);

        await post.save();

        res.status(200).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while commenting on the post' });
    }
}

async function getPostMetrics(req, res) {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const totalLikes = post.likes.length;
        const totalComments = post.comments.length;

        res.status(200).json({ likes: totalLikes, comments: totalComments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving post metrics' });
    }
}

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .exec();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a post by ID
const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
            .populate('author', 'username')
            .populate('comments.author', 'username')
            .exec();
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content: content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    commentOnPost,
    getPostMetrics,
    searchAndFilterPosts
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const Follow = require('../models/Follow');
const SECRET_KEY = 'newtonSchool';

// Controller to get users based on similar interests
const getRecommendedUsersByInterests = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    const userInterests = user.interests;
    const users = await User.find({
      _id: { $ne: userId },
      interests: { $in: userInterests },
    })
      .sort({ interests: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Controller to get users based on mutual followers/following
const getRecommendedUsersByMutualFollowers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    const followingIds = await Follow.find({ follower: userId }).distinct('following');

    const users = await User.find({
      _id: { $ne: userId },
      _id: { $in: followingIds },
    })
      .sort({ followers: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Controller to get users based on similar interests and mutual followers/following
const getRecommendedUsersByInterestsAndMutualFollowers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    const userInterests = user.interests;

    const followingIds = await Follow.find({ follower: userId }).distinct('following');

    const users = await User.find({
      _id: { $ne: userId },
      interests: { $in: userInterests },
      _id: { $in: followingIds },
    })
      .sort({ interests: -1, followers: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};


const getRecommendedPostsByInterests = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    const matchingPosts = await Post.find({ tags: { $in: user.interests } })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const postsWithMatchScore = matchingPosts.map((post) => {
      const matchScore = post.tags.filter((tag) => user.interests.includes(tag)).length;
      return { ...post._doc, matchScore };
    });

    const recommendedPosts = postsWithMatchScore.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json(recommendedPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getRecommendedPostsByFollowing = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    const followingIds = await Follow.find({ follower: userId }).distinct('following');

    const followingPosts = await Post.find({ author: { $in: followingIds } })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(followingPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getRecommendedPostsByInterestsAndFollowing = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.interests || user.interests.length === 0) {
      return res.status(400).json({ error: 'User interests not found' });
    }

    const matchingPosts = await Post.find({ tags: { $in: user.interests } })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const followingIds = await Follow.find({ follower: userId }).distinct('following');

    const followingPosts = await Post.find({ author: { $in: followingIds } })
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const recommendedPosts = [...matchingPosts, ...followingPosts];
    res.status(200).json(recommendedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getRecommendedUsersByInterests,
  getRecommendedUsersByMutualFollowers,
  getRecommendedUsersByInterestsAndMutualFollowers,
  getRecommendedPostsByInterests,
  getRecommendedPostsByFollowing,
  getRecommendedPostsByInterestsAndFollowing,
};
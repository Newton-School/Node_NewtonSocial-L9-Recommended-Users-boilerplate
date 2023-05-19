const express = require("express");

const {
    getRecommendedUsersByInterests,
    getRecommendedUsersByMutualFollowers,
    getRecommendedUsersByInterestsAndMutualFollowers,
    getRecommendedPostsByInterests,
    getRecommendedPostsByFollowing,
    getRecommendedPostsByInterestsAndFollowing,
} = require("../controllers/exploreControllers");

const router = express.Router();

router.get('/posts/', getRecommendedPostsByInterestsAndFollowing);
router.get('/posts/interests', getRecommendedPostsByInterests);
router.get('/posts/following', getRecommendedPostsByFollowing);
router.get('/users/', getRecommendedUsersByInterestsAndMutualFollowers);
router.get('/users/interests', getRecommendedUsersByInterests);
router.get('/users/followers', getRecommendedUsersByMutualFollowers);

module.exports = router;
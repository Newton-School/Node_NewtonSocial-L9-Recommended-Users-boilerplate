const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const Follow = require('../models/Follow');
const SECRET_KEY = 'newtonSchool';

// Controller to get users based on similar interests
/*
You need to implement a controller function called getRecommendedUsersByInterests that retrieves a list of recommended users based on the interests of the currently logged-in user. The function receives a request (req) and response (res) object, and it operates asynchronously.

The problem statement can be described as follows:

The getRecommendedUsersByInterests function takes in the page and limit parameters from the request query, which control the pagination of the results. It also expects the authorization header to contain a valid token.

The function starts by decoding the token using a secret key (SECRET_KEY) to extract the user ID (userId) from it. Then, it attempts to find the user with the extracted userId using the User model.

Next, the function retrieves the user's interests from the userInterests field of the found user. It uses these interests to search for other users who have at least one common interest with the logged-in user.

The query to find recommended users is performed using the User model, excluding the logged-in user's ID ($ne: userId) and matching their interests ($in: userInterests). The results are sorted in descending order based on the number of common interests (interests: -1), and the pagination is applied using the skip and limit methods.

Finally, a JSON response with the recommended users is sent back to the client.

If any error occurs during the execution of the function, it is caught in the catch block. The error is logged, and a JSON response with a 500 status code and an error message indicating a server error is sent back.


Sample Input:
Request Headers:
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
Request Query Parameters:
page: 1
limit: 5

Sample Output:
Status Code: 200
Response Body:
[  {    
    "_id": "user2",
    <user object>
    "interests": ["music", "books", "travel"]
  },
  {
    "_id": "user3",
    <user object>
    "interests": ["movies", "sports", "travel"]
  }
  ....
]

Possible Errors and Outputs:
If an error occurs during the process of retrieving users:
Status Code: 500
Response Body:
{
  "message": "Error retrieving users"
}
*/
const getRecommendedUsersByInterests = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.userId;
    //Write your code here
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Controller to get users based on mutual followers/following
/*
You need to implement a controller function called getRecommendedUsersByMutualFollowers that retrieves a list of recommended users based on mutual followers. The function receives a request (req) and response (res) object, and it operates asynchronously.

The problem statement can be described as follows:

The getRecommendedUsersByMutualFollowers function takes in the page and limit parameters from the request query, which control the pagination of the results. It also expects the authorization header to contain a valid token.

The function starts by decoding the token using a secret key (SECRET_KEY) to extract the user ID (userId) from it. Then, it attempts to find the user with the extracted userId using the User model.

Next, the function retrieves the user's following IDs by querying the Follow model for all documents where the follower field matches the userId, and then extracting the unique following IDs using the distinct method.

The function then queries the User model to find recommended users who are not the logged-in user (_id: { $ne: userId }) but have mutual followers (_id: { $in: followingIds }). The results are sorted in descending order based on the number of followers (followers: -1), and the pagination is applied using the skip and limit methods.

Finally, a JSON response with the recommended users is sent back to the client.

If any error occurs during the execution of the function, it is caught in the catch block. The error is logged, and a JSON response with a 500 status code and an error message indicating a server error is sent back.

Sample Input:
Request Headers:
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
Request Query Parameters:
page: 1
limit: 5

Sample Output:
Status Code: 200
Response Body:
[  {    
    "_id": "user2",
    <user object>
  },
  {
    "_id": "user3",
    <user object>
  }
  ....
]

Possible Errors and Outputs:
If an error occurs during the process of retrieving users:
Status Code: 500
Response Body:
{
  "message": "Error retrieving users"
}

*/
const getRecommendedUsersByMutualFollowers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
    //write your code here
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Controller to get users based on similar interests and mutual followers/following
/*

You need to implement a controller function called getRecommendedUsersByInterestsAndMutualFollowers that retrieves a list of recommended users based on both interests and mutual followers. The function receives a request (req) and response (res) object, and it operates asynchronously.

The problem statement can be described as follows:

The getRecommendedUsersByInterestsAndMutualFollowers function takes in the page and limit parameters from the request query, which control the pagination of the results. It also expects the authorization header to contain a valid token.

The function starts by decoding the token using a secret key (SECRET_KEY) to extract the user ID (userId) from it. Then, it attempts to find the user with the extracted userId using the User model.

Next, the function retrieves the user's interests from the userInterests field of the found user. It uses these interests to search for other users who have at least one common interest with the logged-in user.

The function then retrieves the user's following IDs by querying the Follow model for all documents where the follower field matches the userId, and then extracting the unique following IDs using the distinct method.

The function queries the User model to find recommended users who are not the logged-in user (_id: { $ne: userId }), have mutual followers (_id: { $in: followingIds }), and share at least one common interest (interests: { $in: userInterests }). The results are sorted in descending order based on the number of interests (interests: -1) and the number of followers (followers: -1), and the pagination is applied using the skip and limit methods.

Finally, a JSON response with the recommended users is sent back to the client.

If any error occurs during the execution of the function, it is caught in the catch block. The error is logged, and a JSON response with a 500 status code and an error message indicating a server error is sent back.

Sample Input:
Request Headers:
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
Request Query Parameters:
page: 1
limit: 5

Sample Output:
Status Code: 200
Response Body:
[  {    
    "_id": "user2",
    <user object>
  },
  {
    "_id": "user3",
    <user object>
  }
  ....
]

Possible Errors and Outputs:
If an error occurs during the process of retrieving users:
Status Code: 500
Response Body:
{
  "message": "Error retrieving users"
}
*/
const getRecommendedUsersByInterestsAndMutualFollowers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const token = req.headers.authorization;

  try {
   //Write your code here
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
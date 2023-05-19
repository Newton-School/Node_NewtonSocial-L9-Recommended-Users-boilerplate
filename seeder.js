const User = require('./models/User');
const users = require('./data/users');
const Post = require('./models/Post');
const posts = require('./data/posts');

async function seedWithDummyData() {
    try {
        // CLEAR DB
        await User.deleteMany({});
        await Post.deleteMany({});

        for (let user of users) {
            await User.create(user);
        }

        for (let post of posts) {
            await Post.create(post);
        }

        console.log(`users and posts seeded successfully`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData
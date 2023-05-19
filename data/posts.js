const posts = [
    {
        author: '611d21b94f74fd001f99a9a1',
        content: 'Post 1 content',
        likes: ['611d21b94f74fd001f99a9a2', '611d21b94f74fd001f99a9a3'],
        comments: [
            {
                author: '611d21b94f74fd001f99a9a2',
                content: 'Comment 1',
                createdAt: '2023-05-15T10:30:00.000Z'
            },
            {
                author: '611d21b94f74fd001f99a9a3',
                content: 'Comment 2',
                createdAt: '2023-05-16T09:45:00.000Z'
            }
        ],
        tags: ['web', 'fitness', 'coffee'],
        createdAt: '2023-05-14T08:00:00.000Z'
    },
    {
        author: '611d21b94f74fd001f99a9a2',
        content: 'Post 2 content',
        likes: ['611d21b94f74fd001f99a9a1'],
        comments: [
            {
                author: '611d21b94f74fd001f99a9a1',
                content: 'Comment 1',
                createdAt: '2023-05-17T11:00:00.000Z'
            }
        ],
        tags: ['coffee', 'cats'],
        createdAt: '2023-05-16T07:30:00.000Z'
    },
    {
        author: '611d21b94f74fd001f99a9a3',
        content: 'Post 3 content',
        likes: [],
        comments: [],
        tags: ['web', 'coffee', 'cats'],
        createdAt: '2023-05-13T12:15:00.000Z'
    },
    {
        author: '611d21b94f74fd001f99a9a1',
        content: 'Post 4 content',
        likes: ['611d21b94f74fd001f99a9a2', '611d21b94f74fd001f99a9a3'],
        comments: [
            {
                author: '611d21b94f74fd001f99a9a2',
                content: 'Comment 1',
                createdAt: '2023-05-12T13:45:00.000Z'
            },
            {
                author: '611d21b94f74fd001f99a9a3',
                content: 'Comment 2',
                createdAt: '2023-05-13T15:30:00.000Z'
            },
            {
                author: '611d21b94f74fd001f99a9a1',
                content: 'Comment 3',
                createdAt: '2023-05-14T16:15:00.000Z'
            }
        ],
        tags: ['fitness'],
        createdAt: '2023-05-11T14:00:00.000Z'
    },
    {
        author: '611d21b94f74fd001f99a9a3',
        content: 'Post 6 content',
        likes: ['611d21b94f74fd001f99a9a1'],
        comments: [
            {
                author: '611d21b94f74fd001f99a9a2',
                content: 'Comment 1',
                createdAt: '2023-05-09T16:45:00.000Z'
            },
            {
                author: '611d21b94f74fd001f99a9a3',
                content: 'Comment 2',
                createdAt: '2023-05-10T18:30:00.000Z'
            },
            {
                author: '611d21b94f74fd001f99a9a1',
                content: 'Comment 3',
                createdAt: '2023-05-11T20:15:00.000Z'
            }
        ],
        tags: ['tag3'],
        createdAt: '2023-05-08T17:00:00.000Z'
    }
];

module.exports = posts;
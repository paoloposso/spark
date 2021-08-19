const { makeSparkPost } = require('../../spark-posts/spark-post');

let existingPosts = [];

/**
 * 
 * @param {[]} posts 
 * @returns 
 */
const createSparkpostRepository = (posts) => { 
    existingPosts = posts;

    return () => ({
        getByName: async (name) => {
            const result = existingPosts.find(post => post.name === name);
            return result ? makeSparkPost(existingPosts.find(post => post.name === name)) : {};
        },
        insert: async ({ name, age }) => {
                return makeSparkPost({ name, age });
        },
        updateByName: async (name, { age }) => {
                return makeSparkPost({ name, age });
        },
    });
}

module.exports = { createSparkpostRepository };
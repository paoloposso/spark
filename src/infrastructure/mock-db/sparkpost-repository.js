const { makeSparkPost } = require('../../spark-posts/spark-post');

const createSparkpostRepository = () => ({
        getByName: async (name) => {
                return makeSparkPost({ age: 500, name });
        },
        insert: async ({ name, age }) => {
                return makeSparkPost({ name, age });
        },
        updateByName: async (name, { age }) => {
                return makeSparkPost({ name, age });
        },
});

module.exports = { createSparkpostRepository };
const { makeSparkPost } = require('../../spark-posts/spark-post');
const { SparkPostSchema } = require('./sparkpost-schema');

const createSparkpostRepository = () => ({
        getByName: async (name) => {
                const document = await SparkPostSchema.findOne({ name });
                if (document)
                        return makeSparkPost(document);
                else return {};
        },
        insert: async ({ name, age }) => {
                return makeSparkPost(await SparkPostSchema.create({ name, age }));
        },
        updateByName: async (name, { age }) => {
                return makeSparkPost(await SparkPostSchema.findOneAndUpdate({ name }, { age }, { new: true }));
        },
});

module.exports = { createSparkpostRepository };

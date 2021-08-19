const { createGetByName, createInsert, createUpdateByName } = require('../spark-posts/use-cases');
const { createSparkpostRepository } = require('../infrastructure/mock-db/sparkpost-repository');

const repo = createSparkpostRepository([{ name: 'paolo', age: 33 }])();

const insertPost = createInsert({ repo });
const updatePostByName = createUpdateByName({ repo });
const getPostByName = createGetByName({repo});

it('should create post', async () => {
    const result = await insertPost({ name: 'paolo', age: 33});

    expect(result).not.toBe('');
    expect(result).not.toBeUndefined();
});

it('should update post', async () => {
    const result = await updatePostByName('paolo', { age: 34});

    expect(result).not.toBe('');
    expect(result).not.toBeUndefined();
});

it('should get by name', async () => {
    const result = await getPostByName('paolo');

    expect(result).not.toBeUndefined();
    expect(result.name).toEqual('paolo');
});

it('should not find inexistent name', async () => {
    const result = await getPostByName('paolox');

    console.log(result);
    
    expect(result).not.toBeUndefined();
    expect(result.name).toBeUndefined();
});

it('should fail name validation in creation', async () => {
    try {
        await insertPost({ name: '', age: 33});
        fail('name validation should have failed')
    } catch (err) {
        expect(err.message).toContain('name');
    }
});

it('should fail age validation in creation', async () => {
    try {
        await insertPost({ name: 'aaa' });
        fail('age validation should have failed')
    } catch (err) {
        expect(err.message).toContain('age');
    }
});

it('should fail update validation', async () => {
    try {
        await updatePostByName('paolo', { });
        fail('age validation should have failed')
    } catch (err) {
        expect(err.message).toContain('age');
    }
});

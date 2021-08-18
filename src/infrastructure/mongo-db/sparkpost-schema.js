const mongoose = require('mongoose');
const { Schema } = mongoose;

const sparkPostSchema = new Schema({
    name: { type: String, required: true, unique: false },
    age: { type: String, required: true },
});

sparkPostSchema.virtual('id').get(function() {
    return this._id.toString();
});

sparkPostSchema.methods.toJSON = function () {
    const model = this;
    
    let sparkpostObj = model.toObject();
    sparkpostObj.id = sparkpostObj._id;
    delete sparkpostObj._id;
    
    return sparkpostObj;
};

sparkPostSchema.index({ name: 1 }, { unique: true } );

const SparkPostSchema = mongoose.model('SparkPost', sparkPostSchema);

module.exports = { SparkPostSchema };
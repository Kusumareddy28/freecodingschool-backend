const mongoose = require('mongoose');
module.export = roles = ["TEACHER", "STUDENT","VOLUNTEER"];
module.export = userSchema = new mongoose.Schema({
    email: { type: String, required: true ,lowercase: true,trim:true},
    first_name: { type: String, required: true,trim:true },
    last_name: { type: String, required: false,trim:true },
    password: { type: String, required: true ,trim:true},
    is_verified: { type: Boolean, required: true ,default:true},
    target: {
        role: { type: String, enum: roles }
    }    
},{timestamps: true});
module.exports = user = mongoose.model('user',userSchema);

module.exports.getUserByQuery = async (query,callback) => {
	const result = await user.findOne(query);
    return result;
}
module.exports.getUserById = (query,callback) => {
	user.findOne({_id: parseInt(query)},callback);
}
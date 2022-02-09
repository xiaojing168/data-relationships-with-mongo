const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb://localhost:27017/tweets')
.then(()=>{
    console.log('Mongo connection open!!!')
}).catch(err=>{
    console.log('Oh no mongo connection error!!')
    console.log(err)
})
const userSchema = new Schema({
    username: String,
    age: Number
})
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async() =>{
//     const user = new User({username:'Jing', age:99});
//     const tweet1 = new Tweet({text:'I from China',likes:168});
//     tweet1.user = user;
//     user.save();
//     tweet1.save();
// }
// makeTweets();

const findTweet = async()=>{
    const t =await Tweet.find({}).populate('user','username');
    console.log(t)
}
findTweet();

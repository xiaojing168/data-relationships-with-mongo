const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb://localhost:27017/farmdb')
.then(()=>{
    console.log('Mongo connection open!!!')
}).catch(err=>{
    console.log('Oh no mongo connection error!!')
    console.log(err)
})


const productSchema = new Schema({
    name: String,
    price: String,
    season:{
        type:String,
        enum: [ 'Spring','Summer','Fall','Winter']
    }
})

const farmSchema = new Schema({
    name: String,
    city: String,
    products:[{type: Schema.Types.ObjectId, ref: 'Product'}]
})


const Product = mongoose.model('Product',productSchema);
const Farm = mongoose.model('Farm',farmSchema);

// Product.insertMany([
//     {name:'Goddess Melon', price:4.99, season:'Summer'},
//     {name:'Papper', price:2.99, season:'Summer'},
//     {name:'Cabbage', price:0.99, season:'Spring'}
// ])

const makeFarm = async()=>{
    const farm = await new Farm({ name:'Big Farm',city:'Lakewood,OH'});

    const melon = await Product.findOne({name: 'Goddess Melon'})
    farm.products.push(melon)
    await farm.save()
   
}
makeFarm();
// const addProduct = async()=>{
//     const farm = await farm.find 
// }

Farm.findOne({name:'Big Farm'})
.populate('products')
.then(farm=>{
    console.log(farm)
})

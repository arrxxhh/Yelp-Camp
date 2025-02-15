const mongoose = require('mongoose');
const Campground=require('../models/campground');
const cities= require('./cities');
const {places, descriptors} = require('./seedhelpers');

//mongoose connection
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    // depreceated now dont need 
    // useNewUrlParser:true,
    // useCreateIndex:true, depreciated because mongoose now creates indexes itself latest@mongodb
    // useUnifiedTopology:true
});

//database connection
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random500=Math.floor(Math.random()*cities.length);

        const camp = new Campground({
            location: `${cities[random500].city},${cities[random500].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});

const express=require('express');
const app = express();
const path =require('path');
const mongoose = require('mongoose');
const campground=require('./models/campground')
//mongoose connection
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    // useCreateIndex:true, depreciated because mongoose now creates indexes itself latest@mongodb
    useUnifiedTopology:true
});

//database connection
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/makecampground',async(req,res)=>{
    const camp = new campground({title:'My Backyard',description:'cheap camping'});
    await camp.save();
    res.send(camp)
})
app.listen(4000,()=>{
    console.log('Serving on port 4000')
})
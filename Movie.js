const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
    name: {

    },
    country: {

    },
    date: {
        
    },
    gener: {

    },
    access: {

    }
})

mongoose.model('movies', Movie);
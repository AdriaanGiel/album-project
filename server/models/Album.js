const mongoose = require('mongoose');
const config = require("../config");


const album = new mongoose.Schema({
    title: {
        type: String,
        dropDubs: true,
        required: [true, 'Title is required']
    },
    artist: {
        type: String,
        required: [true, 'Artist is required']
    },
    songs: {
        type: String,
        required: [true, 'Songs is required']
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required']
    },
    released: {
        type: String,
        required: [true, 'Release date is required']
    },
    _links:{
        self:{
            href: String,
        },
        collection:{
            href: {
                type: String,
                default: config.siteUri + "/albums"
            }
        },
    }
});

album.pre('save', function(next) {
    this._links.self.href = this._links.collection.href + "/" + this.id;
    next();
});

// album.pre('update', function(){
//     this._links.collection.href = `${config.siteUri}/albums`;
//     this._links.self.href = `${this._links.collection.href}/${this.id}`;
// });

module.exports = mongoose.model('Album',album);
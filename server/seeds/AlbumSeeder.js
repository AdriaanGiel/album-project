const faker = require('faker');
const Album = require('../models/Album');
const Seeder = require('./Seeder');

module.exports = async (mongoose) => {

    // Empty seed array
    let seeds = [];

    // A loop to create multiple objects
    for(let i = 0; i < 20; i++)
    {
        seeds.push({
            title: faker.company.catchPhrase(),
            artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
            songs: `${faker.random.number()}`,
            publisher: faker.company.companyName(),
            released: `${faker.date.past()}`
        })
    }

    // Send objects to seeder
    Seeder(Album,seeds,mongoose);

};

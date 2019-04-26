module.exports = async (model,items,mongoose) => {
    mongoose.then((mon) => {
        // Check if send model already exist within database
        mon.connection.db.listCollections().toArray().then((arr) => {
            // Create array of collection currently in databse
            let collections = arr.map((col) => {
                return col.name;
            });

            // If model does not match with a existing collection; seed it
            if(!collections.includes(model.collection.name)){
                for(let item of items)
                {
                    model.create(item);
                }

                // Show in terminal that model has been seeded
                console.log(`Seeded ${model.collection.name} succesfully`);
            }
        });
    });

};
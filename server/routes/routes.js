module.exports = (app) => {

    // Set options for resource Album
    app.options('/albums', function (req, res, next) {
        res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.header('Allow', 'POST,GET,OPTIONS');
        return res.status(200).json({});
    });

    // Set options for resource Album detail
    app.options('/albums/:id', function (req, res, next) {
        res.header('Access-Control-Allow-Methods', 'PUT,DELETE,GET,OPTIONS');
        res.header('Allow', 'PUT,DELETE,GET,OPTIONS');
        return res.status(200).json({});
    });

    // Route to a static html
    app.get('/', (req, res) => {
        console.log(__dirname);
        res.sendFile('../index.html', {root: __dirname});
    });

    // All REST routes for resource Album
    app.get('/albums', getController("Albums").index);
    app.post('/albums', getController("Albums").insert);
    app.get('/albums/:id', getController('Albums').show);
    app.put('/albums/:id', getController('Albums').update);
    app.delete('/albums/:id', getController('Albums').destroy);
};

/**
 * Function to get a controller path
 * @param controller
 * @param prefix
 */
function getController(controller, prefix = "") {
    return require("../controllers/" + prefix + controller + "Controller");
}
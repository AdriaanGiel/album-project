const Album = require('../models/Album');
const config = require("../config");
const ErrorHandler = require('../helpers/ErrorHandler');


const Pagination = require('../helpers/Pagination');

/**
 *  Album Controller
 */
class AlbumsController{
    /**
     * Method to show all albums
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async index(req, res) {

        let limitParam = Number(req.query.limit);
        let startParam = Number(req.query.start);
        let count = await Album.countDocuments();

        if(!isNaN(startParam) && startParam > count){
            res.status(400);
            return res.json({error: "start is out of range"});
        }

        let limit = (!isNaN(limitParam) && limitParam > 0 && limitParam <= count) ? limitParam : 0;
        let start = (!isNaN(startParam) && startParam > 0) ? startParam : 1;

        ErrorHandler.handleTryAndCatch(async () => {
            let albums = await Album.find({},'id title artist songs publisher released _links')
                .sort([['_id', -1]])
                .skip(start - 1)
                .limit(limit);

            res.setHeader('Content-Type', 'application/json');
            res.send({
                items: albums,
                _links: {self: {href:`${config.siteUri}/albums`}},
                pagination: Pagination.getPagination(count,start,limit,`${config.siteUri}/albums`)
            });
        }, res);

    }

    /**
     * Method to get a single Album
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async show(req, res) {

        let id = req.params.id;

        ErrorHandler.handleTryAndCatch(async () => {
            let album = await Album.findById(id,'id title artist songs publisher released _links');

            if(!album){
                return res.status(404).json({message: "resource not found" });
            }
            res.setHeader('Content-Type', 'application/json');
            return res.send(album)
        },res);
    }

    /**
     * Method to insert new Album in database
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async insert(req, res, next) {
        let data = {
            title: req.body.title,
            artist: req.body.artist,
            songs: req.body.songs,
            publisher: req.body.publisher,
            released: req.body.released
        };

        ErrorHandler.handleTryAndCatch(async () => {
            let album = await Album.create(data);
            return res.status(201).json(album);
        }, res);
    }

    /**
     * Method to update a existing Album
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async update(req, res) {
        let id = req.body.id;
        let data = req.body;

        if(!id){
            id = req.params.id;
        }

        let requiredFields = ['title', 'artist', 'songs', 'publisher', 'released'];
        let errors = [];
        for(let field of requiredFields){
            if(!data[field]){
                errors.push(field);
            }
        }

        if(errors.length){
            return res.status(400).json({message:'You are missing a required field'})
        }

        ErrorHandler.handleTryAndCatch(async () => {
            let album = await Album.findOneAndUpdate({_id:id}, data,{
                'new': true,
                fields: {id:1,title:1,artist:1,songs:1,publisher:1,released:1,_links:1},
                runValidators: true
            },(err,album) => {
                console.log("error", err);
            });

            return res.status(200).json({data: album});
        }, res);

    }

    /**
     * Method to delete existing Album
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async destroy(req, res) {
        let id = req.body.id;

        if(!id){
            id = req.params.id;
        }

        ErrorHandler.handleTryAndCatch(async () => {
            let removed = await Album.findOneAndDelete({_id:id});
            return res.status(204).json({removed: removed});
        }, res);

    }

    /**
     * Method to generate pagination uri strings
     * @param itemStart
     * @param itemLimit
     * @param totalItems
     * @param req
     * @returns {{page: number, href: string}}
     */
    static generatePaginationLinks(itemStart,itemLimit,totalItems,req){

        let currentPage = (itemLimit <= 0) ? 1 : Math.ceil(itemStart / itemLimit);
        let href = `${config.siteUri}/albums`;

        if(req.originalUrl.includes("limit"))
        {
            href = `${config.siteUri}/albums?start=${(itemStart > 1) ? (itemStart >= totalItems) ? totalItems - itemLimit : itemStart : 1}&limit=${itemLimit > 0 && itemLimit}`;
        }

        currentPage = Math.ceil(Math.ceil(currentPage));
        return {
            page: (currentPage <= 0) ? 1 : currentPage,
            href: href
        }
    }

    /**
     * Method to generate pagination
     * @param totalItems
     * @param pages
     * @param itemStart
     * @param itemLimit
     * @param req
     * @returns {{currentPage: number, currentItems: number, totalPages: number, totalItems: *, _links: {first: {page: number, href: string}, last: {page: number, href: string}, previous: {page: number, href: string}, next: {page: number, href: string}}}}
     */
    static generatePagination(totalItems,pages,itemStart,itemLimit,req){

        let currentPage = (itemLimit !== 0) ? Math.ceil(itemStart / itemLimit) : 1;

        let currentItems = (((totalItems - itemStart) - itemLimit ) <= 0) ? (totalItems - itemStart) + 1 : (itemLimit === 0) ? totalItems : itemLimit;

        let lastPage = {
            page: Math.ceil(pages),
            href: `${config.siteUri}/albums`
        };

        if(itemLimit > 0){
            lastPage = {
                page: Math.ceil(pages),
                href: `${config.siteUri}/albums?start=${(totalItems - itemLimit) + 1}&limit=${itemLimit}`
            };
        }

        return {
            currentPage: currentPage,
            currentItems: currentItems,
            totalPages: Math.ceil(pages),
            totalItems: totalItems,
            _links:{
                first:      AlbumsController.generatePaginationLinks(1,itemLimit,totalItems,req),
                last:       lastPage,
                previous:   AlbumsController.generatePaginationLinks(itemStart - itemLimit,itemLimit,totalItems,req),
                next:       AlbumsController.generatePaginationLinks(itemStart + itemLimit,itemLimit,totalItems, req),
            }
        }
    }
}


// Export AlbumsController to use in routes
module.exports = new AlbumsController();
/**
 * Pagination class
 */
class Pagination {
    /**
     * Method to get items on a page
     * @param total
     * @param start
     * @param limit
     * @returns {*}
     */
    currentItems(total,start,limit){
        let current = start + limit;

        if(current > total){
            return total - (current - limit) + 1;
        }
        return (this.limitCheck(limit)) ? total : limit;
    }

    /**
     * Method to get total pages
     * @param total
     * @param start
     * @param limit
     * @returns {number}
     */
    numberOfPages(total,start,limit) {
        if(this.limitCheck(limit)){
            return 1
        }
        return Math.ceil(total/limit);
    }

    /**
     * Method to get the page user is currently on
     * @param total
     * @param start
     * @param limit
     * @returns {number}
     */
    currentPage(total,start,limit){

        if(this.limitCheck(limit)){
            return 1;
        }

        let totalPages = total / limit;
        let pages = (total - start) / limit;

        console.log("calc", Math.ceil(totalPages - pages))

        return Math.ceil(totalPages - pages);
    }

    /**
     * Method to get the start and limit for the first page uri
     * @param total
     * @param start
     * @param limit
     * @returns {*[]}
     */
    getFirstQueryString(total,start,limit){
        return [1, limit];
    }

    /**
     * Method to get the start and limit for the last page uri
     * @param total
     * @param start
     * @param limit
     * @returns {*[]}
     */
    getLastQueryString(total,start,limit){
        let newStart = start + limit;

        // if(newStart >= total){
        // }

        total += limit - 1;

        return [(total - limit) + 1, limit];
    }

    /**
     * Method to get the start and limit for the previous page uri
     * @param total
     * @param start
     * @param limit
     * @returns {*[]}
     */
    getPreviousQueryString(total,start,limit){

        let newStart = start - limit;
        if(newStart <= 0){
            return [1,limit]
        }

        return [newStart,limit];
    }

    /**
     * Method to get the start and limit for the next page uri
     * @param total
     * @param start
     * @param limit
     * @returns {*[]}
     */
    getNextPreviousQueryString(total,start,limit){
        let newStart = start + limit;

        if(newStart >= total){
            total += limit;
            return [total - limit, limit];
        }

        return [newStart,limit];
    }

    /**
     * Method to create full pagination
     * @param total
     * @param start
     * @param limit
     * @param base
     * @returns {{currentPage: number, currentItems: *, totalPages: number, totalItems: *, _links: {first: {page: number, href: string}, last: {page: number, href: string}, previous: {page: number, href: string}, next: {page: number, href: string}}}}
     */
    getPagination(total,start,limit,base){

        let currentPage = this.currentPage(total,start,limit);
        let totalPages = this.numberOfPages(total,start,limit);
        let nextPage = ((currentPage + 1) >= totalPages) ? totalPages : currentPage + 1;
        let previousPage = ((currentPage - 1) <= 0) ? 1 : currentPage - 1;

        return {
            currentPage: currentPage,
            currentItems: this.currentItems(total,start,limit),
            totalPages: totalPages,
            totalItems: total,
            _links:{
                first:{
                    page: 1,
                    href: `${base + this.getUri(...this.getFirstQueryString(total,start,limit))}`
                },
                last:{
                    page: totalPages,
                    href: `${base + this.getUri(...this.getLastQueryString(total,start,limit))}`
                },
                previous:{
                    page: previousPage,
                    href: `${base + this.getUri(...this.getPreviousQueryString(total,start,limit))}`
                },
                next:{
                    page: nextPage,
                    href: `${base + this.getUri(...this.getNextPreviousQueryString(total,start,limit))}`
                }
            }
        }

    }

    /**
     * Recursive method to get items on the last page
     * @param start
     * @param limit
     * @param total
     * @returns {*}
     */
    getCurrentItemsLastPage(start,limit,total) {
        let current = start + limit;

        if(current => total){
            return total - (current - limit);
        }
        return getCurrentItems(current,limit,total);
    }

    /**
     * Method to make uri string from start and limit
     * @param start
     * @param limit
     * @returns {string}
     */
    getUri(start,limit) {
        if(limit === 0){
            return "";
        }
        return `?start=${start}&limit=${limit}`;
    }

    limitCheck(limit){
        return limit === 0;
    }
}
// Export Pagination class
module.exports = new Pagination();
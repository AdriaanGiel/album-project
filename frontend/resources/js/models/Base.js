import Api from './Api';
import pluralize from 'pluralize';

export default class Base{

    constructor()
    {

    }

    static async pagination(url)
    {
        return await Api().get(url);
    }

    static async paginationLimit(limit)
    {
        return await Api().get('/' + pluralize(this.name.toLowerCase()) + `?limit=${limit}`);
    }

    static async paginationStartAndLimit(start,limit)
    {
        return await Api().get('/' + pluralize(this.name.toLowerCase()) + `?start=${start}&limit=${limit}`);
    }

    static async all(){
        return await Api().get('/' + pluralize(this.name.toLowerCase()));
    }

    static async find($id)
    {
        return await Api().get('/' + pluralize(this.name.toLowerCase()) + '/' + $id);
    }

    static async create($data)
    {
        return await Api().post('/' + pluralize(this.name.toLowerCase()),$data);
    }

    static async update($id,$data)
    {
        console.log($data);
        return await Api().put('/' + pluralize(this.name.toLowerCase()) + '/' + $id,$data,{
            headers: {'Content-Type': 'application/json',}
        });
    }

    static async delete($id)
    {
        return await Api().delete('/' + pluralize(this.name.toLowerCase()) + '/' + $id);
    }

}

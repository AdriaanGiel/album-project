/**
 * A test base model class
 */
export default class Model{

    constructor($fillable)
    {
        this.fillable = $fillable;
    }

    massAssignmentProtection()
    {
        console.log(this.fillable);
    }


}
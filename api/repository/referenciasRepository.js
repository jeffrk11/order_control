const DB = require('../db/db.js')

module.exports = {
    //get one by id
    findById: function(id){
        return DB.get('referencias').find(e => {
            return e.id === id
        })
    }
}
const path = require('path');
const tags = require('../model/tags');

const getTags = async (tagsToReturn) =>{

        let results = {};
        const tagsNeeded = await tags.find({tag:tagsToReturn}).exec();
       
        if(!tagsNeeded) return 'error';
        
        for(i=0;i<tagsNeeded.length;i++){
            results[tagsNeeded[i]['tag']] = tagsNeeded[i]['code'];
        }
    return results;

}

module.exports = getTags;

const path = require('path');

export default class ResourceUtils {

    constructor(){}
    
    static getResourceFilePath(name){
        return  path.join(__dirname + './resources', name);
    }

    static getResourceDir(){
        return __dirname + './resources';
    }
}
module.exports = {
    userNames : [],
    userList : {},
    isInclude : function(name){
        if(this.userNames.includes(name)){
            return true;
        }
        return false;
    },
    insertUser : function(id,name){
        if(!this.isInclude(name)){
            this.userNames.push(name);
            this.userList[id] = name;
            return true;
        }
        return false;
    },
    findName : function(id){
        return this.userList[id];
    },
    deleteUser : function(id){
        delete this.userList[id];
    }
};

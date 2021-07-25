var users = require("./storage/users");

console.log(users.isInclude("易汇东"));
users.insertUser("15674560316","易汇东");
users.insertUser("147","yhd");
users.insertUser("148","王俊");
console.log(users.isInclude("易汇东"));
console.log(users.findName("147"));

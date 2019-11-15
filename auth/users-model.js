const db = require("../database/dbConfig");


function find() {
    return db("users").select("id", "username", "password");
}

function findBy(filter) {
    return db("users").where(filter);
}

function add(user) {
    return db("users")
    .insert(user, "id")
    .then(ids => {
        const [id] = ids;
        return findById(id);
    });
}


module.exports = {
    add,
    find,
    findBy
};
const {databaseConnection} = require("../config/database");

let database = databaseConnection("allaboutcats.db");


const getUsers = () =>{
    return new Promise((resolve,reject)=>{

        database.all(`SELECT * FROM users`,[],(err,row)=>{
            if(err){
                reject(err);
                throw new Error(err);
            }
            if(row){
               return resolve(row);
            }
            return row;
        })
    })
    
}

const getUser = (userID) =>{
    return new Promise((resolve,reject)=>{
        database.each(`SELECT * FROM users WHERE userID=?`,[userID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            console.log(row);
            return resolve(row);
        })
    })
}

const getCat = (catID) =>{
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM cats WHERE catID=?`,[catID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const getUserCat = (userID) =>{
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM cats WHERE userID=?`,[userID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const loginUser = (email,password) =>{
    return new Promise((resolve,reject)=>{
        database.get("SELECT * FROM users WHERE email=?",[email],(err,row)=>{
            if(err){
                return resolve(false);
            }
            if(row){
                if(row.password == password){
                    return resolve(row);
                }else{
                    return resolve(false);
                }    
            }else{
                return resolve(false);
            }
            
        })
    })
}

const getUserWithCat = (userID) => {
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM cats WHERE userID=?`,[userID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const getExpenses = (catID) => {
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM expenses WHERE catID=?`,[catID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const getFoods = (catID)=>{
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM food WHERE catID=?`,[catID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const getHygiene = (catID)=>{
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM hygiene WHERE catID=?`,[catID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const getVaccines = (catID)=>{
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM vaccines WHERE catID=?`,[catID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const getActivities = (catID)=>{
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM activities WHERE catID=?`,[catID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}

const getFeedingTimeHours = (catID)=>{
    return new Promise((resolve,reject)=>{
        database.all(`SELECT * FROM feedingTime WHERE catID=?`,[catID],(err,row)=>{
            if(err){
                throw new Error(err);
            }
            return resolve(row);
        })
    })
}


module.exports = {
    getActivities,
    getCat,
    getExpenses,
    getFoods,
    getHygiene,
    getUser,
    getVaccines,
    loginUser,
    getUsers,
    getUserWithCat,
    getUserCat,
    getFeedingTimeHours
}
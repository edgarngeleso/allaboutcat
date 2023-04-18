const {databaseConnection} = require("../config/database");

const database = databaseConnection("allaboutcats.db");

const updatePassword = (userID,newPassword) =>{
    return new Promise((resolve,reject)=>{
    database.run(`UPDATE users SET password=? WHERE userID=?`,[newPassword,userID],(err)=>{
                    if(err){
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
}

const updateCat = (catName,catBirthday,catGender,catID) =>{
    return new Promise((resolve,reject)=>{
    database.run(`UPDATE cats 
                    SET catName=?,catBirthday=?,catGender=? 
                    WHERE catID=?`,[catName,catBirthday,catGender,catID],(err)=>{
                    if(err){
                        return resolve(false);
                    }
                    return resolve(true);
                })
    })
   
}

module.exports = {
    updateCat,
    updatePassword
}
const {databaseConnection} = require("../config/database");

const database = databaseConnection("allaboutcats.db");

const user = ["Edgar","Ngeleso","edgarngereso@gmail.com","0712345678","Here","OOH","Here","Here","01234","1234"];

const addUser = (user) =>{
    return new Promise((resolve,reject)=>{
        database.run(`INSERT 
                INTO users(firtsName,lastName,email,phoneNumber,address,aptNumber,city,state,zipCode,password) 
                VALUES(?,?,?,?,?,?,?,?,?,?)`,user,(err)=>{
                    if(err){
                        console.log(err)
                        return resolve(false);
                    }

                    return resolve(true);
                })
        
    })
    
}

const addCat = (cat) =>{
    return new Promise((resolve,reject)=>{
        database.run(`INSERT 
                    INTO cats(userID,catName,catBirthday,catGender,catAmountOfWater) 
                    VALUES(?,?,?,?,?)`,cat,(err)=>{
                        if(err){
                            return resolve(false);
                        }
                        return resolve(true);
                    })
    })
}

const addFood = (catID,foodName,foodTime) =>{
    return new Promise((resolve,reject)=>{
        database.run(`INSERT 
                    INTO food(catID,activity,time,date) 
                    VALUES(?,?,?,?)`,[catID,foodName,foodTime,(new Date(Date.now()).toString())],(err)=>{
                        if(err){
                            return resolve(false);
                        }
                        return resolve(true);
                    })
            })
}

const addActivity = (catID,activityName,activityStartTime,activityEndTime) =>{
    return new Promise((resolve,reject)=>{
    database.run(`INSERT 
                INTO activities(catID,activity,time,activityEndTime,date) 
                VALUES(?,?,?,?,?)`,[catID,activityName,activityStartTime,activityEndTime,(new Date(Date.now()).toString())],(err)=>{
                    if(err){
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
}

const addVaccine = (catID,vaccineName,vaccineDate) =>{
    return new Promise((resolve,reject)=>{
    database.run(`INSERT 
                INTO vaccines(catID,activity,time,date) 
                VALUES(?,?,?,?)`,[catID,vaccineName,vaccineDate,(new Date(Date.now()).toString())],(err)=>{
                    if(err){
                        console.log(err)
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
}

const addHygiene = (catID,hygieneNote,hygieneDate) =>{
    return new Promise((resolve,reject)=>{
    database.run(`INSERT 
                INTO hygiene(catID,activity,time,date) 
                VALUES(?,?,?,?)`,[catID,hygieneNote,hygieneDate,(new Date(Date.now()).toString())],(err)=>{
                    if(err){
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
}

const addExpense = (catID,expenseName,expenseCost) =>{
    return new Promise((resolve,reject)=>{
    database.run(`INSERT 
                INTO expenses(catID,activity,cost,date) 
                VALUES(?,?,?,?)`,[catID,expenseName,expenseCost,(new Date(Date.now()).toString())],(err)=>{
                    if(err){
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
}

const addFeedingTime = (catID,feedingTime) =>{
    return new Promise((resolve,reject)=>{
    database.run(`INSERT 
                INTO feedingTime(catID,feedingTime) 
                VALUES(?,?)`,[catID,feedingTime],(err)=>{
                    if(err){
                        return resolve(false);
                    }
                    return resolve(true);
                })
            })
}

module.exports = {
    addActivity,
    addCat,
    addExpense,
    addHygiene,
    addUser,
    addVaccine,
    addFood,
    addFeedingTime
}

/*mydatabase.run("UPDATE users SET city=? WHERE userID=?",["Nairobi",1],(err)=>{
    if(err)throw new Error(err);
    console.log("updated");
});

mydatabase.run("DELETE FROM users WHERE userID=?",[2],(err)=>{
    if(err)throw new Error(err)
});*/
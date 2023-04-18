const fs = require("fs");
const sqlite3 = require("sqlite3");

const databaseConnection = (filePath)=>{
    if(fs.existsSync(filePath)){
        return new sqlite3.Database(filePath);
    }
    const db = new sqlite3.Database(filePath,(err)=>{
        if(err)throw new Error(err);
        createUsersTable(db);
        createCatsTable(db);
        createCategoriesTable(db);
        createActivitiesTable(db);
        createExpensesTable(db);
        createFoodTable(db);
        createHygieneTable(db);
        createVaccinesTable(db);
        createFeedingTimeTable(db);
    })
    console.log("Success");
    return db;
}

const createUsersTable = (db)=>{
    return db.exec(`
            CREATE TABLE users(
                userID INTEGER PRIMARY KEY AUTOINCREMENT,
                firtsName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phoneNumber VARCHAR(100) NOT NULL,
                address VARCHAR(100) NOT NULL,
                aptNumber VARCHAR(100) NOT NULL,
                city VARCHAR(100) NOT NULL,
                state VARCHAR(100) NOT NULL, 
                zipCode VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            `);
}

const createCatsTable = (db)=>{
    return db.exec(`
    CREATE TABLE cats(
        catID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        userID INTEGER NOT NULL,
        catName VARCHAR(100) NOT NULL,
        catBirthday VARCHAR(100) NOT NULL,
        catGender VARCHAR(100) NOT NULL, 
        catAmountOfWater VARCHAR(100) NOT NULL 
    );
    `);
}

const createCategoriesTable = (db)=>{
    return db.exec(`
    CREATE TABLE categories(
        categoryID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        categoryName VARCHAR(100) NOT NULL
    );
    `);
}

const createFeedingTimeTable = (db)=>{
    return db.exec(`
    CREATE TABLE feedingTime(
        feedingTimeID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        catID INTEGER NOT NULL,
        feedingTime VARCHAR(1000) NOT NULL
    );
    `);
}

const createHygieneTable = (db)=>{
    return db.exec(`
    CREATE TABLE hygiene(
        hygieneID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        catID INTEGER NOT NULL,
        activity VARCHAR(1000) NOT NULL,
        time VARCHAR(100) NOT NULL
    );
    `);
}

const createFoodTable = (db)=>{
    return db.exec(`
    CREATE TABLE food(
        foodID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        catID INTEGER NOT NULL,
        activity VARCHAR(100) NOT NULL,
        time VARCHAR(100) NOT NULL
    );
    `);
}

const createActivitiesTable = (db)=>{
    return db.exec(`
    CREATE TABLE activities(
        activityID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        catID INTEGER NOT NULL,
        activity VARCHAR(100) NOT NULL,
        time VARCHAR(100) NOT NULL,
        activityEndTime VARCHAR(100)
    );
    `);
}

const createExpensesTable = (db)=>{
    return db.exec(`
    CREATE TABLE expenses(
        expenseID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        catID INTEGER NOT NULL,
        activity VARCHAR(100) NOT NULL,
        cost VARCHAR(100) NOT NULL
    );
    `);
}

const createVaccinesTable = (db)=>{
    return db.exec(`
    CREATE TABLE vaccines(
        vaccineID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        catID INTEGER NOT NULL,
        activity VARCHAR(100) NOT NULL,
        time VARCHAR(100) NOT NULL
    );
    `);
}


module.exports = {
    databaseConnection
}
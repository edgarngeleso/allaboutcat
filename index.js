const fs = require("fs");
const express = require("express");
const cors = require("cors");
const multer = require("multer")();

const {databaseConnection} = require("./config/database");
const { loginUser, getUser, getUsers, getCat, getHygiene, getActivities, getExpenses, getFoods, getVaccines, getUserWithCat } = require("./queries/GetQueries");
const { addUser, addCat, addHygiene, addActivity, addExpense, addVaccine, addFood } = require("./queries/InsertQueries");
const { updatePassword } = require("./queries/UpdateQueries");
const db = databaseConnection("allaboutcats.db");



const app = express()

app.use(cors());


app.get("/",(req,res)=>{
    return res.json({error:false,message:"Hurray! Server running."})
})

//Auth
app.post("/login",async(req,res)=>{
    let user = await loginUser(req.query.email,req.query.password);
    console.log(user)
    if(user){
        let hasRegistered = false;
        let usercats = await getUserWithCat(user.userID);
        console.log(usercats);
        if(usercats.length>0){
            hasRegistered = true;
        }
        return res.json({hasRegistered,error:false,data:user});
    }
    return res.json({error:true,data:[]})
});

app.post("/register",multer.any(),async (req,res)=>{
    let user = [req.query.firstName,
                req.query.lastName,
                req.query.email,
                req.query.phoneNumber,
                req.query.address,
                req.query.aptNumber,
                req.query.city,
                req.query.state,
                req.query.zipCode,
                req.query.password
                ];

    const a = await addUser(user);
    console.log(a)
    if(await addUser(user)){
        
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Unable to add user."});
});

app.get("/user/:id",async (req,res)=>{
    const user = await getUser(req.params.id);
    return res.json({user});
})

app.post("/change-password",async (req,res)=>{
    if(await updatePassword(req.query.userID,req.query.newPassword)){
     return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Unable to update password."});
})

//Cat profile
app.post("/add-cat",(req,res)=>{
    const cat = [
        req.query.userID,
        req.query.catName,
        req.query.catBirthday,
        req.query.catGender,
        req.query.catAmountOfWater
    ]

    if(addCat(cat)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Unable to add cat."});
})

app.get("/cat-profile/id",async (req,res)=>{
    const catID = req.params.id;
    const cat = await getCat(catID);
    if(cat){
        return res.json({error:false,data:cat});
    }
    return res.json({error:true,data:[]})
})

app.get("/cats/:userID",async (req,res)=>{
    const cat = await getCat(req.params.userID);
    if(cat){
        return res.json({error:false,data:cat});
    }
    return res.json({error:true,data:[]})
})
//Categories

app.get("/categories/:catID",async (req,res)=>{
    const categoryData = [
        {
            categoryName:"Expenses",
            items:await getExpenses(req.params.catID),
            url:"expenses"
        },
        {
            categoryName:"Hygiene and care",
            items:await getHygiene(req.params.catID),
            url:"hygiene"
        },
        {
            categoryName:"Food",
            items:await getFoods(req.params.catID),
            url:"food"
        },
        {
            categoryName:"Activities",
            items:await getActivities(req.params.catID),
            url:"activities"
        },
        {
            categoryName:"Vaccine",
            items:await getVaccines(req.params.catID),
            url:"vaccine"
        },
    ];
    return res.json({categoryData});
})




//hygiene
app.post("/hygiene",async (req,res)=>{
    if(await addHygiene(req.query.catID,req.query.hygieneNote,req.query.hygieneTime)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/hygiene/:catID",async (req,res)=>{
    const hygiene = await getHygiene(req.params.catID);
    return res.json({hygiene});
})


//activities
app.post("/activity",async (req,res)=>{
    if( await addActivity(req.query.catID,
                        req.query.activityName,
                        `${req.query.activityStartTime??"0600hrs"} - ${req.query.activityEndTime??"1200hrs"}`,
                        req.query.activityEndTime??"1200hrs")){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/activities/:catID",async (req,res)=>{
    const activities = await getActivities(req.params.catID);
    return res.json({activities});
})


//expenses
app.post("/expense",async(req,res)=>{
    if(await addExpense(req.query.catID,req.query.expenseName,req.query.expenseCost)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/expenses/:catID",async (req,res)=>{
    const expenses = await getExpenses(req.params.catID);
    return res.json({expenses});
})

//food
app.post("/food",async(req,res)=>{
    if(await addFood(req.query.catID,req.query.foodName,req.query.foodTime)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/foods/:catID",async (req,res)=>{
    const expenses = await getExpenses(req.params.catID);
    return res.json({expenses});
})

//vaccine
app.post("/vaccine",async(req,res)=>{
    if(await addVaccine(req.query.catID,req.query.vaccineName,req.query.vaccineTime)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/vaccines/:catID",async (req,res)=>{
    const vaccines = await getVaccines(req.params.catID);
    return res.json({vaccines});
})




app.listen(8080,(err)=>{
    if(err)throw new Error(err);
    console.log("Server running on port 8080");
})


/*
fs.open("hello.html","w",(err,file)=>{
    if(err) throw new Error(err);
    console.log("File saved")
})

fs.readFile("hello.html",(err,data)=>{
    if(err){
        throw new Error(err);
    }
    console.log("Here");
});
*/
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const multer = require("multer")();

const {databaseConnection} = require("./config/database");
const { loginUser, getUser, getUsers, getCat, getHygiene, getActivities, getExpenses, getFoods, getVaccines, getUserWithCat, getFeedingTimeHours, getUserByEmail } = require("./queries/GetQueries");
const { addUser, addCat, addHygiene, addActivity, addExpense, addVaccine, addFood, addFeedingTime } = require("./queries/InsertQueries");
const { updatePassword,updateCat, updateFeedingTimeHours } = require("./queries/UpdateQueries");
const { getUserCat } = require("./queries/GetQueries");
const { passwordGenerator } = require("./functions/passwordGenerator");
const { mail, sendEmail } = require("./functions/mail");
const db = databaseConnection("allaboutcats.db");


const app = express();

app.use(cors());
app.use(express.static(__dirname+"/public"));


app.get("/",(req,res)=>{
    return res.json({error:false,message:"Hurray! Server running."})
})

//Auth
app.post("/login",multer.any(),async(req,res)=>{
    let user = await loginUser(req.body.email,req.body.password);
    if(user){
        let hasRegistered = false;
        let usercats = await getUserWithCat(user.userID);
        if(usercats.length>0){
            hasRegistered = true;
        }
        return res.json({hasRegistered,error:false,data:user});
    }
    return res.json({error:true,data:[]})
});

app.post("/register",multer.any(),async (req,res)=>{
    if(!(await getUserByEmail(req.body.email))){
        let user = [req.body.firstName,
                    req.body.lastName,
                    req.body.email,
                    req.body.phoneNumber,
                    req.body.address,
                    req.body.aptNumber,
                    req.body.city,
                    req.body.state,
                    req.body.zipCode,
                    req.body.password
                    ];
        if(req.body.email == ""){
            return res.json({error:true,message:"Email is required."});
        }
        if(req.body.password == ""){
            return res.json({error:true,message:"Password is required."});
        }

        
        const a = await addUser(user);
        if(await addUser(user)){
            
            return res.json({error:false,message:"Success."});
        }
        return res.json({error:true,message:"Unable to add user."});
    }else{
        return res.json({error:true,message:"Email exists. Choose another email or login."});
    }
    
});

app.get("/user/:id",async (req,res)=>{
    const user = await getUser(req.params.id);
    return res.json({user});
})

app.post("/change-password",multer.any(),async (req,res)=>{
    if(await updatePassword(req.body.userID,req.body.newPassword)){
     return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Unable to update password."});
})

//Cat profile
app.post("/add-cat",multer.any(),async (req,res)=>{
    const cat = [
        req.body.userID,
        req.body.catName,
        req.body.catBirthday,
        req.body.catGender,
        req.body.catColor,
        req.body.catEyeballColor,
        req.body.catIdentification,
        req.body.catAmountOfWater
    ];
    if(await addCat(cat)){
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
    const cat = await getUserCat(req.params.userID);
    if(cat){
        return res.json({error:false,data:cat});
    }
    return res.json({error:true,data:[]})
})

app.post("/edit-cat",multer.any(),async (req,res)=>{
    if(await updateCat(req.body.catName,
                        req.body.catBirthday,
                        req.body.catGender,
                        req.body.catColor,
                        req.body.catEyeballColor,
                        req.body.catIdentification,
                        req.body.catID)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Unable to update cat details."});
})
//Categories

app.get("/categories/:catID",async (req,res)=>{
    const categoryData = [
        {
            categoryName:"Expenses",
            items:await getExpenses(req.params.catID),
            url:"expenses",
            imageUrl:"http://13.58.161.180:8080/images/money.png",
        },
        {
            categoryName:"Hygiene and care",
            items:await getHygiene(req.params.catID),
            url:"hygiene",
            imageUrl:"http://13.58.161.180:8080/images/hygiene.png",
        },
        {
            categoryName:"Food",
            items:await getFoods(req.params.catID),
            url:"food",
            imageUrl:"http://13.58.161.180:8080/images/food.png",
        },
        {
            categoryName:"Activities",
            items:await getActivities(req.params.catID),
            url:"activities",
            imageUrl:"http://13.58.161.180:8080/images/dumbell.png",
        },
        {
            categoryName:"Vaccine",
            items:await getVaccines(req.params.catID),
            url:"vaccine",
            imageUrl:"http://13.58.161.180:8080/images/syringe.png",
        },
    ];
    return res.json({categoryData});
})




//hygiene
app.post("/hygiene",multer.any(),async (req,res)=>{
    if(await addHygiene(req.body.catID,req.body.hygieneNote,req.body.hygieneTime)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/hygiene/:catID",async (req,res)=>{
    const hygiene = await getHygiene(req.params.catID);
    return res.json({hygiene});
})


//activities
app.post("/activity",multer.any(),async (req,res)=>{
    if( await addActivity(req.body.catID,
                        req.body.activityName,
                        `${req.body.activityStartTime??"0600hrs"} - ${req.body.activityEndTime??"1200hrs"}`,
                        req.body.activityEndTime??"1200hrs")){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/activities/:catID",async (req,res)=>{
    const activities = await getActivities(req.params.catID);
    return res.json({activities});
})


//expenses
app.post("/expense",multer.any(),async(req,res)=>{
    if(await addExpense(req.body.catID,req.body.expenseName,req.body.expenseCost)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/expenses/:catID",async (req,res)=>{
    const expenses = await getExpenses(req.params.catID);
    return res.json({expenses});
})

//food
app.post("/food",multer.any(),async(req,res)=>{
    if(await addFood(req.body.catID,req.body.foodName,req.body.foodTime)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/foods/:catID",async (req,res)=>{
    const foods = await getFoods(req.params.catID);
    return res.json({foods});
})

//vaccine
app.post("/vaccine",multer.any(),async(req,res)=>{
    if(await addVaccine(req.body.catID,req.body.vaccineName,req.body.vaccineTime)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/vaccines/:catID",async (req,res)=>{
    const vaccines = await getVaccines(req.params.catID);
    return res.json({vaccines});
})

//feeding time
app.post("/add-feeding-time",multer.any(),async(req,res)=>{
    if(await addFeedingTime(req.body.catID,req.body.feedingTime)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

app.get("/feeding-time-hours/:catID",async(req,res)=>{
    const catID = req.params.catID;
    const feedingTimeHours = await getFeedingTimeHours(catID);
    return res.json({feedingTimeHours});
})

app.post("/edit-feeding-time",multer.any(),async(req,res)=>{
    const feedingTimeID = req.body.feedingTimeID;
    const feedingTime = req.body.feedingTime;
    if(await updateFeedingTimeHours(feedingTime,feedingTimeID)){
        return res.json({error:false,message:"Success."});
    }
    return res.json({error:true,message:"Error."});
})

//forgot password
app.post("/forgot-password",multer.any(),async(req,res)=>{
    let email = req.body.email;
    let user = await getUserByEmail(email);
    if(!(user)){
        return res.json({error:true,message:`${email} was not found in our records!`});
    }
    // generate and send new password to user email
    let newPassword = passwordGenerator();

    sendEmail(email,user.firtsName,newPassword);
    if(mail(email)){
        if(await updatePassword(user.userID,newPassword)){
            return res.json({error:false,message:`Check ${email} for your password reset.`});
        }else{
            return res.json({error:true,message:`An error occurred, try again.`});
        }
    }else{
        return res.json({error:true,message:`An error occurred, try again later.`});
    }

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
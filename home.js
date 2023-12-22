// import express from "express";
// import path from "path";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import jwt from "jsonwebtoken";



// const app=express()
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// mongoose.connect("mongodb://localhost:27017", {
//     dbName: "project",
//   })
//   .then(() => console.log("Database Connected"))
//   .catch((e) => console.log(e));

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });


// const User = mongoose.model("User", userSchema);

// app.set("view engine", "ejs");

// const isAuthenticated = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (token) {
//     const decoded = jwt.verify(token, "sdjasdbajsdbjasd");

//     req.user = await User.findById(decoded._id);

//     next();
//   } else {
//     res.render("index2");
//   }
// };


// app.get("/",isAuthenticated, (req, res) => {
//   // const p=path.resolve()
//   // res.sendFile(path.join(p,"./index.html"))
// res.render("index")

// });

// // app.post("/", async (req, res) => {
// // //  res.render(".")
// // //   console.log(req.body)
// // const message=req.body
// // await User.create({name:req.body.name,email:req.body.email,password:req.body.password})
// // res.redirect('https://www.facebook.com/');

// // });


// // app.get("/login", (req, res) => {
// //   res.render("login");
  
// // });

// app.post("/mylogin", (req, res) => {
//   res.render("login");
  
// });

// app.post("/login", async (req, res) => {
//   //  res.render(".")
//   //   console.log(req.body)
//   const message=req.body
//   await User.create({name:req.body.name,email:req.body.email,password:req.body.password})
//   // res.redirect('https://www.facebook.com/');
//   res.redirect("/")
//   });







  

// app.listen(5000,()=>{
//   console.log("working fine")
// })


// import express from "express";
// import path from "path";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// // import jwt from "jsonwebtoken"; // Import jwt
// // import bcrypt from "bcrypt";


// const app = express();
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// mongoose.connect("mongodb://localhost:27017", {
//   dbName: "project",
// })
//   .then(() => console.log("Database Connected"))
//   .catch((e) => console.log(e));

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// const isAuthenticated = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (token) {
   
//       // const decoded = jwt.verify(token, "sdjasdbajsdbjasd");
//       // req.user = await User.findById(decoded._id);
//       next();
    
//     }
//    else {
//     res.render("index2");
//   }
// };

// // app.get("/success", isAuthenticated, (req, res) => {
// //   res.render("success");
// // });

// app.get("/",  (req, res) => {
//   res.render("index");
// });


// app.post("/mylogin",(req,res)=>{
//   res.render("login");
// })

// app.post("/login", async (req, res) => {
//  // const message = req.body;


//   const user=  await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
  

//   res.cookie("token", user._id, {
//     httpOnly: true,
//     expires: new Date(Date.now() + 60 * 1000),
//   });
//   res.redirect("/");
// });


// app.post("/myregister",(req,res)=>{
//   res.render("register");
// })



// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   let user = await User.findOne({ email });
//   if (user) {
//     res.render("login");
//   }
//   // const hashedPassword = await bcrypt.hash(password, 10);

//   user = await User.create({
//     name,
//     email,
//     password: password,
//   });

//   //  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");

//   // res.cookie("token", token, {
//   //   httpOnly: true,
//   //   expires: new Date(Date.now() + 60 * 1000),
//   // });
//   res.redirect("/");
// });




// app.listen(5000, () => {
//   console.log("Server is working fine");
// });

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017", {
  dbName: "project",
})
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    next();
  } else {
    res.render("index2");
  }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/mylogin", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    // Handle the case where the user already exists, e.g., redirect to login page

    const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch){
    //alert("Incorrect Password")
    return res.render("login", { email, message: "Incorrect Password" });

  }
else{
  // return res.render("index");
  res.redirect("https://www.flipkart.com/clothing-and-accessories/topwear/pr?sid=clo,ash&p[]=facets.ideal_for%255B%255D%3DMen&p[]=facets.ideal_for%255B%255D%3Dmen&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_8a89019f-c3a9-4061-94d0-f632980461cc_1_372UD5BXDFYS_MC.AHHHWF67UPNB&otracker=hp_rich_navigation_1_1.navigationCard.RICH_NAVIGATION_Fashion~Men%2527s%2BTop%2BWear~All_AHHHWF67UPNB&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L2_view-all&cid=AHHHWF67UPNB")
}
   
  }

  // const user = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  // res.cookie("token", user._id, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + 60 * 1000),
  // });
else{
  res.render("register");
}
 
});

app.get('/blogs', (req, res) => {
  res.render('blogs'); // Assuming 'blogs.ejs' is in your 'views' directory
});




app.post("/myregister", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {

  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    // Handle the case where the user already exists, e.g., redirect to login page
    return res.render("login");
  }

else{
  const hashedPassword = await bcrypt.hash(password, 10);

 const user = await User.create({
    name:name,
    email:email,
    password: hashedPassword,
  });









  // const hashedPassword = await bcrypt.hash(password, 10);

  // const user = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: await bcrypt.hash(req.body.password, 10),
  // });

  
  const token = jwt.sign({ _id: user._id }, "sdjasdbajsdbjasd");
 res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect("/");

}
});

app.listen(1000, () => {
  console.log("Server is working fine");
});














































// const http=require("http")

// const app=http.createServer((req,res)=>{
//   //console.log(res.url)
//    res.end("new project")
// })



// app.listen(5000, () => {
//     console.log("Server is working");
//   });


// app.post("/contact",(req,res)=>{

//   res.render("index2")
// })
import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const db =  new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"news",
    password:"patoduro",
    port:5432,
});

const app = express();
const port = 3000;

db.connect();
let news = [];
db.query("SELECT id FROM news", (err, res)=>{
if(err){
    console.error("Error executing query", err.stack);
} else {
    news = res.rows.length;
} 
});

async function idN(){
    var id = news -2
    return id;
}

app.use(bodyParser.urlencoded({extended:true }));
app.use(express.static("public"));

app.get("/", async (req,res)=>{
    try{
 const id = await idN();
 const query = await db.query("SELECT title FROM news WHERE id <=$1",[id]);
 const result = query.rows;


 res.render("index.ejs", {newsNews:result});
    } catch(err){
console.log(err)
    }
});


app.listen(port , ()=>{
    console.log(`Server running on port ${port}.`)
})


const client = require('./connection')
const express = require('express');

const app  = express();

const cors = require('cors');


app.use(express.json())

app.use(cors())

app.listen(3300,()=>{
    console.log('Express app running on '+(3300));
})

client.connect()


// app.get('/users',(req,res)=>{
//     client.query(`Select * from undergrads`,(err,result)=>{
//         if(!err){
//             res.send(result.rows)
//         }
//     });
//     client.end;
// });

// app.get('/users/:id',(req,res)=>{
//     client.query(`Select * from undergrads where std_rollno='${req.params.id}'`,(err,result)=>{
//         if(!err){
//             res.send(result.rows)
//         }
//     });
//     client.end;
// })

app.post("/todos", async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await client.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
// app.post('/users',async(req,res)=>{
//   try{  const {std_rollno , std_name , std_course , std_stream}= req.body;
//     const insertQuery = await client.query( `insert into undergrads(std_rollno, std_name, std_course, std_stream)
//            values('${req.body.std_rollno}','${req.body.std_name}','${req.body.std_course}','${req.body.std_stream}')`,
//         [std_rollno , std_name , std_course , std_stream]   );

       
//         res.json(insertQuery.rows[0])
//   }
//     catch (err) {
//         console.error(err.message);
//       }
  
// })


app.get("/todos", async (req, res) => {
    try {
      const allTodos = await client.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });


  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await client.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await client.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
// app.put('/users/:id',(req,res)=>{
//     let user = req.body;
//     let updateQuery = `update undergrads
//                set std_course='${user.std_course}',std_stream='${user.std_stream}' where std_rollno ='${req.params.id}'`

//                client.query(updateQuery,(err,result)=>{
//                 if(!err){
//                     res.status(200).send({status:true, message:`Update was successful`})
//                 }else{ console.log(err.message)}
//                })
    
//                client.end;

// })

app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await client.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

// app.delete('/users/:id',(req,res)=>{
    
//     let user = req.params.id
//     let insertquery = `delete from undergrads where std_rollno='${user}'`

//     client.query(insertquery,(err,result)=>{
//         if(!err){
//             res.status(200).send({status:true , message:`Deletion was successful`})
//         }else{ console.log(err.message)}
//        })

//        client.end;

// })
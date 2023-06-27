const express=require("express")
const cors=require("cors")
const app=express()
const connection=require("./connection");
app.use(cors())
app.use(express.json())
const db=connection();
let dummy_var;

//get all the works that are in todo's list
// app.get("/todo/",(request,response)=>{
//     const get_query=`select * from todo;`;
//     db.query(get_query,(err,result,fields)=>{
//         if(err)
//         {
//             console.log(err);
//             response.status(400).json({"message":"something went worng"});
//         }
//         else{
//             response.status(200).json(result);
//         }
//     })

// })
app.get("/todo/",(request,response)=>{
    const get_query=`select * from todo where user_name=?;`;
    if(dummy_var===undefined)
    {
        response.status(201).json(Empty)
    }
    else{
    db.query(get_query,[dummy_var],(err,result,fields)=>{
        if(err)
        {
            console.log(err)
            response.status(400).json({"message":"something went wrong"})
        }
        else{
            response.status(200).json(result);
        }
    })
}
})




//get the list of works based on priority
app.get("/todo/priority",(request,response)=>{
    const get_query=`select * from todo order by priority desc;`;
    db.query(get_query,(err,result,fields)=>{
        if(err)
        {
            console.log(err);
            response.status(400).json({"message":"something went worng"});
        }
        else{
            response.status(200).json({"data":result});
        }
    })

})

//get all the works based status
app.get("/todo/status/:t_status/",(request,response)=>{
    const t_status=request.params;
    console.log(t_status);
    const get_query=`select * from todo where t_status=?;`;
    db.query(get_query,[t_status],(err,result,fields)=>{
        if(err)
        {
            console.log(err);
            response.status(400).json({"message":"something went worng"});
        }
        else{
            response.status(200).json({"data":result});
        }
    })

})
//update the status of work in todo's list
app.put("/todo/:id",(request,response)=>{
    const { id }=request.params;
    const t_status= request.body.t_status;
    const put_query='update todo set t_status=? where id=?;';
    db.query(put_query,[t_status,id],(err,result,fields)=>{
        if(err)
        {
            console.log(err);
            response.status(400).json({"message":"something went worng"});
        }
        else{
            response.status(200).json("one row updated");
        }       
    })
})
//post the new work into todo's list
app.post("/todo/",(request,response)=>{
    const task_head=request.body.task_head;
    const task_desc=request.body.task_desc;
    const deadline=request.body.deadline;
    const t_status=request.body.t_status;
    const priority=request.body.priority;
    console.log(deadline);
    const post_query=`insert into todo (task_head , task_desc , deadline , t_status , priority,user_name ) 
    values(?,?,?,?,?,?);`;
    db.query(post_query,[task_head,task_desc,deadline,t_status,priority,dummy_var],(err,result,fields)=>{
        if(err)
        {
            console.log(err);
            response.status(400).json({"message":"something went worng"});
        }
        else{
            response.status(200).json("one row inserted");
        }
    })
})
//delete the works based on status
app.delete("/todo/:t_status",(request,response)=>{
    const {t_status}=request.params;
    const t=parseInt(t_status);
    const delete_query=`delete from todo where id=?`;
    console.log(t_status);
    console.log(t);
    db.query(delete_query,[t],(err,result,fields)=>
    {
        if(err)
        {
            console.log(err);
            response.status(400).json({"message":"something went worng"});
        }
        else{
            response.status(200).json("rows deleted");
        }  
    })
})


//add new user to the list 
app.post("/user/",(request,response)=>{
    const user_name=request.body.user_name;
    const full_name=request.body.full_name;
    const phone_no=request.body.phone_no;
    const password=request.body.password;
    const post_query=`insert into user_list (user_name,full_name,phone_no,password)
    values(?,?,?,?);`;
    db.query(post_query,[user_name,full_name,phone_no,password],(err,result,fields)=>{
        if(err)
        {
            console.log(err);
            response.status(400).json({"message":"something went worng"});            
        }
        else{
            response.status(200).json({"data":"registration sucessfull"});
        }
    })
})

//login page 
app.post("/user/login/",(request,response)=>{
    const user_name=request.body.user_name;
    const password=request.body.password;
    const post_query=`select * from user_list where user_name=? and password=?;`;
    db.query(post_query,[user_name,password],(err,result,fields)=>{
        if(err)
        {
            console.log(err);
            response.status(400).json({"message":"something went worng"});            
        } 
        else{
            dummy_var=user_name;
            response.status(200).json(result);
        }
    })
})




app.listen(4000,()=>{
    console.log("server is working on port http://localhost:3000/");
})
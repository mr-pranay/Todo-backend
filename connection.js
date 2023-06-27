const mysql =require("mysql")

function connection_database(){
    const connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"collage"
    })
    connection.connect((err)=>{
        if(err)
        {
            console.log("some thing went wrong");
            console.log(err);
            process.exit(1);
        }
        else{
            console.log("connection successful");
            
        }
    })
    return (connection);
}
module.exports=connection_database;
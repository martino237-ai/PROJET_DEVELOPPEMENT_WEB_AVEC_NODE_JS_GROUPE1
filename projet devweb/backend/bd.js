const bd=require('mysql');
const connexion=bd.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mystore'
}); 
connexion.connect((err)=>{
    if(err) throw err;
    console.log('Connecté à la base de données MySQL!');
});

module.exports=connexion;
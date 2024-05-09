const express = require('express');
const sqlite = require('sqlite3');
const cors = require('cors');
const app = express();
const PORT = 3001;
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formularios
//db conn
let db = new sqlite.Database('./interview.db',(error)=>{
    if(error){
        console.error(error.message);
    }
    console.log('db connected');
});

// regular petition
function petition(sql, params, res) { 
    //sql ->query
    //params -> data saved on [] format
    //res -> res object
    db.run(sql, params, (e) => {
        if (e) {
            res.status(400).send({'Error': `${e.message}`});
            return;
        }
        res.status(200).send({'Success': 'Data saved correctly'});
    });
}

//obtain data from db
app.get('/form',async(req, res)=>{
    try{
        let sql = 'SELECT * FROM elementinterview';
        db.all(sql, [], (e, rows)=>{
            if(e){
                res.send({'Error':`Error ${e.message}`});
                return;   
            }
            res.status(200).send(rows);
        });
    }catch(e){
        res.status(500).send({'Error':`Unexpected Error ${e.message}`});
    }
});
//save data
app.post('/form', async (req, res) => {
    try {
        const { mail, body } = req.body;
        if (!mail || !body) {  
            res.status(400).send('Error: some attributes are null');
            return;
        }
        let sql = `INSERT INTO elementinterview(mail, body) VALUES (?, ?)`; 
        petition(sql, [mail, body], res);  
    } catch (e) {
        res.status(500).send({'Error': `Unexpected Error ${e.message}`});
    }
});




//edit element by id
app.put('/form/:id', (req,res)=>{
    try{
        const { id } = req.params;
        const {mail, body } = req.body;
        if(!mail || !body){
            res.status(400).send({'Error':'Error some null attributes'});
            return;
        }
        const sql = 'UPDATE elementinterview SET mail = ?, body = ? WHERE id = ?';
        // run query function
        petition(sql,[mail, body, id], res);
    }catch(e){
        res.status(500).send({'Error':`Unexpected Error ${e.message}`});
    }
});

//delete element by id
app.delete('/form/:id', (req,res)=>{
    try{
        const { id } = req.params;
        if(!id){
            res.status(400).send({'Error':'Error some null attributes'});
            return;
        }
        const sql = 'DELETE FROM elementinterview WHERE id=?';
        // run query function
        petition(sql, [id], res);
    }catch(e){
        res.status(500).send({'Error':`Unexpected Error ${e.message}`});
    }
});

app.listen(PORT, ()=>{
    console.log(`listening port ${PORT}`);
});
//close db conn
app.on('close',()=>{
    db.close();
});
//export this module for jest testing
module.exports = app;
// Imports

const express = require("express")
const app =  express()
const port = 3000
app.use(express.json())


// Instance BDD

const {Pool} = require('pg')
const pool = new Pool({
    user: "postgres",
    password: "Triforce",
    host: "127.0.0.1",
    port: 5432,
    database: "burger_city",
    max: 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
})


// Listen on port 3000

app.listen(port, () => console.info('Listening on port ' + port))


//Connection BDD

async function start(){
    //await connect();
    const bdd = await readBdd("percents");
    const bdd2 = await readBdd("vehiclecarbon");
    console.log(bdd)
    console.log(bdd2)
}

async function connect(){
    try{
        //await client.connect();
        console.log("Connection to BDD OK !")
    }
    catch(e){
        console.error('Failed to connect ${e}')
    }
}

// Static files

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set views

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', {text : 'This is BCApp'})
})

app.get('/about', (req, res) => {
    res.render('about', {text : 'About Page'})
})

//Get All

app.get('/bdd', async (req, res) => {
    const tab1 = "percents"
    const rows = await readBdd(tab1);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get('/bdd2', async (req, res) => {
    const tab2 = "vehiclecarbon"
    const rows = await readBdd(tab2);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get('/bdd3', async (req, res) => {
    const tab3 = "client"
    const rows = await readBdd(tab3);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get('/bdd4', async (req, res) => {
    const tab4 = "city"
    const rows = await readBdd(tab4);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get('/bdd5', async (req, res) => {
    const tab5 = "infocity"
    const rows = await readBdd(tab5);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get('/bdd6', async (req, res) => {
    const tab6 = "infovehicle"
    const rows = await readBdd(tab6);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get('/bdd7', async (req, res) => {
    const tab7 = "history"
    const rows = await readBdd(tab7);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.get('/bdd8', async (req, res) => {
    const tab8 = "carbonfootprint"
    const rows = await readBdd(tab8);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

//Get One

app.get('/bdd/:id', async (req, res) => {
    const tab = "percents";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app.get('/bdd2/:id', async (req, res) => {
    const tab = "vehiclecarbon";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app.get('/bdd3/:id', async (req, res) => {
    const tab = "client";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app.get('/bdd4/:id', async (req, res) => {
    const tab = "city";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app.get('/bdd5/:id', async (req, res) => {
    const tab = "infocity";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app.get('/bdd6/:id', async (req, res) => {
    const tab = "infovehicle";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})


// Put

app.put('/bdd/:id', async (req, res) => {
    let result = {}
    try{
        console.log("dans le try")
        const itemId = req.params.id;
        const reqJson = req.body;
        console.log(itemId);
        console.log(reqJson);
        updateLine(itemId,reqJson.burger_city);
    } catch(e){
        result.success = false;
    } finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }

})



//Post 

app.post('/bdd', async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        await newLine(reqJson.burger_city)
        var t = reqJson.burger_city;
        console.log(t);
        result.success = true;
    } catch(e){
        result.success = false;
    } finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }

})

app.post('/bdd7', async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        await newLine(reqJson.burger_city[0],reqJson.burger_city[1],reqJson.burger_city[2],reqJson.burger_city[3])
        var t = reqJson.burger_city;
        console.log(t);
        result.success = true;
    } catch(e){
        result.success = false;
    } finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }

})

//Delete One or Multiple

app.delete('/bdd', async (req, res) => {
    let result = {}
    try{
        const reqJson = req.body;
        
        cpt = 0;
        if(reqJson.id.length>0){
            while(!(cpt == reqJson.id.length)){
                console.log("log : " + cpt + " : " + reqJson.id[cpt])
                await deleteLine(reqJson.id[cpt])
                cpt++;
            }
        } else {
            await deleteLine(reqJson.id)
        }
    } catch(e){
        result.success = false;
    } finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }

})


//Lecture BDD

async function readOne(id, tab){ // RAJOUTER LA TABLE EN ARG
    const one ="select * from "+ tab + " where id =" + id;
    try {
        const results = await pool.query(one);
        return results.rows;
    } catch(e){
        return [];
    }
}

async function readBdd(tab) {
    const s = "select * from city";
    const s1 = "select * from " + tab;
    const s2 = "select surface, nbstationtram from city where id_city = (select max(id_city) from city) "
    try {
        const results = await pool.query(s1);
        return results.rows;
    } catch(e){
        return [];
    }
}

//Insert BDD

async function newLine(t) { // AJOUTER LA TABLE EN ARG
    console.log("in the NewLine");
    try{
        //console.log("in the try");
        await pool.query("insert into percents(percent) values ($1)",[t]); // erreur ici
        //console.log("after the Query");
        return true
    }
    catch(e){
        console.log(e);
        return false;
    }
}

/*
INSERT INTO
    history
    (   carpercent    ,   trampercent   ,   velibpercent, 	citycfp) 
SELECT  10   ,   10    ,   10	,	100
FROM    vide
WHERE   NOT EXISTS
        (   SELECT  1
            FROM    history
            WHERE   citycfp = 100
        )
;
*/
async function newLine(v1,v2,v3,v4) {
    //console.log("in the NewLine");
    try{
        console.log("in the try");
        await pool.query("INSERT INTO history(carpercent, trampercent, velibpercent, citycfp) SELECT " + v1 + " , " + v2 + " , " + v3 + " , " + v4 + " FROM vide WHERE NOT EXISTS ( SELECT 1 FROM history WHERE carpercent = " + v1 + " and trampercent = " + v2 + " and velibpercent = " + v3 + " )");
        console.log(v1 + "," + v2 + "," + v3 + "," + v4)
        //console.log("after the Query");
        return true
    }
    catch(e){
        console.log(e);
        return false;
    }
}

//Delete BDD

async function deleteLine(id){ // RAJOUTER ARG NOM DE TABLE
    try{
        await pool.query("delete from percents where id = $1", [id]);
        return true
    }
    catch(e){
        return false;
    }
}

// Update BDD

async function updateLine(id, value){
    try{
        await pool.query("UPDATE percents SET percent = " + value + " WHERE id = " + id);
        return true
    }
    catch(e){
        return false;
    }
}

//Main

start();

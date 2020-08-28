// Imports
const vm = require('vm');
const express = require("express")
const app2 =  express()
const port = 3001
app2.use(express.json())


// Instance BDD

const {Pool} = require('pg')
const pool = new Pool({
    user: "postgres",
    password: "toto",
    host: "192.168.1.1",
    port: 5432,
    database: "stage",
    max: 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
})


// Listen on port 3001

app2.listen(port, () => console.info('Listening on port ' + port))


//Connection BDD

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function start(){
    //await connect();
    while(true){
        await sleep(1000);
        const babou = await Calcul("percents","infocity","city","infovehicle","vehiclecarbon","carbonfootprint")
    }
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

console.log("Ceci est le 2nd server")
start();

// Set views

app2.set('views', './views')
app2.set('view engine', 'ejs')



// Get

app2.get('/bdd', async (req, res) => {
    const tab1 = "percents"
    const rows = await readBdd(tab1);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app2.get('/bdd2', async (req, res) => {
    const tab2 = "vehiclecarbon"
    const rows = await readBdd(tab2);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app2.get('/bdd3', async (req, res) => {
    const tab3 = "client"
    const rows = await readBdd(tab3);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app2.get('/bdd4', async (req, res) => {
    const tab4 = "city"
    const rows = await readBdd(tab4);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app2.get('/bdd5', async (req, res) => {
    const tab5 = "infocity"
    const rows = await readBdd(tab5);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app2.get('/bdd6', async (req, res) => {
    const tab6 = "infovehicle"
    const rows = await readBdd(tab6);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})


//Get One

app2.get('/bdd/:id', async (req, res) => {
    const tab = "percents";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app2.get('/bdd2/:id', async (req, res) => {
    const tab = "vehiclecarbon";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app2.get('/bdd3/:id', async (req, res) => {
    const tab = "client";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app2.get('/bdd4/:id', async (req, res) => {
    const tab = "city";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app2.get('/bdd5/:id', async (req, res) => {
    const tab = "infocity";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})

app2.get('/bdd6/:id', async (req, res) => {
    const tab = "infovehicle";
    const itemId = req.params.id;
    const row = await readOne(itemId, tab);
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(row))
})


// Put

app2.put('/bdd/:id', async (req, res) => {
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





// BDD PART




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
    const s1 = "select * from " + tab;
    try {
        const results = await pool.query(s1);
        return results.rows;
    } catch(e){
        return [];
    }
}

async function updateLine(id, value, tab, nameColumn){
    try{
        await pool.query("UPDATE "+ tab + " SET "+ nameColumn + " = " + value + " WHERE id = " + id);
        return true
    }
    catch(e){
        return false;
    }
}

async function newLine(v1,v2,v3,v4) {
    //console.log("in the NewLine");
    try{
        //console.log("in the try");
        await pool.query("insert into history(carpercent, trampercent, velibpercent, citycfp) values("
        + v1 + " , " + v2 + " , " + v3 + ", " + v4 + ")")
        //console.log("after the Query");
        return true
    }
    catch(e){
        console.log(e);
        return false;
    }
}





// Main Fonction

async function Calcul(tab,tab2,tab3,tab4,tab5,tab6){
    const s1 = "select * from " + tab + " order by id";
    const s2 = "select * from " + tab2 + " order by id";
    const s3 = "select * from " + tab3 + " order by id";
    const s5 = "select * from " + tab5 + " order by id";
    console.log("INSIDE")
    try {
        const results = await pool.query(s1);
        const results2 = await pool.query(s2);
        const results3 = await pool.query(s3);
        const results5 = await pool.query(s5);
        //Init

		let popS = results3.rows[0].surface * 10000;
		let carA = popS * 0.5;
        let velibA = popS * 0.3;
        let nbstationtram = results3.rows[0].nbstationtram

        updateLine(1,popS,tab2,"populationsize")
        updateLine(1,carA,tab2,"caravaible")
        updateLine(1,velibA,tab2,"velibavaible")
        updateLine(1,nbstationtram,tab2,"tramstationavaible")
        console.log("tram :" + nbstationtram);
        // Percents
        let carPercent = results.rows[0].percent
        let tramPercent = results.rows[1].percent
        let velibPercent = results.rows[2].percent
        console.log(carPercent)
        console.log(tramPercent)
        console.log(velibPercent)
        // InfoCity
        popS = results2.rows[0].populationsize
        carA = results2.rows[0].caravaible
        let tramA = nbstationtram
        velibA = results2.rows[0].velibavaible
        // City (Surface et nbStationTram)
        let surface = results3.rows[0].surface
                //nbstationtram = results.rows[0].nbstationtram


        ////////////////
        //// Calcul ////
        ////////////////


        //ConvertToUsed

        let usedCar = (carA/100)*carPercent
        let usedVelib = (velibA/100)*velibPercent
        let usedTram = (tramA/100)*tramPercent
        console.log("pop : " + popS)
        console.log( (1.1 * usedCar - 1 * usedVelib - 50 * usedTram))
        let Walking = popS - (1.1 * usedCar + 1 * usedVelib + 50 * usedTram)
        //1.1 Pers/voiture en moyenne | 1 Pers/velib en moyenne | Une station en plus rajoute 50 personnes(hypothèse)
        console.log(usedCar);
        console.log(usedVelib);
        console.log(usedTram);
        console.log("walking : " + Walking);

        //Calcul AvgDist

        let avgDistCar = (6 + (surface/100 * 6 - 0.2 * usedTram)) * carPercent/50
        let avgDistVelib = (3 + (surface/100 * 3 - 0.2 * usedTram)) * velibPercent/50
        let avgDistTram = (0.7 * usedTram) * tramPercent/50
        let avgDistWalker = 3 + (surface/100 * 3 - 0.3 * usedTram)
        console.log(avgDistCar)
        console.log(avgDistVelib)
        console.log(avgDistTram)
        console.log(avgDistWalker)

        //Calcul E.C
        console.log("hey")
        let ecArray = [];
        ecArray[0] = usedCar * avgDistCar * results5.rows[0].cfp;        // E.C CAR
        ecArray[1] = avgDistTram * results5.rows[1].cfp;                 // E.C TRAM
        ecArray[2] = usedVelib * avgDistVelib * results5.rows[2].cfp;    // E.C VELIB
        ecArray[3] = Walking * avgDistWalker * results5.rows[3].cfp;     // E.C WALKING
        ecArray[4] = ecArray[0] + ecArray[1] + ecArray[2] + ecArray[3];
        console.log("Array : " + ecArray);
        console.log("usedCar : " + usedCar + " | avgDistCar : " + avgDistCar +" cfp : " + results5.rows[0].cfp)

        //Return Result

        // OFFICIAL A NE PAS TOUCHER 

        //Car
        if (avgDistCar < 0){
            avgDistCar = 0
        }
        updateLine(1,usedCar,tab4,"usedvehicle")
        updateLine(1,avgDistCar,tab4,"avgdistvehicle")
        //Tram
        if (avgDistTram < 0){
            avgDistTram = 0
        }
        updateLine(2,usedTram,tab4,"usedvehicle")
        updateLine(2,avgDistTram,tab4,"avgdistvehicle")
        //Velib
        if (avgDistVelib < 0){
            avgDistVelib = 0
        }
        updateLine(3,usedVelib,tab4,"usedvehicle")
        updateLine(3,avgDistVelib,tab4,"avgdistvehicle")
        //Walker
        if (avgDistWalker < 0){
            avgDistWalker = 0
        }
        updateLine(4,Walking,tab4,"usedvehicle")
        updateLine(4,avgDistWalker,tab4,"avgdistvehicle")

        //Return EC

        //newLine(carPercent,tramPercent,velibPercent,ecArray[4])
        updateLine(1,ecArray[4],tab6,"result")
        
        app2.get('', (req, res) => {
            res.render('index2', {text : ecArray[4]})
            })

    } catch(e){
        return [];
    }
     
}

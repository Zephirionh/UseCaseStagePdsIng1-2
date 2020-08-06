readBdd("bdd"); // Affiche BDD 1 à gauche
            readBdd("bdd2"); // Affiche BDD 2 à droite

            var btnCreate = document.getElementById("btnCreate")
            btnCreate.addEventListener("click", async e=>{
                conditions(70); // Valeur a changer pour nouvelle bdd
            })
            var btnCreate2 = document.getElementById("btnCreate2")
            btnCreate2.addEventListener("click", async e=>{
                conditions(71); // Valeur a changer pour nouvelle bdd
            })
            var btnCreate3 = document.getElementById("btnCreate3")
            btnCreate3.addEventListener("click", async e=>{
                conditions(72); // Valeur a changer pour nouvelle bdd
            })
            async function readBdd(tab){
                try{
                    if(tab == "bdd"){
                        const ulBdd = document.getElementById("ulBdd")
                        const result = await fetch("http://localhost:3000/" + tab, {method : "GET"})
                        const bdd = await result.json();
                        let transport = "";
                        bdd.forEach(t=>{
                        const li = document.createElement("li")
                        if(t.id == 70)
                        {
                            transport = "Car"
                        } else if (t.id == 71){
                            transport = "Tram "
                        } else if (t.id == 72){
                            transport = "Velib "
                        }
                        li.textContent = "Percent of "+ transport +" : "+ t.percent + " %";
                        li.id = t.id;
                        ulBdd.appendChild(li)
                    }) 
                    } else if(tab == "bdd2"){

                        const ulBdd2 = document.getElementById("ulBdd2")
                        const result = await fetch("http://localhost:3000/" + tab, {method : "GET"})
                        const bdd2 = await result.json();

                        bdd2.forEach(t=>{
                        const li = document.createElement("li")

                        li.textContent =  "E.C moyens des " + t.transport +" : "+ t.cfp;
                        li.id = t.id;
                        ulBdd2.appendChild(li)
                    }) 

                    }
                   
                }
                catch(e) {
                    console.log(e)
                    console.log("Error reading the bdd.")
                }
            }


            // CONDITIONS FOR %


            async function conditions(id){
                let good = false;
                const jsonRequest = {}
                while (!good){
                    jsonRequest.burger_city = prompt("Enter your %")
                    if (jsonRequest.burger_city == ""){
                        console.log("c'est vide")
                        alert("Veuillez entrer une valeur")
                    } else if(parseInt(jsonRequest.burger_city) < 0){
                        console.log("Valeur negative")
                        alert("Valeur comprise entre 0 et 100 seuleument")
                    } else if(parseInt(jsonRequest.burger_city) > 100){
                        console.log("Valeur trop grande")
                        alert("Valeur comprise entre 0 et 100 seuleument")
                    } else if(jsonRequest.burger_city == null){
                        console.log("button annulé entrer")
                        good = true;
                        
                    }   
                    else {
                        let ok = false;
                        for(let i = 0; i < jsonRequest.burger_city.length; i++){
                            ok = isNaN(parseInt(jsonRequest.burger_city[i]));
                            if (ok) {
                                console.log("Value NaN")
                                alert("Entier seuleument")
                                break;
                            }
                        }
                        if(!ok) {
                            console.log("Value OK")
                            const result = await fetch("http://localhost:3000/bdd/" + id, {method: "PUT",
                            headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
                            const success = await result.json();
                            alert("UPDATED !")
                            good = true;
                        }
                    }
                }
            }

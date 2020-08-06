//CECI EST UN TEST

class data {

	nbTramStation;
	usedTramStation;
	populationSize;
	walking;
	carAvaible;
	velibAvaible;
    

    constructor(surface,nbStationTram){
        this.surface = surface;
        this.nbStationTram = nbStationTram;
        init();
    }

    init(){
        nbTramStation = 0
        usedTramStation = nbTramStation;
        populationSize = surface * 10000;
        walking = populationSize;
        carAvaible = (int)(populationSize * 0.5);
        velibAvaible = (int)(populationSize * 0.3);  
    }
}
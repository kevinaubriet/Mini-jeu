class Ennemi{
    constructor(posX, posY,typeE){
        this.posX = posX;
        this.posY = posY;
        this.typeE = typeE;
    }
}

class EnnemiLeger extends Ennemi{
    constructor(posX,posY){
        super();
        this.pv = 20;
        this.vitesse = 10;
        this.degat = 15;
    }

}

class EnnemiLourd extends Ennemi{
    constructor(posX,posY){
        super();
        this.pv = 50;
        this.vitesse = 5;
        this.degat = 30;
    }

}
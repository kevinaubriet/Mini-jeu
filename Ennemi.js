class Ennemi{
    constructor(posX, posY,typeE, pv, vitesse, degat){
        this.posX = posX;
        this.posY = posY;
        this.typeE = typeE;
    }
}

class EnnemiLeger extends Ennemi{
    constructor(posX, posY,typeE){
        super(posX, posY,typeE, 20, 10, 15);
    }

}

class EnnemiLourd extends Ennemi{
    constructor(posX, posY,typeE){
        super(posX, posY,typeE,50,5,30);
    }

}
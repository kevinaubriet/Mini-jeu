class Enemie{
    constructor(posX, posY,typeE){
        this.posX = posX;
        this.posY = posY;
        this.typeE = typeE;
    }
}

class EnemieLeger extends Enemie{
    constructor(posX,posY){
        super();
        this.pv = 20;
        this.vitesse = 10;
        this.degat = 15;
    }

}

class EnemieLourd extends Enemie{
    constructor(posX,posY){
        super();
        this.pv = 50;
        this.vitesse = 5;
        this.degat = 30;
    }

}
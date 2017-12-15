class Player{
    constructor(posX,posY,vitesse){
        this.posX = posX;
        this.posY = posY;
        this.vitesse=vitesse;
        this.pv = 100;
        this.armes = new Array(new FusilNormal(),new FusilPompe(),new FusilSniper());
        this.atouts = new Array(new Atout("invincible"),new Atout("degat"));

    }
}


class Atout{
    constructor(nom){
        this.nom = nom;
        this.dispo = false;
        this.activate = false;
    }

    
}
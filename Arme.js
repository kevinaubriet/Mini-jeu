class Arme{
    constructor(){
        this.activate = false;
    }
}

class FusilNormal extends Arme{
    constructor(){
        super();
        this.nom = "fusil_normal";
        this.projectile = new Projectile("carrée",4,"vert",3);
        this.cadence = 5;
    }
}

class FusilPompe extends Arme{
    constructor(){
        super();
        this.nom = "fusil_pompe";
        this.projectile = new Projectile("carrée",4,"rouge",3);
        this.cadence = 2;
    }
}

class FusilSniper extends Arme{
    constructor(){
        super();
        this.nom = "fusil_sniper";
        this.projectile = new Projectile("carrée",10,"vert",3);
        this.cadence = 1;
    }
}

class Projectile{
    constructor(forme,degat,couleur,taille){
        this.forme = forme;
        this.degat = degat;
        this.couleur = couleur;
        this.taille=taille;
    }
}
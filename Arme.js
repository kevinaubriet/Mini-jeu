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
    constructor(forme,degat,vitesse,posX,posY,couleur,taille){
        this.posX=posX;
        this.posY=posY;
        this.vitesse=vitesse;
        this.forme = forme;
        this.degat = degat;
        this.taille=4;//taille;
        this.pv=1;
        this.couleur = couleur;
    }


    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.posX, this.posY, this.taille, this.taille);
        ctx.restore();
    }
    move() {
        this.posY -= this.vitesse;
    }


    testCollisionZone(w, h) {

        if (this.posY+5 <=0) {
            this.pv=0
        }

    }
    actionsProjectile(ctx,w,h,player,tableauObjetGraphiques){  //differentes actions effectuées dans la boucle d'animation
        this.draw(ctx);
        this.move(ctx);
        this.testCollisionZone(ctx);

        var self=this;       //SALE MAMENE UNE SOLUTION?
        tableauObjetGraphiques.forEach(function (e) {
            if (e instanceof Ennemi){
                self.degatEnnemi(e,self.degat);
            }
        });
    }

    touched(e) {
        if (((this.posX <= e.posX && (e.posX <= (this.posX + this.taille)) || (e.posX + e.taille) >= this.posX && e.posX <= (this.posX + this.taille))) && ((this.posY <= e.posY && (e.posY <= (this.posY + this.taille)) || (e.posY + e.taille) >= this.posY && e.posY <= (this.posY + this.taille)))) {
            return true;
        }
        return false;
    }

    killProjectile(){
        this.degat=0;
        this.pv=0;
    }
/*
* Cette fonction verifie si l'ennemi est touché
* si oui detruit le projectile en le mettant a 0pv
* et baisse les pv
*
* PB==> detruit plsr ennemies a la foid
*/
    degatEnnemi(ennemi,nbr){
        if(this.touched(ennemi)){
            ennemi.retirerPvEnnemi(nbr);
            this.killProjectile();
        }
    }
}
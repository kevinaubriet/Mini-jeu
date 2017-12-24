class Arme{
    constructor(){
        this.activate = false;
    }
}

class FusilNormal extends Arme{
    constructor(){
        super();
        this.nom = "fusil_normal";
        this.cadence = 100;
    }
}

class FusilPompe extends Arme{
    constructor(){
        super();
        this.nom = "fusil_pompe";
        this.cadence = 800;
    }
}

class FusilSniper extends Arme{
    constructor(){
        super();
        this.nom = "fusil_sniper";
        this.cadence = 1000;
    }
}

class Projectile{
    constructor(forme,degat,vitesse,vitesseX,posX,posY,couleur,typeArme){
        this.posX=posX;
        this.posY=posY;
        this.vitesse=vitesse;
        this.vitesseX = vitesseX;
        this.degat = degat;
        this.taille=4;
        this.pv=1;
        this.couleur = couleur;
        this.typeArme = typeArme;

    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.posX, this.posY, this.taille, this.taille);
        ctx.restore();
    }

    /*
     *fonction move qui enleve des dégats au projectile en fonction de la distance
     */
    move() {
        this.posY -= this.vitesse;
        this.posX += this.vitesseX;
        if(this.typeArme === "fusil_pompe" && this.degat>1){
            this.degat-=1;
        }
    }

    /*
     *fonction testCollisionZone qui teste si le projectile est sortie de la zone du canvas
     */
    testCollisionZone(w, h) {

        if (this.posY+5 <=0) {
            this.killProjectile();
        }

    }

    /*
     *fonction actionsProjectile qui effectues les différentes actions du projectile (se trouve dans la boucle d'animation)
     */
    actionsProjectile(ctx,w,h,player,tableauObjetGraphiques){
        this.draw(ctx);
        this.move(ctx);
        this.testCollisionZone(ctx);

        let self = this;
        tableauObjetGraphiques.forEach(function (e) {
            if (e instanceof Ennemi){
                self.degatEnnemi(e,self.degat);
            }
        });
    }

    /*
     *fonction touched qui teste la collision entre un ennemi et un projetile
     */
    touched(e) {
        return ((this.posX <= e.posX && (e.posX <= (this.posX + this.taille)) || (e.posX + e.taille) >= this.posX && e.posX <= (this.posX + this.taille))) && ((this.posY <= e.posY && (e.posY <= (this.posY + this.taille)) || (e.posY + e.taille) >= this.posY && e.posY <= (this.posY + this.taille)));

    }

    /*
     *fonction killProjectile qui met à 0 les pv et les dégats du projectile (permet de ensuite supprimer le projecticle du tableau des élément à afficher)
     */
    killProjectile(){
        this.degat=0;
        this.pv=0;
    }

    /*
     *fonction degatEnnemi qui retire les pv d'un enemi touché (en fonctions des dégat du projectiles), supprime le pojectile sauf si c'est un sniper ( les balles traversent les ennemis)
     */
    degatEnnemi(ennemi,nbr){
        if(this.touched(ennemi)){
            ennemi.retirerPvEnnemi(nbr);
            if(this.typeArme !== "fusil_sniper"){
                this.killProjectile();
            }
        }
    }
}
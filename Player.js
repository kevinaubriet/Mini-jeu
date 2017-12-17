class Player{
    constructor(posX,posY,vitesse,pv){
        this.posX = posX;
        this.posY = posY;
        this.width = 20;                //A modif selon taille voulue
        this.height = 20;
        this.posY = posY;
        this.vitesse=vitesse;
        this.vitesseX=0;
        this.vitesseY=0;
        this.pv = pv;
        this.armes = new Array(new FusilNormal(),new FusilPompe(),new FusilSniper());
        this.atouts = new Array(new Atout("invincible"),new Atout("degat"));

    }

    getArmeActive(){
        for(var i =0; i< this.armes.length;i++){
            if(this.armes[i].activate == true){
                return this.armes[i];
            }
        }
    }

    ActiverArme(arme){
        for(var i =0; i<this.armes.length;i++){
            if(this.armes[i].activate==true)
                this.armes[i].activate = false;
            else if(this.armes[i].nom == arme){
                this.armes[i].activate = true;
            }
        }
    }

    ActiverAtout(atout){
        for(var i = 0;i<this.atouts.length;i++){
            if(this.atouts[i].dispo == false && this.atouts[i].nom == atout){
                console.log("atout pas dispo");
            } else if(this.atouts[i].dispo == true && this.atouts[i].nom == atout){
                //action à faire selon attout
                console.log("atout activé !");
                this.atouts[i].dispo == false;
            }


        }
    }

    DispoAtout(atout){
        for(var i=0; i<this.atouts.length;i++){
            if(atout == this.atouts[i].nom){
                this.atouts[i].dispo =true;
            }
        }
    }



    actionsPlayer(ctx,w,h){  //differentes actions effectuées dans la boucle d'animation
        this.draw(ctx);
        this.move(ctx);
        this.testCollisionZone(w,h);
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        ctx.restore();
    }

    move() {
        this.posX += this.vitesseX;
        this.posY += this.vitesseY;
    }



    testCollisionZone(w, h) {
        if ((this.posX + this.width) > w) {
            this.posX=w-this.width;
        }
        if (this.posX < 0) {
            this.posX=0;
        }

        if ((this.posY + this.height) > h) {
            this.posY=h-this.height;
        }

        if (this.posY < 0) {
            this.posY=0;
        }
    }

    retirerPvJoueur(nbr){
        this.pv-=nbr;
    }

}


class Atout{
    constructor(nom){
        this.nom = nom;
        this.dispo = false;
        this.activate = false;
    }




}
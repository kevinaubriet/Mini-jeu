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
        this.multDegat = 1;
        this.invincible = false;
        this.img=new Image();
        this.img.src='../ressources/spaceShipPlayer.png';
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
                console.log("atout "+this.atouts[i].nom +" pas dispo");
            }
            else if(this.atouts[i].dispo == true && this.atouts[i].nom == atout){

                if(atout == "degat"){
                    let joueur =this; //SALE MAMENE
                    this.atouts[i].activate = true;
                    this.multDegat = 2;
                    setTimeout(function () {
                        joueur.multDegat = 1;
                        joueur.atouts[1].activate = false;
                    },joueur.atouts[i].time);// TEMPS DE L'ACTION = 5s

                    //console.log("degattttt activé");
                    this.atouts[i].dispo = false;
                }
                else if(atout == "invincible"){
                    let joueur =this;//SALE MAMENE
                    this.atouts[i].activate = true;
                    this.invincible = true;
                    setTimeout(function () {
                        joueur.invincible = false;
                        joueur.atouts[0].activate = false;
                    },joueur.atouts[i].time);// TEMPS DE L'ACTION = 5s

                    //console.log("inviiincible activé");
                    this.atouts[i].dispo = false;
                }

            }


        }
    }

    DispoAtout(atout){
        for(var i=0; i<this.atouts.length;i++){
            if(atout == this.atouts[i].nom){
                this.atouts[i].dispo = true;
                console.log(this.atouts[i]);
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
        /*ctx.fillStyle = "white";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);*/
        ctx.drawImage(this.img,this.posX-5 ,this.posY-7);
        ctx.fillStyle = "white";
        if(this.pv==100)ctx.fillText(this.pv,this.posX+1,this.posY+40,this.height);
        if(this.pv<100)ctx.fillText(this.pv,this.posX+5,this.posY+40,this.height);
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
        this.pv-=nbr/2;  //Bug boucle appelée deux fois donc pv moins doublés
    }

}


class Atout{
    constructor(nom,posX,posY){
        this.nom = nom;
        this.posX = posX;
        this.posY = posY;
        this.pv = 1;
        this.dispo = false;
        this.activate = false;
        this.time = 5000;
    }

    draw(ctx){
        ctx.save();

        if(this.nom === "invincible"){
            ctx.fillStyle="yellow";
        }
        else if(this.nom === "degat"){
            ctx.fillStyle="red";
        }
        ctx.fillRect(this.posX,this.posY,10, 10);


        ctx.restore();
    }

    actionsAtout(ctx,player){
        this.draw(ctx);
        if(this.touched(player)){
            player.DispoAtout(this.nom);
            this.pv=0;
        }

    }



    touched(player) {
        if (((this.posX <= player.posX && (player.posX <= (this.posX+10)) || (player.posX + player.height) >= this.posX && player.posX <= (this.posX+10))) && ((this.posY <= player.posY && (player.posY <= (this.posY+10)) || (player.posY + player.width) >= this.posY && player.posY <= (this.posY+10)))) {
            return true;
        }
        return false;
    }

}
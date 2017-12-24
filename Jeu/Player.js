class Player{
    constructor(posX,posY,vitesse,pv){
        this.posX = posX;
        this.posY = posY;
        this.width = 20;
        this.height = 20;
        this.posY = posY;
        this.vitesse=vitesse;
        this.vitesseX=0;
        this.vitesseY=0;
        this.pv = pv;
        this.armes = [new FusilNormal(),new FusilPompe(),new FusilSniper()];
        this.atouts = [new Atout("invincible"),new Atout("degat")];
        this.multDegat = 1;
        this.invincible = false;
        this.img=new Image();
        this.img.src='../ressources/spaceShipPlayer.png';
    }

    /*
     * fonction qui renvoie l'arme active du joueur
     */
    getArmeActive(){
        for(let i =0; i< this.armes.length; i++){
            if(this.armes[i].activate === true){
                return this.armes[i];
            }
        }
    }

    /*
     * fonction qui active l'arme en parametre et desactive la derniere activée
     */
    ActiverArme(arme){
        for(let i =0; i<this.armes.length; i++){
            if(this.armes[i].activate===true)
                this.armes[i].activate = false;
            else if(this.armes[i].nom === arme){
                this.armes[i].activate = true;
            }
        }
    }

    /*
     * fonction qui permet au joueur d'activer un atout si celui la est disponnible (l'atout se désactive au bout de quelque seconde)
     */
    ActiverAtout(atout){
        for(let i = 0; i<this.atouts.length; i++){
            if(this.atouts[i].dispo === false && this.atouts[i].nom === atout){
            }
            else if(this.atouts[i].dispo === true && this.atouts[i].nom === atout){

                if(atout === "degat"){
                    let joueur =this;
                    this.atouts[i].activate = true;
                    this.multDegat = 2;
                    setTimeout(function () {
                        joueur.multDegat = 1;
                        joueur.atouts[1].activate = false;
                    },joueur.atouts[i].time);

                    this.atouts[i].dispo = false;
                }
                else if(atout === "invincible"){
                    let joueur =this;
                    this.atouts[i].activate = true;
                    this.invincible = true;
                    setTimeout(function () {
                        joueur.invincible = false;
                        joueur.atouts[0].activate = false;
                    },joueur.atouts[i].time);

                    this.atouts[i].dispo = false;
                }

            }


        }
    }

    /*
     * fonction qui rend disponible un atout
     */
    DispoAtout(atout){
        for(let i=0; i<this.atouts.length; i++){
            if(atout === this.atouts[i].nom){
                this.atouts[i].dispo = true;
            }
        }
    }

    /*
     * fonction qui effectues les différentes actions du joueur (se trouve dans la boucle d'animation)
     */
    actionsPlayer(ctx,w,h){
        this.draw(ctx);
        this.move(ctx);
        this.testCollisionZone(w,h);
    }

    /*
     * fonction qui draw le joueur , si un atout est activé un aura sera visible
     */
    draw(ctx) {
        ctx.save();

        ctx.drawImage(this.img,this.posX-5 ,this.posY-7);

        let couleur = "white";
        ctx.fillStyle = couleur;
        if(this.pv===100)ctx.fillText(this.pv,this.posX+1,this.posY+40,this.height);
        if(this.pv<100)ctx.fillText(this.pv,this.posX+5,this.posY+40,this.height);

        if(this.atouts[0].activate && !this.atouts[1].activate){
            couleur = "yellow";
            this.aura(ctx,couleur,30);

        }else if(this.atouts[1].activate && !this.atouts[0].activate){
            couleur = "red";
            this.aura(ctx,couleur,30);

        }else if (this.atouts[0].activate && this.atouts[1].activate){
            couleur = "yellow";
            this.aura(ctx,couleur,30);
            couleur = "red";
            this.aura(ctx,couleur,40);

        }

        ctx.restore();
    }

    /*
     * fonction qui draw un aura autour du joueur
     */
    aura(ctx, couleur,taille)
    {
        let posx =this.posX+(this.width/2);
        let posy =this.posY+(this.height/2);

        ctx.beginPath();
        ctx.lineWidth="10";
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = couleur;
        ctx.arc(posx, posy, taille, 0, 2 * Math.PI);
        ctx.stroke();

    }

    move() {
        this.posX += this.vitesseX;
        this.posY += this.vitesseY;
    }

    /*
     * fonction qui teste la collision de la zone du canvas
     */
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

    /*
     * fonction qui retire des pv au joueur
     */
    retirerPvJoueur(nbr){
        this.pv-=nbr/2;
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
        this.taille=15;
        this.img=new Image();

    }

    draw(ctx){
        ctx.save();

        if(this.nom === "invincible"){
            this.img.src="../ressources/star_yellow.png"
        }
        else if(this.nom === "degat"){
            this.img.src="../ressources/thunder.png"
        }
        ctx.drawImage(this.img,this.posX,this.posY);



        ctx.restore();
    }

    /*
    * fonction qui effectues les différentes actions de l'atout  (se trouve dans la boucle d'animation)
    */
    actionsAtout(ctx,player){
        this.draw(ctx);
        if(this.touched(player)){
            player.DispoAtout(this.nom);
            this.pv=0;
        }

    }

    /*
     * fonction qui renvoie si l'atout touche le joueur ou pas
     */
    touched(player) {
        return ((this.posX <= player.posX && (player.posX <= (this.posX + this.taille )) || (player.posX + player.height) >= this.posX && player.posX <= (this.posX + this.taille))) && ((this.posY <= player.posY && (player.posY <= (this.posY + this.taille)) || (player.posY + player.width) >= this.posY && player.posY <= (this.posY + this.taille)));

    }

}
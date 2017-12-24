class Vie{
    constructor(posX,posY,vitesse,pvRendu){
        this.posX = posX;
        this.posY= posY;
        this.vitesse=vitesse;
        this.vitesseX=vitesse;
        this.vitesseY=vitesse;
        this.pv=1;
        this.taille = 15;
        this.pvRendu=25;
        this.img=new Image();
        this.img.src='../ressources/heart.png';
    }

    draw(ctx) {
        ctx.save();

        ctx.drawImage(this.img,this.posX ,this.posY);

        ctx.restore();
    }

    move(){
        this.posY +=this.vitesse;
    }

    /*
     * fonction qui renvoie si la vie touche le joueur ou pas
    */
    touched(player) {
        return ((this.posX <= player.posX && (player.posX <= (this.posX + this.taille)) || (player.posX + player.height) >= this.posX && player.posX <= (this.posX + this.taille))) && ((this.posY <= player.posY && (player.posY <= (this.posY + this.taille)) || (player.posY + player.width) >= this.posY && player.posY <= (this.posY + this.taille)));
    }

    /*
     * fonction qui ajoute des pv au joueur
    */
    ajoutPv(player){
        if(player.pv >= 100-this.pvRendu/2){
            player.pv = 100;
        }else{
            player.pv += this.pvRendu/2;
        }
    }

    /*
     * fonction qui renvoie si la vie est en dehors du canvas ou pas
    */
    VieEnDehorsCadre(h){
        return (this.posY) > h;
    }

    /*
     * fonction qui ajoute les pv au joueur si celui si le touche et fais aussi disparaitre la vie (pv =0)
    */
    AjoutPvQuandTouche(player){
        if(this.touched(player)) {
            this.pv=0;
            this.ajoutPv(player);

        }
    }
    /*
     * fonction qui effectues les différentes actions de la vie  (se trouve dans la boucle d'animation)
    */
    actionsVie(ctx,player,h){
        this.draw(ctx);
        this.move(ctx);

        if(this.VieEnDehorsCadre(h)){
            this.pv=0;
        }

        this.AjoutPvQuandTouche(player);
    }

}
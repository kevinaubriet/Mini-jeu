class Vie{
    constructor(posX,posY,taille,vitesse,pvRendu){
        this.posX = posX;
        this.posY= posY;
        this.vitesse=vitesse; //vitesse maximale
        this.vitesseX=vitesse;
        this.vitesseY=vitesse;
        this.pv=1;
        this.taille = taille;
        this.pvRendu=25;
    }

    draw(ctx) {
        ctx.save();

        ctx.fillStyle = "red";
        ctx.fillRect(this.posX, this.posY, this.taille, this.taille);

        ctx.restore();
    }

    move(){
        this.posY +=this.vitesse;
    }

    touched(player) {
        return ((this.posX <= player.posX && (player.posX <= (this.posX + this.taille)) || (player.posX + player.height) >= this.posX && player.posX <= (this.posX + this.taille))) && ((this.posY <= player.posY && (player.posY <= (this.posY + this.taille)) || (player.posY + player.width) >= this.posY && player.posY <= (this.posY + this.taille)));
    }

    ajoutPv(player){
        if(player.pv >= 100-this.pvRendu/2){
            player.pv = 100;
        }else{
            player.pv += this.pvRendu/2;
        }
    }

    VieEnDehorsCadre(h){
        return (this.posY) > h;
    }

    AjoutPvQuandTouché(player){
        if(this.touched(player)) {
            this.pv=0;
            this.ajoutPv(player);
        }
    }

    actionsVie(ctx,player,h){  //differentes actions effectuées dans la boucle d'animation
        this.draw(ctx);
        this.move(ctx);

        if(this.VieEnDehorsCadre(h)){
            this.pv=0;
        }

        this.AjoutPvQuandTouché(player);
    }

}
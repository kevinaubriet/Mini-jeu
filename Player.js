class Player{
    constructor(posX,posY,vitesse){
        this.posX = posX;
        this.posY = posY;
        this.vitesse=vitesse;
        this.pv = 100;
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

}


class Atout{
    constructor(nom){
        this.nom = nom;
        this.dispo = false;
        this.activate = false;
    }



    
}
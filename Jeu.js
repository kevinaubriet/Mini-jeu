window.onload = init;

function init() {
    gf = new GameFramework();
    gf.init();
    console.log(gf.getTableauObjetsGraphiques());
}

function GameFramework(){
    var canvas,ctx,w,h,player;
    var inputStates = [];
    var tableauObjetGraphiques = [];

    function init() {

         canvas = document.querySelector("#myCanvas");
         ctx = canvas.getContext("2d");
         w = canvas.width;
         h = canvas.height;

        creerJoueur();
        creerEnnemisLeger(2);
       // creerEnnemisLourd(1);



        window.addEventListener('keydown', function(event) {

            if (event.keyCode === 90) {
                inputStates.up = true;
                player.vitesseY=-player.vitesse;
            } else if (event.keyCode === 81) {
                inputStates.left = true;
                player.vitesseX=-player.vitesse;

            } else if (event.keyCode === 83) {
                inputStates.down = true;
                player.vitesseY=player.vitesse;

            } else if (event.keyCode === 68) {
                inputStates.right = true;
                player.vitesseX=player.vitesse;

            } else if (event.keyCode === 32) {
                inputStates.space = true;

            }
        }, false);

        window.addEventListener('keyup', function(event) {

            if (event.keyCode === 90) {
                inputStates.up = false;
                player.vitesseY=0;
            } else if (event.keyCode === 81) {
                inputStates.left = false;
                player.vitesseX=0;

            } else if (event.keyCode === 83) {
                inputStates.down = false;
                player.vitesseY=0;

            } else if (event.keyCode === 68) {
                inputStates.right = false;
                player.vitesseX=0;

            } else if (event.keyCode === 32) {
                inputStates.space = false;

            }
        }, false);



        requestAnimationFrame(anime);
    }

    function creerJoueur(){

        var x =100;
        var y = 100;//h - 50;
        var pv=100;
        var v = 5;                //Pour changer la vitesse en fonction du niveau ajouter les modif de cette variable dans le constructeur

        //console.log(w+"  "+h+" monContext " + ctx +" monThis " +this );

        var p1 = new Player(x, y, v,pv);
        p1.ActiverArme("fusil_normal");
        p1.ActiverArme("fusil_sniper");
        p1.DispoAtout("invincible");
        p1.ActiverAtout("invincible");
        console.log(p1.getArmeActive());

        player=p1;
        tableauObjetGraphiques.push(p1);
    }

    function creerEnnemisLeger(n){

        for(var i = 0; i < n; i++) {

            let taille=15;
            let x = w * Math.random();
            let y = 0-taille;
            let vitesse=1;
            let pv=50;
            let r = Math.round(255 * Math.random());
            let g = Math.round(255 * Math.random());
            let b = Math.round(255 * Math.random());
            let couleur = "rgb(" + r + "," + g + "," + b + ")";
            let vx = 0 * Math.random();
            min=3;
            max=6;
            //let vy = (Math.random()*(max-min))+min;
            //let vy = 5 * Math.random();
            let rayon = 10+60*Math.random();


            var e = new EnnemiLeger(x,y,"s",taille,vitesse,pv);

            tableauObjetGraphiques.push(e);
        }
    }

    function creerEnnemisLourd(n){

        for(var i = 0; i < n; i++) {

            let taille=30;
            let x = w * Math.random();
            let y = 0-taille;
            let vitesse=1;
            let pv=100;
            let r = Math.round(255 * Math.random());
            let g = Math.round(255 * Math.random());
            let b = Math.round(255 * Math.random());
            let couleur = "rgb(" + r + "," + g + "," + b + ")";
            min=3;
            max=6;
            //let vy = (Math.random()*(max-min))+min;
            //let vy = 5 * Math.random();
            let rayon = 10+60*Math.random();


            var e = new EnnemiLourd(x,y,"l",taille,vitesse,pv);

            tableauObjetGraphiques.push(e);
        }
    }


    function killMe(e) {
        if(e.pv<=0){
            tableauObjetGraphiques.splice(tableauObjetGraphiques.indexOf(e),1);
            console.log(tableauObjetGraphiques);
            return true;
        }
        else return false;
    }

    function anime(timmeElapsed) {
        ctx.clearRect(0, 0, w, h);

        tableauObjetGraphiques.forEach(function (e) {  //e pour element du tableau

            killMe(e);

            if (e instanceof Player){
                e.actionsPlayer(ctx,w,h);
            }

           else if (e instanceof Ennemi){
                e.actionsEnnemi(ctx,w,h,player);
            }

        });



        requestAnimationFrame(anime);
    }


    function getTableauObjetsGraphiques() {
        return tableauObjetGraphiques;
    }

    return {
        init:init,
        /*creerJoueur:creerJoueur,
        creerEnnemisLeger:creerEnnemisLeger,
        creerEnnemisLourd:creerEnnemisLourd,*/
        getTableauObjetsGraphiques:getTableauObjetsGraphiques

  }



}

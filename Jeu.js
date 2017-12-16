window.onload = init;

function init() {
    gf = new GameFramework();
    gf.creerJoueur();
    gf.creerEnnemisLeger(2);
    gf.creerEnnemisLourd(1);
    gf.init();
}

function GameFramework(){
    let canvas, ctx, w, h;
    let tableauObjetGraphiques = [];

    function init() {

        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;


        requestAnimationFrame(anime);
    }

    function creerJoueur(){

        var x = w/2;
        var y = h - 50;
        var v = 0;

        var p1 = new Player(x, y, v);
        p1.ActiverArme("fusil_normal");
        p1.ActiverArme("fusil_sniper");
        p1.DispoAtout("invincible");
        p1.ActiverAtout("invincible");
        console.log(p1.getArmeActive());

        tableauObjetGraphiques.push(p1);
    }

    function creerEnnemisLeger(n){

        for(var i = 0; i < n; i++) {

            let x = w * Math.random();
            let y = 0 * Math.random();
            let r = Math.round(255 * Math.random());
            let g = Math.round(255 * Math.random());
            let b = Math.round(255 * Math.random());
            let couleur = "rgb(" + r + "," + g + "," + b + ")";
            let vx = 0 * Math.random();
            min=3;
            max=6;
            let vy = (Math.random()*(max-min))+min;
            //let vy = 5 * Math.random();
            let rayon = 10+60*Math.random();


            var e = new EnnemiLeger(x,y,"s");

            tableauObjetGraphiques.push(e);
        }
    }

    function creerEnnemisLourd(n){

        for(var i = 0; i < n; i++) {

            let x = w * Math.random();
            let y = 0 * Math.random();
            let r = Math.round(255 * Math.random());
            let g = Math.round(255 * Math.random());
            let b = Math.round(255 * Math.random());
            let couleur = "rgb(" + r + "," + g + "," + b + ")";
            let vx = 0 * Math.random();
            min=3;
            max=6;
            let vy = (Math.random()*(max-min))+min;
            //let vy = 5 * Math.random();
            let rayon = 10+60*Math.random();


            var e = new EnnemiLourd(x,y,"l");

            tableauObjetGraphiques.push(e);
        }
    }

    function anime(timmeElapsed) {
        ctx.clearRect(0, 0, w, h);



        requestAnimationFrame(anime);
    }


    return {
        init:init,
        creerJoueur:creerJoueur,
        creerEnnemisLeger:creerEnnemisLeger,
        creerEnnemisLourd:creerEnnemisLourd,
    }



}

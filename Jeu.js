window.onload = init;

function init() {
    gf = new GameFramework();
    gf.creerJoueur();
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

        console.log(p1.armes[1]);
        tableauObjetGraphiques.push(p1);
    }

    function anime(timmeElapsed) {
        ctx.clearRect(0, 0, w, h);



        requestAnimationFrame(anime);
    }

    return {
        init:init,
        creerJoueur:creerJoueur
    }
}

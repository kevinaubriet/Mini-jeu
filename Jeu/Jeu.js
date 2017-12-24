window.onload = init;
var particles = [];


function init() {
    gf = new GameFramework();
    gf.init();

}

function GameFramework(){
    var canvas,ctx,w,h,player,soundBool=true;
    var score = 0;
    var inputStates = [];
    var tableauObjetGraphiques = [];
    var etatPause = false;
    var tempsCreationEnemiLeger = 3000;     //intervalle de création des ennemis legers (au début du jeu)
    var tempsCreationEnemiLourd = 8000;     //intervalle de création des ennemis lourds (au début du jeu)


    function init() {

        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;

        creerJoueur();
        changeIntervalle();
        creationAleatoireEnemiLeger();
        creationAleatoireEnemiLourd();
        creationAleatoireBonus();

        //option Sonores
        soundMusic();

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
                if((player.pv > 0) && (!etatPause)){
                    tir(Date.now());
                }
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

        window.addEventListener('keydown', function(event) {

            if(event.keyCode === 73){
                if((player.pv > 0) && (!etatPause)){
                    if(player.getArmeActive().nom !== "fusil_normal"){
                        player.ActiverArme("fusil_normal");
                    }

                }

            } else if(event.keyCode === 79){
                if((player.pv > 0) && (!etatPause)){
                    if(player.getArmeActive().nom !== "fusil_pompe"){
                        player.ActiverArme("fusil_pompe");
                    }
                }

            }else if(event.keyCode === 80){
                if((player.pv > 0) && (!etatPause)){
                    if(player.getArmeActive().nom !== "fusil_sniper"){
                        player.ActiverArme("fusil_sniper");
                    }
                }

            }else if(event.keyCode === 77){
                if((player.pv > 0) && (!etatPause)){
                    player.ActiverAtout("invincible");
                    soundAtout();

                }

            }else if(event.keyCode === 76){
                if((player.pv > 0) && (!etatPause)){
                    player.ActiverAtout("degat");
                    soundAtout();
                }

            }else if (event.keyCode === 78){
                if(etatPause){
                    etatPause = false;
                    creationAleatoireEnemiLeger();
                    creationAleatoireEnemiLourd();
                }else etatPause = true;
            }
        }, false);

        requestAnimationFrame(anime);
    }

    /*
     * fonction qui créer un joueur en l'ajoutant dans le tableauObjetGraphiques, active aussi une arme à ce joueur
     */
    function creerJoueur(){

        let x =w/2-10;
        let y = h*0.8;
        let pv=100;
        let v = 5;

        let p1 = new Player(x, y, v,pv);
        p1.ActiverArme("fusil_normal");
        player=p1;
        tableauObjetGraphiques.push(p1);
    }

    /*
     * fonction qui créer un atout en l'ajoutant dans le tableauObjetGraphiques
     */
    function creerAtout(){
        let s;
        let x = w * Math.random();
        let y = h * Math.random();
        let random = Math.floor(Math.random() * 2);

        if(random === 0){
            s = "invincible";
        }else {
            s = "degat";
        }

        let e = new Atout(s,x,y);

        tableauObjetGraphiques.push(e);
    }

    /*
     * fonction qui créer une vie en l'ajoutant dans le tableauObjetGraphiques
     */
    function creerVie() {

            let x = (w-10) * Math.random();
            let y = 0-15;

            min=3;
            max=6;
            let vitesse=(Math.random()*(max-min))+min;

            let e = new Vie(x, y, vitesse,25);

            tableauObjetGraphiques.push(e);
    }

    /*
     * fonction qui créer un ou plusieurs ennemi leger en l'ajoutant dans le tableauObjetGraphiques
     */
    function creerEnnemisLeger(n){

        for(let i = 0; i < n; i++) {

            let taille=15;
            let x = (w-10) * Math.random();
            let y = 0-taille;

            min=1;
            max=2;
            let vitesse=(Math.random()*(max-min))+min;

            let e = new EnnemiLeger(x, y, "s", taille, vitesse);

            tableauObjetGraphiques.push(e);
        }
    }

    /*
     * fonction qui créer un ou plusieurs ennemi lourd en l'ajoutant dans le tableauObjetGraphiques
     */
    function creerEnnemisLourd(n){

        for(let i = 0; i < n; i++) {

            let taille=30;
            let x = w * Math.random();
            let y = 0-taille;
            let vitesse=1;

            let e = new EnnemiLourd(x, y, "l", taille, vitesse);

            tableauObjetGraphiques.push(e);

        }
    }

    /*
     * fonction qui permet de creer des ennemis legers dans un intervalle de temps donné (intervalle qui diminue avec le temps)
     */
    function creationAleatoireEnemiLeger(){

        if((player.pv > 0) && (!etatPause) ){

            creerEnnemisLeger(1);

            setTimeout(function () {
                creationAleatoireEnemiLeger();
            },tempsCreationEnemiLeger);
        }

    }

    /*
     * fonction qui permet de creer des ennemis lourds dans un intervalle de temps donné (intervalle qui diminue avec le temps)
     */
    function creationAleatoireEnemiLourd(){
        if((player.pv > 0) && (!etatPause) ){

            creerEnnemisLourd(1);

            setTimeout(function () {
                creationAleatoireEnemiLourd();
            },tempsCreationEnemiLourd);
        }
    }

    /*
     * fonction qui permet de creer des atouts et des vies dans un intervalle de temps donné
     */
    function creationAleatoireBonus(){
        setInterval(function() {
            if((player.pv > 0) && (!etatPause) ){
                creerAtout();
                creerVie();
            }
        }, 15000);
    }

    /*
     * fonction qui change l'intervalle d'apparition des ennemis (l'intervalle diminue avec le temps pour augmenter la difficulté)
     */
    function changeIntervalle() {
        setInterval(function () {
            if((player.pv > 0) && (!etatPause) ){
                if(tempsCreationEnemiLourd>1000){
                    tempsCreationEnemiLourd -= 150;
                }
                if(tempsCreationEnemiLeger>500){
                    tempsCreationEnemiLeger -= 100;
                }

            }
        },5000);

    }

    /*
     * fonction qui permet de creer des projectiles
     * les projectiles sont créer en fonction de l'arme active
     * la cadence des tirs des projectiles est aussi géré en fonction de l'arme active
     */
    function tir(time) {
        let projectile;
        let tempEcoule = 0;


        let armeCourante = player.getArmeActive();

        if(armeCourante instanceof FusilNormal){
            projectile = new Projectile("carrée",25*player.multDegat,3,0,player.posX+player.width/2,player.posY,"red",armeCourante.nom);

        }else if(armeCourante instanceof FusilSniper){
            projectile = new Projectile("carrée", 200* player.multDegat, 10, 0, player.posX + player.width / 2, player.posY, "white", armeCourante.nom);

        }else if(armeCourante instanceof FusilPompe){
            let cone = 0.25;
            var p1 = new Projectile("carrée",75*player.multDegat,7,0,player.posX+player.width/2,player.posY,"blue",armeCourante.nom);
            var p2 = new Projectile("carrée",75*player.multDegat,7,cone,(player.posX+player.width/2),player.posY,"blue",armeCourante.nom);
            var p3 = new Projectile("carrée",75*player.multDegat,7,-cone,(player.posX+player.width/2),player.posY,"blue",armeCourante.nom);
            var p4 = new Projectile("carrée",75*player.multDegat,7,cone*2,(player.posX+player.width/2),player.posY,"blue",armeCourante.nom);
            var p5 = new Projectile("carrée",75*player.multDegat,7,-cone*2,(player.posX+player.width/2),player.posY,"blue",armeCourante.nom);
        }

        if(this.lastBulletTime !== undefined) {
            tempEcoule = time - this.lastBulletTime;
        }

        if((this.lastBulletTime === undefined) || (tempEcoule> armeCourante.cadence)) {
            if(armeCourante instanceof FusilPompe){
                tableauObjetGraphiques.push(p1);
                tableauObjetGraphiques.push(p2);
                tableauObjetGraphiques.push(p3);
                tableauObjetGraphiques.push(p4);
                tableauObjetGraphiques.push(p5);
            }else{
                tableauObjetGraphiques.push(projectile);
            }
            // on mémorise le dernier temps.
            this.lastBulletTime = time;
            soundFire();
        }
    }


    /*
     * fonction qui permet de supprimer les éléments du tableauObjetGraphiques (les suppriment si les pv des éléments sont égaux à 0)
     * si le joueur est tué alors la partie est terminée
     * si un ennemi est tué alors il créer une explosion et un son
     * si une vie est récupéré par le joueur alors la vie émet un son
     */
    function killMe(e) {
        if(e.pv<=0){

            tableauObjetGraphiques.splice(tableauObjetGraphiques.indexOf(e),1);
            if(e instanceof Player){
                youFail();
            }
            if(e instanceof Ennemi){
                if(!e.EnnemiEnDehorsCadre(h)) {
                    startDoubleExplosion((e.posX + e.taille / 2), (e.posY + e.taille / 2));
                    soundExplo();
                }
                     addScore(25,e,player,h);

            }
            if(e instanceof Vie){
                soundLifeUp();
            }
            return true;
        }
        else return false;
    }

    /*
     * fonction qui augmente le score si un ennemi est tué par le joueur
     */
    function addScore(valScore,ennemi,player,h) {
        if(!ennemi.touched(player) && !ennemi.EnnemiEnDehorsCadre(h)){
            score+=valScore;

        }
    }

    /*
     * fonction qui draw le score
     */
    function drawScore(ctx) {
        ctx.save();

        ctx.fillStyle = "white";
        ctx.font="30px Georgia";
        ctx.fillText(score,10,30);

        ctx.restore();
    }

    /*
     * fonction qui gère les affichages
     */
    function actionJeu(e,ctx) {
        killMe(e);
        if(particles.length!==0){
            updateAndDrawParticules(1,ctx)
        }
        drawScore(ctx);
        affichageArme();
        affichageAtout();
    }

    /*
     * boucle d'animation
     */
    function anime(timmeElapsed) {
        ctx.clearRect(0, 0, w, h);

        if(!etatPause){

        tableauObjetGraphiques.forEach(function (e) {  //e pour element du tableau

            actionJeu(e,ctx);

            if (e instanceof Player){
                e.actionsPlayer(ctx,w,h);
            }

            else if (e instanceof Ennemi){
                e.actionsEnnemi(ctx,w,h,player);

            }
            else if (e instanceof Projectile){
                e.actionsProjectile(ctx,w,h,player,tableauObjetGraphiques);

            }
            else if (e instanceof Atout){
                e.actionsAtout(ctx,player);

            }else if(e instanceof Vie){
                e.actionsVie(ctx,player,h);

            }
        });
        }else{
            youPause();
        }

        requestAnimationFrame(anime);
    }


    function getTableauObjetsGraphiques() {
        return tableauObjetGraphiques;
    }

    /*
     * fonction qui permet de gérer l'affichage des armes actives ou non (en dehors du canvas)
     */
    function affichageArme(){
        let armeActive = player.getArmeActive().nom;


        //met tous les couleur des indicateurs de selection d'arme en noir
        document.getElementById("fusil_normal").style.backgroundColor = "black";
        document.getElementById("fusil_pompe").style.backgroundColor = "black";
        document.getElementById("fusil_sniper").style.backgroundColor = "black";

        elem = document.getElementById(armeActive);
        elem.style.backgroundColor = "gold";
    }

    /*
     * fonction qui de gérer l'affichage des atouts qui sont dispo ou pas, ainsi que leur activation ( en dehors du canvas)
     */
    function affichageAtout() {
        let atouts = player.atouts;

        for(let i=0;i<atouts.length;i++){

            if(atouts[i].dispo){
                if(atouts[i].activate){
                    document.getElementById(atouts[i].nom).style.backgroundColor = "gold";
                }else{
                    let nomimg = atouts[i].nom+"img";

                    document.getElementById(atouts[i].nom).style.backgroundColor = "black";
                    document.getElementById(nomimg).style.display="block";

                }
            }
            else{
                if(atouts[i].activate){
                    let nomimg = atouts[i].nom+"img";

                    document.getElementById(atouts[i].nom).style.backgroundColor = "gold";
                    document.getElementById(nomimg).style.display="block";
                }else{
                    let nomimg = atouts[i].nom+"img";

                    document.getElementById(atouts[i].nom).style.backgroundColor = "black";
                    document.getElementById(nomimg).style.display="none";
                }
            }

        }
    }

    /*
     * fonction qui permet d'activer ou de désactiver la musique d'arriere plan
     */
    function soundMusic() {
        let player = document.querySelector("#audioPlayer");
        let sonImg = document.querySelector("#sonImg");

        document.querySelector("#son").addEventListener('click',function (e) {
            if(soundBool===true){
                sonImg.src="../ressources/sOff.png";
                player.pause();
                soundBool=false;
            }
            else {
                sonImg.src = "../ressources/sOn.png";
                player.play();
                soundBool=true;
            }

        });

    }

    /*
     * fonction qui active le bruit d'une arme qui tire
     */
    function soundFire() {
        if(soundBool){
            var soundFire =document.querySelector("#soundFire");
            soundFire.pause();
            soundFire.currentTime=0;
            soundFire.play();
        }
    }

    /*
     * fonction qui active le bruit d'une explosion d'un ennemi quand il meurt
     */
    function soundExplo() {
        if(soundBool){
            var soundExplo =document.querySelector("#soundExplo");
            soundExplo.pause();
            soundExplo.currentTime=0;
            soundExplo.play();
        }
    }

    /*
     * fonction qui active le bruit d'un atout activé par le joueur
     */
    function soundAtout() {
        if(soundBool){
            var soundAtout =document.querySelector("#soundAtout");
            soundAtout.pause();
            soundAtout.currentTime=0;
            soundAtout.play();
        }
    }

    /*
     * fonction qui active le bruit d'une vie récupéré par le joueur
     */
    function soundLifeUp() {
        if(soundBool){
            var soundUp =document.querySelector("#soundLife");
            soundUp.pause();
            soundUp.currentTime=0;
            soundUp.play();
        }
    }


    /*
     * fonction qui permet d'afficher le menu de lose et d'arreter toutes les actions
     */
    function youFail() {


        etatPause=true;
        document.querySelector("#armes").className = "hidden";
        document.querySelector("#atouts").className = "hidden";
        document.querySelector("#son").className = "hidden";

        tableauObjetGraphiques = [];
        particles=[];

        let menu = document.querySelector("#theMenu");
        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let input = document.createElement("input");

        h1.innerText="You Lose !";
        h1.id="youLose";
        p.innerText="Score : "+score;
        p.id="Score";
        input.type="submit";
        input.value="Retry";
        input.id="bRetry";
        input.addEventListener("click",function () {
            window.location.reload(false);
        });


        menu.appendChild(h1);
        menu.appendChild(p);
        menu.appendChild(input);

        menu.className="";

    }

    /*
     * fonction permet d'afficher le menu de pause et d'arreter toutes les actions
     */
    function youPause() {
        if(etatPause=player.pv > 0) {

            ctx.fillStyle = "white";
            ctx.font="90px Badass";
            ctx.fillText("Resume",w/8,h/5);

            ctx.fillStyle = "white";
            ctx.font="40px Badass";
            ctx.fillText("Score : " + score,w/4,h/2.30);

            ctx.fillStyle = "white";
            ctx.font="30px Badass";
            ctx.fillText("Press N to resume",w/4.5,h/1.1);

            //remet les caracteres par defaut
            ctx.font="10px Times";
        }
    }

    return {
        init:init
    }



}

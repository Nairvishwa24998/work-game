let player1chosen = "";
let player2chosen = "";
function newgame(){
    // Only open if both players have been chosen
    if (player1chosen !== "" && player2chosen !== "")
    {window.open("newgame.html","_self");}
}

function characterchoose(id){
    if (player1chosen === ""){
        let audi = new Audio('characterselectionsound.mp3');
        player1chosen = id;
        let player1 = document.getElementById(id);
        player1.style.backgroundColor = "blue";
        audi.play();
    
    }
    if (player1chosen !== "" && player2chosen === "" & player1chosen !== id){
        let audi = new Audio('characterselectionsound.mp3');
        player2chosen = id;
        let player2 = document.getElementById(id);
        player2.style.backgroundColor = "red";
        audi.play();
    }
}
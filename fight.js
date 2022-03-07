// The height and width of window
let pagewidth = window.innerWidth;
let pageheight = window.innerHeight;

// valueas to store which player has been chosen 
let player1chosen = "";
let player2chosen = "";

// Image allotment
let walkl = ["defaultmoves/Walk1l.png", "defaultmoves/Walk2l.png"];
let walkr = ["defaultmoves/Walk1r.png", "defaultmoves/Walk2r.png"];
let punchl = "defaultmoves/punchl.png";
let punchr = "defaultmoves/punchr.png";
let kickl = "defaultmoves/kickl.png"
let kickr = "defaultmoves/kickr.png";
let blockl = "defaultmoves/blockl.png";
let blockr = "defaultmoves/blockr.png";

const characterstore = 
{
    playerone: 
    {
        Ignis:
        { 
        walkright: ["charfiremoves/Walk1r.png","charfiremoves/Walk2r.png"], 
        punchright: "charfiremoves/punchr.png",
        kickright: "charfiremoves/kickr.png",
        blockright: "charfiremoves/blockr.png"
        },

        Aqua:
        { 
        walkright: ["charwatermoves/Walk1r.png","charwatermoves/Walk2r.png"],
        punchright: "charwatermoves/punchr.png",
        kickright: "charwatermoves/kickr.png",
        blockright: "charwatermoves/blockr.png"
        },

        Viridis:
        { 
        walkright: ["chargreenmoves/Walk1r.png","chargreenmoves/Walk2r.png"], 
        punchright: "chargreenmoves/punchr.png",
        kickright: "chargreenmoves/kickr.png",
        blockright: "chargreenmoves/blockr.png"
        },

        Electrico:
        { 
        walkright: ["charelectricity/Walk1r.png","charelectricity/Walk2r.png"],
        punchright: "charelectricitymoves/punchr.png",
        kickright: "charelectricitymoves/kickr.png",
        blockright: "charelectricitymoves/blockr.png"
        }

    },
    playertwo: 
    {
        Ignis:
        { 
        walkleft: ["charfiremoves/Walk1l.png","charfiremoves/Walk2l.png"], 
        punchleft: "charfiremoves/punchl.png",
        kickleft: "charfiremoves/kickl.png",
        blockleft: "charfiremoves/blockl.png"
        },

        Aqua:
        { 
        walkleft: ["charwatermoves/Walk1l.png","charwatermoves/Walk2l.png"], 
        punchleft: "charwatermoves/punchl.png",
        kickleft: "charwatermoves/kickl.png",
        blockleft: "charwatermoves/blockl.png"
        },

        Viridis:
        { 
        walkleft: ["chargreenmoves/Walk1l.png","chargreenmoves/Walk2l.png"], 
        punchleft: "chargreenmoves/punchl.png",
        kickleft: "chargreenmoves/kickl.png",
        blockleft: "chargreenmoves/blockl.png"
        },

        Electrico:
        { 
        walkleft: ["charelectricitymoves/Walk1l.png","charelectricitymoves/Walk2r.png"], 
        punchleft: "charelectricitymoves/punchl.png",
        kickleft: "charelectricitymoves/kickl.png",
        blockleft: "charelectricitymoves/blockl.png"
        }


    },

};



// Remember to keep the timer here otherwise it would not reduce 
let starttime = 180;
let lifel = 100;
let lifer = 100;
let result = "";

// initial position and speed
let position = 0;
let movement = 1;

// X Co-ordinate of players facing right and left respectively
let xr = 50;
let xl = 1286;
let gameover = false;

// controls player1
const controlsplayer1 = {
    "a": false,
    "d": false,
    "j": false,
    "k": false,
    " ": false,
};

// const player2
const controlsplayer2 = {
    "ArrowLeft": false,
    "ArrowRight": false,
    "4": false,
    "5": false,
    "0": false,
};

// function to open new game window only if two players have been selected
function newgame(){
    // Only open if both players have been chosen
    if (player1chosen !== "" && player2chosen !== "")
    {window.open("newgame.html","_self");}
}

//function to choose a character by obtaining id
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
    // allotting moveset for player1
    walkr = characterstore[playerone][player1chosen][walkright];
    punchr = characterstore[playerone][player1chosen][punchright];
    kickr = characterstore[playerone][player1chosen][kickright];
    blockr = characterstore[playerone][player1chosen][blockright];

    //allotting moveset for player2
    walkl = characterstore[playertwo][player2chosen][walkleft];
    punchl = characterstore[playertwo][player2chosen][punchleft];
    kickl = characterstore[playertwo][player2chosen][kickleft];
    blockl = characterstore[playertwo][player2chosen][blockleft];

}


// function to check whether the items are colliding 
function collision(xl,xr){
    if (Math.abs(xl - xr) <= 250){
        return true;
    }
    return false;
}

// function to keep track of time. SetInterval runs it 
function timer(){
    if (starttime <= 0){document.getElementById("timer").innerHTML = "END"; starttime = 0;}
    else{
    document.getElementById("timer").innerHTML = starttime;
    starttime = starttime - 1;}
    return starttime;
}

// function for stand and walk pose of character
function spawn(){
    let character1 = document.getElementById("Walk1r");
    let character2 = document.getElementById("Walk1l");
    character1.src = walkr[position];
    character2.src = walkl[position];
    position = (position + 1)%2;
    return position;
}

// function to keep tab of life of each player
function life(){
   document.getElementById('lifeR').innerHTML = lifer + '%';
   document.getElementById('lifeL').innerHTML = lifel + "%";
   if (Math.min(lifel,lifer) <= 0){
       if (lifel < lifer){
           lifel = 0;
           result = "player1";
       }
       else if (lifel > lifer){
           lifer = 0;
           result = "player2";
       }
       else if (lifel === lifer === 0){
           result = "draw"
       }
    }
   return result;
}

function run(){
    let movement = 10; 
    // let character1 = document.getElementById("Walk1r");
    // let character2 = document.getElementById("Walk1l");
    // character1.src = walkr[position];
    // character2.src = walkl[position];
    // position = (position + 1)%2;
    setInterval(timer,1000);
    setInterval(spawn,500);
    setInterval(life,1);
    // detecting a key being pressed down
    document.body.addEventListener('keydown',function(event){
        let key = event.key;

        // check in which of the objects it falls so that you can set corrresponding controls to true
        if (key in Object(controlsplayer1)){
            controlsplayer1[key] = true;
            console.log(controlsplayer1);
        }
        if (key in Object(controlsplayer2)){
            controlsplayer2[key] = true;
            console.log(controlsplayer2);
        }

        // Implementing actions based on corresponding controls
        if (controlsplayer1["d"] === true){
            let character1 = document.getElementById("Walk1r");
            let character2 = document.getElementById("Walk1l");
            if (collision(xl,xr)){
                // this would make both characters stop where they are
                xr = xr - 0;
                xl = xl + 0;
            }
            // if there is no collision allow them to move
            else{
            xr = xr + movement;
            }
            // updating positiions accordingly
            character1.style.left = xr + 'px';
            character2.style.left = xl + 'px';
        }
        if (controlsplayer1["a"] === true){
            let character1 = document.getElementById("Walk1r");
            xr = xr - movement;
            character1.style.left = xr + 'px';
        }
        if (controlsplayer2["ArrowRight"] === true){
            let character2 = document.getElementById("Walk1l");
            xl = xl + movement;
            character2.style.left = xl + 'px';
        }
        if (controlsplayer2["ArrowLeft"] === true){
            let character1 = document.getElementById("Walk1r");
            let character2 = document.getElementById("Walk1l");
            if (collision(xl,xr)){
                xr = xr - 0;
                xl = xl + 0;
            }
            else{
            xl = xl - movement;
            }
            character1.style.left = xr + 'px';
            character2.style.left = xl + 'px';
        }
        if (controlsplayer1["j"] === true){
            let audi = new Audio('punch.mp3');
            if(collision(xl,xr)){
                if (controlsplayer2["5"] === false && controlsplayer2["0"] === false){
                    lifel = lifel - 10; 
                }
            audi.play()
            }
            let character1 = document.getElementById("Walk1r");
            character1.src = punchr;
        }
        if (controlsplayer1["k"] === true){
            let audi = new Audio('kick.mp3');
            if(collision(xl,xr)){
                if (controlsplayer2["5"] === false && controlsplayer2["0"] === false){
                    lifel = lifel - 20; 
                }
            audi.play()
            }
            let character1 = document.getElementById("Walk1r");
            character1.src = kickr;
          
        }
        if (controlsplayer1[" "] === true){
            let character1 = document.getElementById("Walk1r");
            character1.src = blockr;
        }
        if (controlsplayer2["5"] === true){
            let audi = new Audio('kick.mp3');
            if(collision(xl,xr)){
                if (controlsplayer1["k"] === false && controlsplayer1[" "] === false){
                    lifer = lifer - 20; 
                }
            audi.play()
            }
            let character2 = document.getElementById("Walk1l");
            character2.src = kickl;
        }
        if (controlsplayer2["4"] === true){
            let audi = new Audio('punch.mp3');
            if(collision(xl,xr)){
                if (controlsplayer1["k"] === false && controlsplayer1[" "] === false){
                    lifer = lifer - 10; 
                }
            audi.play()
            }
            let character2 = document.getElementById("Walk1l");
            character2.src = punchl;
        }
        if (controlsplayer2["0"] === true){
            let character2 = document.getElementById("Walk1l");
            character2.src = blockl;
        }
        
});

// You need to set the value for each key back to false when the key is lifted
document.body.addEventListener("keyup", function(event){
        let key = event.key;
        if (key in Object(controlsplayer1)){
            controlsplayer1[key] = false;
        }
        else if(key in Object(controlsplayer2)){
            controlsplayer2[key] = false;
        }
    });

}
setTimeout(run,500);


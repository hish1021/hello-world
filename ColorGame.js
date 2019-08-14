var numColors=6;
var colors = [];
var pickedColor;
var squares=document.getElementsByClassName("square");
var pickedDisplay=document.querySelector("#colorDisplay");
var messageDisplay=document.querySelector("#message");
var h1Display=document.querySelector("h1");
var resetButton=document.querySelector("#reset");
var modeButtons=document.querySelectorAll(".mode");


init();

//Play Again/New Colors reset button
resetButton.addEventListener("click",function(){
    resetGame();
})

function init(){
    setUpModeButtons();
    setUpSquares();
    resetGame();
}

function setUpModeButtons(){
    //Event listener for mode buttons
    for (var i=0;i<modeButtons.length;i++){
        modeButtons[i].addEventListener("click",function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // shorter if then statement below: if (condition) ?means then :colon means else
            this.textContent === "Easy" ? numColors = 3 : numColors = 6;
            resetGame();       
         })
    }
}

function setUpSquares(){
    for (var i=0;i<squares.length;i++){
        //add click listeners to squares
        squares[i].addEventListener("click",function(){
            //grab color of clicked square
            var sqrClicked=this.style.backgroundColor;
            //compare color to picked color
            if (sqrClicked===pickedColor){
                messageDisplay.textContent="Correct";
                resetButton.textContent="Play Again?";
                changeColors(pickedColor);
                h1Display.style.backgroundColor=pickedColor;
            }else{
                this.style.backgroundColor="#232323";
                messageDisplay.textContent="Try Again?";
            }
        });
    }
}

function changeColors(color){
    for (var i=0;i<squares.length;i++){
        squares[i].style.backgroundColor=color;
    }
}

function pickColor(){
    var num= Math.floor(Math.random()*colors.length);
    return colors[num];
}

function generateRandomColors(numberOfColors){
    var arrColors=[];
    for (var i=0;i<numberOfColors;i++){
        
        arrColors.push(randomColor());
    }
    return arrColors;
}

function randomColor(){
    //Generate Red
    var r= Math.floor(Math.random()*256).toString();
    //Generate Green
    var g= Math.floor(Math.random()*256).toString();
    //Generate Blue
    var b= Math.floor(Math.random()*256).toString();
    //format to rgb(r,g,b)
    var result= "rgb("+r+", "+g+", "+b+")";
    return result;
}

function resetGame(){
    //generate all new colors
    colors=generateRandomColors(numColors);
    //pick a new random color from array
    pickedColor=pickColor();
    //change h1display back to steelblue
    h1Display.style.backgroundColor="steelblue";
    //backgroundColor compatible with more browsers than just background
    //change colorDisplay to match picked color
    pickedDisplay.textContent=pickedColor;
    messageDisplay.textContent="";
    resetButton.textContent="New Colors";
    //change colors of squares
    for (var i=0;i<squares.length;i++){
        if (colors[i]){
            squares[i].style.display="block";
            squares[i].style.backgroundColor=colors[i];
        } else {
        squares[i].style.display="none";
        }
    }
}
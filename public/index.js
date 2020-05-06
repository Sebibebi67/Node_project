
// Wait for page to load
window.addEventListener('load', (event) => {
    titleAnimation();
    cursorFollow();
});

// Title animation
let titleText = "Hello, I'm Ally."
let titleAnimationInterval;

function titleAnimation(){
    let title = document.getElementById("title");
    
    let i = 0;
    titleAnimationInterval = setInterval(function(){
        title.innerHTML += titleText[i];
        i++
        if (i >= titleText.length){
            stopTitleAnimationInterval();
        }
    }, 200);
}

function stopTitleAnimationInterval(){
    clearTimeout(titleAnimationInterval);
}

// Follow cursor
let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;
let circle = {
    "x" : -100,
    "y" : -100,
    "w" : 100,
    "h" : 100,
    "div" : undefined,
    "update" : function(){
        let xn = circle.x-circle.w/2;
        let yn = circle.y-circle.w/2;
        circle.div.style.transform = "translateX(" + xn + "px) translateY(" + yn + "px)";
    }
};
let firstTime = true;

window.onmousemove = function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function cursorFollow(){
    //console.log(circle.div);
    circle.div = document.getElementById("circle");
    circle.div.style.left = 0;
    circle.div.style.top = 0;
    circle.div.style.opacity = 1;
    setInterval(function(){
        circle.x = lerp(circle.x, mouseX, 0.1);
        circle.y = lerp(circle.y, mouseY, 0.1);
        circle.update();
    }, 1000/60);
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}
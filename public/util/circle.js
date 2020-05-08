
// Wait for page to load
window.addEventListener('load', (event) => {
    cursorFollow();
});

// Follow cursor
let mouseX = -100;
let mouseY = -100;
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
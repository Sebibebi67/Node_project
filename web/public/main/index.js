
// Wait for page to load
window.addEventListener('load', (event) => {
    titleAnimation();
});

/*window.addEventListener( "pageshow", function ( event ) {
    let body = document.getElementById("body");
    body.style.transitionDuration = "0s";
    setTimeout(function() {
        body.style.transform = "translateX(0)";
    }, 10);
});*/

// Title animation
let titleText = "Hello, I'm Ally."
let displayedTitle = "";
let titleAnimationInterval;

function titleAnimation(){
    let title = document.getElementById("title");
    
    let i = 0;
    titleAnimationInterval = setInterval(function(){
        displayedTitle += titleText[i];
        title.innerHTML = displayedTitle + "</b></font>";
        title.innerHTML = title.innerHTML.replace("A","<font color=\"gold\"><b>A");
        i++
        if (i >= titleText.length){
            stopTitleAnimationInterval();
            displaySubtitle();
        }
    }, 100);
}

function stopTitleAnimationInterval(){
    clearTimeout(titleAnimationInterval);
}

function displaySubtitle(){
    let subtitle = document.getElementById("subtitle");
    subtitle.style.marginTop = "100px";
    subtitle.style.height = "100px";
    subtitle.style.opacity = 1;
}
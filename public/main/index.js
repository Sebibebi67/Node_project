
// Wait for page to load
window.addEventListener('load', (event) => {
    titleAnimation();
    clickAnimation();
});

window.addEventListener( "pageshow", function ( event ) {
    let body = document.getElementById("body");
    body.style.transform = "translateX(0)";
});

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
    }, 200);
}

function stopTitleAnimationInterval(){
    clearTimeout(titleAnimationInterval);
}

function displaySubtitle(){
    let subtitle = document.getElementById("subtitle");
    subtitle.style.marginTop = "80px";
    subtitle.style.height = "80px";
    subtitle.style.opacity = 1;
}

function clickAnimation() {
    let subtitle = document.getElementById("subtitle-link");
    
    subtitle.addEventListener('click', (event) => {
        let body = document.getElementById("body");
        body.style.transform = "translateX("+(-window.innerWidth)+"px)";

        setTimeout(function(){
            window.location.href = "./message-me";
        }, 1000)
    });
}
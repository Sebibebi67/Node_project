
//Tilte Animation
let titleText = "Hello, I'm Ally."
let titleAnimationInterval;

window.addEventListener('load', (event) => {
    let title = document.getElementById("title");
    
    let i = 0;
    titleAnimationInterval = setInterval(function(){
        title.innerHTML += titleText[i];
        i++
        if (i >= titleText.length){
            stopTitleAnimationInterval();
        }
        console.log('x');
    }, 200);

});

function stopTitleAnimationInterval(){
    clearTimeout(titleAnimationInterval);
}




video = document.getElementById('video');
video.load();

video.addEventListener('loadeddata', function() {
    video.play();
}, false);

video.addEventListener('click', function(){
    video.muted = !video.muted;
}, false);


let buttonNext = document.getElementById('next-btn') ;

buttonNext.addEventListener('click', function(){
    document.querySelector('.step-first').classList.add('hide');
    document.querySelector('.step-second').classList.remove('hide');

});


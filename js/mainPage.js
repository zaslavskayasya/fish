

video = document.getElementById('video');
video.load();

video.addEventListener('loadeddata', function() {
	video.play();
}, false);

video.addEventListener('click', function(){
	video.muted = !video.muted;
}, false);


// let buttonNext = document.getElementById('next-btn') ;

// buttonNext.addEventListener('click', function(){
//     document.querySelector('.step-first').classList.add('hide');
//     document.querySelector('.step-second').classList.remove('hide');

// });


let vSlider = $('#slider-vertical'),
	hSlider = $('#slider-gorizont');

hSlider.slick({
	infinite: false,
	vertical: false,
	arrows: true,
	dots: true,
	swipe: false,
});

vSlider.slick({
	infinite: false,
	arrows: false,
	dots: true,
	cssEase: 'linear',
	swipe: false
});

let vcs, hcs, vsc, hsc,
	touchStartX = 0,
	touchEndX = 0;

hSlider
	.on('touchstart', e => {
		touchStartX = e.changedTouches[0].screenX;
	})
	.on('touchend', e => {
		touchEndX = e.changedTouches[0].screenX,
		vcs = vSlider.slick('getSlick').currentSlide,
		hcs = hSlider.slick('getSlick').currentSlide,
		vsc = vSlider.slick('getSlick').slideCount-1,
		hsc = hSlider.slick('getSlick').slideCount-1;

		let screenX = e.currentTarget.clientWidth,
			proc = Math.round(screenX * .27);

		if (touchEndX < touchStartX - proc) {
			if (0 === hcs && vcs === vsc) {
				hSlider.slick('slickNext');
				if (vcs !== 0)
					vSlider.slick('slickGoTo', 0);
			} else if (0 === hcs)
				vSlider.slick('slickNext');
		} else if (touchEndX - proc > touchStartX) {
			if (0 !== hcs && vcs !== vsc)
				hSlider.slick('slickPrev');
			else if (0 !== vcs)
				vSlider.slick('slickPrev');
		}
});

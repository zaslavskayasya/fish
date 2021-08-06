let start_point = document.createElement('span'),
	end_point = document.createElement('span');

let fishSection = document.body.querySelector('.what_fish-section'),
	formSection = document.body.querySelector('section.form-section');


if (fishSection && formSection) {
	start_point.dataset.wrapper = 'start',
	start_point.style.top = `-${fishSection.clientHeight/5}px`;
	end_point.dataset.wrapper = 'end';

	fishSection.after(start_point);
	formSection.after(end_point);

	let {offsetTop: lineTop} = line = document.querySelector('.wrapper-line'),
		start = document.body.querySelector('[data-wrapper="start"]'),
		end = document.body.querySelector('[data-wrapper="end"]');

	let moving = function(){
		if (this.innerWidth >= 1280) {
			if (scrollY >= fishSection.offsetTop - start.offsetTop && scrollY < end.offsetTop) {
				line.style.opacity = 1;
				line.style.backgroundPositionY = lineTop - (scrollY - start.offsetTop) + 'px';
			} else {
				line.style.opacity = 0;
			}
		} else {
			line.style.opacity = 0;
		}
	};

	window.addEventListener('scroll', function(){
		moving();
	}, false);

	moving();
}
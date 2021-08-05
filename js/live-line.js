let start_point = document.createElement('span'),
	end_point = document.createElement('span');

start_point.dataset.wrapper = 'start',
start_point.style.top = '-150px';
end_point.dataset.wrapper = 'end';

let fishSection = document.body.querySelector('.what_fish-section'),
	formSection = document.body.querySelector('section.form-section');

fishSection.after(start_point);
formSection.after(end_point);

let {clientHeight: height, offsetTop: wrapperTop} = wrapper = document.querySelector('.wrapper'),
	start = document.body.querySelector('[data-wrapper="start"]'),
	end = document.body.querySelector('[data-wrapper="end"]');

let moving = function(){
		if (scrollY >= fishSection.offsetTop - start.offsetTop && scrollY < end.offsetTop) {
			wrapper.style.opacity = 1;
			wrapper.style.backgroundPositionY = wrapperTop - (scrollY - start.offsetTop) + 'px';
		} else {
			wrapper.style.opacity = 0;
		}
	};

window.addEventListener('scroll', function(){
	moving();
}, false);

moving();
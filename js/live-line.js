let point = document.createElement('span');
point.dataset.wrapper = 'end';
document.body.appendChild(point);

let {clientHeight} = wrapper = document.querySelector('.wrapper'),
	startPoint = document.body.querySelector('.what_fish-section').offsetTop,
	endPoint = document.body.querySelector('[data-wrapper="end"]').offsetTop;

let moving = function(){
		if (scrollY >= 1385) {
			wrapper.style.display = 'block';
		} else {
			wrapper.style.display = 'none';
		}
		
		if (scrollY >= startPoint){
			wrapper.style.height = clientHeight - scrollY + 'px';
		}
	};

window.addEventListener('scroll', function(){
	moving();
}, false);

moving();
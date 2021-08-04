let {offsetTop, clientHeight} = wrapper = document.body.querySelector('.wrapper'),
	extraOffset = 80,
	moving = function() {
		wrapper.style.height = clientHeight - this.scrollY - extraOffset;
	};

window.addEventListener('scroll', function(e){
	moving();
}, false);

moving();
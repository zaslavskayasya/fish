let elemEnd = document.createElement('span'), height;
elemEnd.dataset.wrapper = "end";
document.body.appendChild(elemEnd);

let {offsetTop: lineTop} = line = document.querySelector('.wrapper-line'),
		start = document.querySelector('body'),
		end = document.querySelector('[data-wrapper="end"]');

let moving = function(){
	if (this.innerWidth >= 1280) {
		let res = lineTop - scrollY;
		console.log(scrollY, res);

		if (!height)
			height = 0;

		if (height <= 65) {
			if (scrollY >= 15) {
				height += .3;
			} else if (scrollY >= 1680) {
				height += .15;
			} else {
				height = 0;
			}
		}

		if (scrollY >= 4100 && scrollY < 4800) {
			if (height >= 65 && height <= 100)
				height += .4;
		}
		
		line.style.height = height + "vh";
		line.style.opacity = 1;
		line.style.backgroundPositionY = res + 'px';
	} else {
		line.style.opacity = 0;
	}
};

window.addEventListener('scroll', function(){
	moving();
}, false);

moving();
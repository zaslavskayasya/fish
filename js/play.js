let YTframe = function(target, key){
	let el = document.createElement('iframe');
	el.src = `https://www.youtube.com/embed/${key}?controls=0&autoplay=1`;
	el.setAttribute("allowfullscreen", "");
	el.setAttribute("frameborder", "0");
	el.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
	target.appendChild(el);
}

document.querySelectorAll('.thumbnails__play').forEach(btn => {
	let thumb = btn.parentNode,
		thumbBg = thumb.lastElementChild,
		ytId = thumbBg.dataset.ytId;

	thumbBg.style.backgroundImage = `url('https://img.youtube.com/vi/${ytId}/hqdefault.jpg')`;

	btn.addEventListener('click', function(){
		YTframe(thumb.closest('.content__video'), ytId);
		thumb.style.display = 'none';
	}, false);
});
let fish = document.querySelector('img[alt="fish"]');

let src = num => `./img/lfish/1_00${num}.svg`;

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

if (fish) {
    let start, index, step, stepOffset, responsives = [];

    step = 12;

    if (innerWidth > 1380){
        start = 720,
        stepOffset = 60;
    } else if (innerWidth <= 768) {
        start = 385,
        stepOffset = 50;
    } else if (innerWidth <= 1024) {
        start = 335,
        stepOffset = 50;
    } else if (innerWidth <= 1280) {
        start = 600,
        stepOffset = 50;
    } else if (innerWidth <= 1380) {
        start = 420,
        stepOffset = 50;
    }

    index = start;

    for (let i = 0; i < step; i++) {
        responsives.push(index);
        index += stepOffset;
    }

    window.addEventListener('scroll', function(e){
        let scry = Math.round(scrollY);
        for (let i = 0; i < responsives.length; i++) {
            if (scry >= responsives[0]-stepOffset && scry <= responsives[responsives.length-1]+stepOffset)
                if (responsives[i] <= scry)
                    fish.src = src(zeroPad(i, 2));
        }

        // console.log(scry, start);
    });
}

let fish = document.querySelector('img[alt="fish"]');

if (fish) {
    window.addEventListener('scroll', function(e){
        let offset = this.pageYOffset;
        
        let state = {
            0: "00",
            720: "01",
            760: "02",
            800: "03",
            840: "04",
            880: "05",
            920: "06",
            960: "07",
            1000: "08",
            1040: "09",
            1080: "10",
            1120: "11",
            1160: "12",
            1200: "13"
        };

        for ([keyOffset, pic] of Object.entries(state))
            if (keyOffset <= offset)
                fish.src = `./img/lfish/1_00${pic}.svg`;
    });
}

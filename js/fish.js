let fish = document.querySelector('img[alt="fish"]');

if (fish) {
    window.addEventListener('scroll', function(e){
        let offset = this.pageYOffset;
        
        let state = {
            0: "00",
            820: "01",
            860: "02",
            900: "03",
            940: "04",
            980: "05",
            1020: "06",
            1060: "07",
            1100: "08",
            1140: "09",
            1180: "10",
            1220: "11",
            1260: "12",
            1300: "13"
        };

        for ([keyOffset, pic] of Object.entries(state))
            if (keyOffset <= offset)
                fish.src = `./img/lfish/1_00${pic}.svg`;
    });
}

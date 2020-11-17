let speed = 0;
let position = 0;
let rounded = 0;
let block = document.getElementById('block');
let elems = [...document.querySelectorAll('.n')];

window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0003;
    //wheel works for the touch
});

let objs = Array(5).fill({
    dist: 0
});

function raf() {
    // console.log(speed);
    position += speed;
    speed *= 0.8; //ZWIEKSZENIE sprawi, że szybkość nie będzie spadać

    objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1);

        //(position - i) to jest wartość 0 i potem rośnie, 
        //jedynka jest dana po to, by nie przekroczyło 1
        //jeśli nei będzie jedynki to może się scalować w nieskończoność
        //i te paski byłyby bardzo duże
        o.dist = Math.abs(o.dist);

        elems[i].style.transform = `scale(${o.dist})`;
    });

    rounded = Math.round(position);

    let diff = (rounded - position);

    // position += diff * 0.015;
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;
    //druga propzoycja działa szybciej.



    block.style.transform = `translate(0,${position*100 + 50}px`;
    // raf - request animation frame
    window.requestAnimationFrame(raf);
}

raf();
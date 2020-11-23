import Sketch from './threeScript.js';
import gsap from 'gsap';
let ske = new Sketch({
    dom: document.getElementById('container')
});

let attractMode = false;
let attractTo = 0;
let speed = 0;
let position = 0;
let rounded = 0;
let wrap = document.getElementById('wrap');
// let block = document.getElementById('block');
// let elems = [...document.querySelectorAll('.n')];

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


    // let navs = [...document.querySelectorAll('')]
    speed *= 0.8; //ZWIEKSZENIE sprawi, że szybkość nie będzie spadać

    objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1);

        //(position - i) to jest wartość 0 i potem rośnie, 
        //jedynka jest dana po to, by nie przekroczyło 1
        //jeśli nei będzie jedynki to może się scalować w nieskończoność
        //i te paski byłyby bardzo duże
        // o.dist = Math.abs(o.dist);
        o.dist = 1 - o.dist ** 2;
        // distance ^ is between 0 and 1
        // 1 to ten "block" na środku a 0 to inne

        // elems[i].style.transform = `scale(${1 + 0.4*o.dist})`;

        let scale = 1 + 0.2 * o.dist;
        ske.meshes[i].position.y = i * 1.2 - position * 1.2;
        // ske.meshes[i].position.x = 0.3 * (i * 1.2 - position * 1.2);
        // ske.meshes[i].rotation.x = -(i * 1.1 - position * 1.2);

        // ske.meshes[i].position.z = i * 1.2 - position * 1.2;
        // ske.meshes[i].rotation.z = -(i * 1.1 - position * 1.2);
        ske.meshes[i].scale.set(scale, scale, scale);
        ske.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
    });

    rounded = Math.round(position);

    let diff = (rounded - position);

    // position += diff * 0.015;
    if (attractMode) {
        position += -(position - attractTo) * 0.04;
    } else {
        position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;
        //druga propzoycja działa szybciej.



        wrap.style.transform = `translate(0,${-position*100 + 50}px`;
        // ske.meshes.forEach((mesh, i) => {

        // });
        // raf - request animation frame
    }

    window.requestAnimationFrame(raf);
}

raf();


let navs = [...document.querySelectorAll('li')];
let nav = document.querySelector('ul');

let rots = ske.groups.map(e => e.rotation);
nav.addEventListener('mouseenter', () => {
    attractMode = true;
    gsap.to(rots, {
        duration: 0.5,
        x: -0.5,
        y: 0,
        z: 0
    })
});

nav.addEventListener('mouseleave', () => {
    attractMode = false;
    gsap.to(rots, {
        duration: 0.5,
        y: -0.3,
        x: -0.1,
        z: -0.1
    })
});

navs.forEach(el => {
    el.addEventListener('mouseover', () => {
        // console.log(el.target);
        // console.log(el.getAttribute('data-nav'));
        attractTo = Number(el.getAttribute('data-nav'));
    })
})
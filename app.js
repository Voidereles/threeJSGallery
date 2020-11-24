import Sketch from './threeScript.js';
// import gsap from 'gsap';
let ske = new Sketch({
    dom: document.getElementById('container')
});

let attractMode = false;
let attractTo = 0;
let speed = 0;
let position = 0;
let rounded = 0;
let wrap = document.getElementById('wrapImages');
let imgCount = document.querySelectorAll('.main-gallery__img').length;
let objs = Array(imgCount).fill({
    dist: 0
});


window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0003;
    //wheel works for the touch
});


function raf() {
    position += speed;
    speed *= 0.8; //increasing the speed will keep the speed from going down

    objs.forEach((o, i) => {
        o.dist = 1;

        let scale = 1 + 0.2 * o.dist;
        if (position >= -0.45 && position <= imgCount - 0.45) {
            ske.meshes[i].position.y = -(i * 1.2 - position * 1.2);
        }
        if (position <= -0.45) {
            position = 0;
        }
        if (position > imgCount - 0.45) {
            position = position - 0.45;
        }
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
    // if (attractMode) {
    //     position += -(position - attractTo) * 0.04;
    // } else {
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035;

    //wrap is the text container on the left
    wrap.style.transform = `translate(0,calc(-${rounded*100}%)`;

    // raf - request animation frame
    window.requestAnimationFrame(raf);
}

raf();

//below is the navigation

// let navs = [...document.querySelectorAll('li')];
// let nav = document.querySelector('ul');

// let rots = ske.groups.map(e => e.rotation);
// nav.addEventListener('mouseenter', () => {
//     attractMode = true;
//     gsap.to(rots, {
//         duration: 0.5,
//         x: -0.5,
//         y: 0,
//         z: 0
//     });

//     // gsap.to(ske.renderer, {
//     //     duration:2.5,
//     //     setClearColor: (0x000000, 1)
//     // });
//     // ske.renderer.setClearColor(0x000000, 1);
// });

// nav.addEventListener('mouseleave', () => {
//     attractMode = false;
//     gsap.to(rots, {
//         duration: 0.5,
//         y: -0.3,
//         x: -0.1,
//         z: -0.1
//     })


// });

// navs.forEach(el => {
//     el.addEventListener('mouseover', () => {
//         // console.log(el.target);
//         // console.log(el.getAttribute('data-nav'));
//         attractTo = Number(el.getAttribute('data-nav'));
//     })
// })
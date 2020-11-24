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
let wrap = document.getElementById('wrapImages');
let imgCount = document.querySelectorAll('.main-gallery__img').length;
let objs = Array(imgCount).fill({
    dist: 0
});

let modalClose = document.querySelector('.modal__close');

modalClose.addEventListener('click', () => {
    console.log('d');
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector('.modal').classList.add('hidden');
});


window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0003;
    //wheel works for the touch
});

const clamp = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function raf() {
    position += speed;
    speed *= 0.8; //increasing the speed will keep the speed from going down
    // position = Math.min(Math.max(position, imgCount - 0.7), -1);
    position = clamp(position, -0.45, (imgCount - 0.55));
    // console.log(position);
    objs.forEach((o, i) => {
        o.dist = 1;

        let scale = 1 + 0.2 * o.dist;
        // console.log(rounded);
        // if (position >= -0.45 && position <= imgCount - 0.45) {
        ske.meshes[i].position.y = -(i * 1.2 - position * 1.2);
        // }
        // if (position <= -0.45) {
        //     position = 0;
        // }
        // if (position > imgCount - 0.45) {
        //     position = position - 0.45;
        // }
        // ske.meshes[i].position.x = 0.3 * (i * 1.2 - position * 1.2);
        // ske.meshes[i].rotation.x = -(i * 1.1 - position * 1.2);
        // ske.meshes[i].position.z = i * 1.3 - position * 1.2;
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
    wrap.style.transform = `translate(0,${rounded*-100}%`;

    // raf - request animation frame
    window.requestAnimationFrame(raf);
}

raf();

//below is the navigation

let navs = [...document.querySelectorAll('li')];
let nav = document.querySelector('ul');
const maximizeBtn = document.querySelector('.main-gallery__maximize');
let rots = ske.groups.map(e => e.rotation);
let zooms = ske.groups.map(e => e.scale);
// let 

// this.camera.position.set(-1, 0, 1.8);
// nav.addEventListener('mouseenter', () => {
// attractMode = true;



// gsap.to(ske.renderer, {
//     duration:2.5,
//     setClearColor: (0x000000, 1)
// });
// ske.renderer.setClearColor(0x000000, 1);
// });

maximizeBtn.addEventListener('mouseenter', () => {
    console.log('d');
    gsap.to(rots, {
        duration: 0.5,
        x: -0.5,
        y: 0,
        z: 0
    });

    gsap.to(zooms, {
        duration: 0.5,
        x: 1.5,
        y: 1.5,
        z: 1.5
    });
    gsap.to(navs, {
        duration: 0.5,
        transform: "translateX(-70vh)",

    });
    gsap.to(ske.camera.position, {
        duration: 0.5,
        x: 0

    })
});


maximizeBtn.addEventListener('mouseleave', () => {
    gsap.to(rots, {
        duration: 0.5,
        y: -0.3,
        x: -0.1,
        z: -0.1
    });

    gsap.to(zooms, {
        duration: 0.5,
        x: 1,
        y: 1,
        z: 1
    });

    gsap.to(navs, {
        duration: 0.5,
        transform: "translate(0)"
    });
    gsap.to(ske.camera.position, {
        duration: 0.5,
        x: -1

    })
});

// nav.addEventListener('mouseleave', () => {
//     attractMode = false;



// });

// navs.forEach(el => {
//     el.addEventListener('mouseover', () => {
//         // console.log(el.target);
//         // console.log(el.getAttribute('data-nav'));
//         attractTo = Number(el.getAttribute('data-nav'));
//         console.log('das');
//         // ske.camera = (70, (window.innerWidth) / window.innerHeight, 0.001, 1000);
//         // ske.camera.updateProjectionMatrix();
//         // ske.camera.updateMatrix();
//         // ske.camera.update();

//     })
// })
let pi = Math.PI;
let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let w = canvas.width;
let h = canvas.height;
let audio = new Audio('firework.mp3');
// const colarr = [
//     ["hsl(0, 100%, 50%)", "hsl(30, 100%, 50%)", "hsl(60, 100%, 50%)", "hsl(120, 100%, 50%)", "hsl(240, 100%, 50%)", "hsl(330, 100%, 50%)"],
//     ["hsl(45, 100%, 50%)", "hsl(60, 100%, 50%)"],
//     ["hsl(280, 100%, 50%)", "hsl(300, 100%, 50%)", "hsl(330, 100%, 50%)"],
//     ["hsl(0, 100%, 50%)", "hsl(240, 100%, 50%)", "hsl(120, 100%, 50%)"],
//     ["hsl(0, 0%, 100%)", "hsl(45, 100%, 50%)", "hsl(60, 100%, 50%)"],
//     ["hsl(240, 100%, 50%)", "hsl(270, 100%, 50%)", "hsl(300, 100%, 50%)"],
//     ["hsl(200, 100%, 50%)", "hsl(210, 100%, 50%)", "hsl(220, 100%, 50%)", "hsl(230, 100%, 50%)", "hsl(240, 100%, 50%)"],
//     ["hsl(0, 100%, 40%)", "hsl(30, 100%, 50%)", "hsl(60, 100%, 50%)", "hsl(330, 100%, 60%)"],
//     ["hsl(180, 100%, 50%)", "hsl(200, 100%, 50%)", "hsl(220, 100%, 50%)", "hsl(240, 100%, 50%)"],
//     ["hsl(260, 100%, 50%)", "hsl(280, 100%, 50%)", "hsl(300, 100%, 50%)", "hsl(320, 100%, 50%)"],
//     ["hsl(10, 100%, 50%)", "hsl(40, 100%, 50%)", "hsl(70, 100%, 50%)", "hsl(100, 100%, 50%)"],
//     ["hsl(80, 100%, 50%)", "hsl(100, 100%, 50%)", "hsl(120, 100%, 50%)", "hsl(140, 100%, 50%)"],
//     ["hsl(160, 100%, 50%)", "hsl(180, 100%, 50%)", "hsl(200, 100%, 50%)", "hsl(220, 100%, 50%)"],
//     ["hsl(240, 100%, 50%)", "hsl(260, 100%, 50%)", "hsl(280, 100%, 50%)", "hsl(300, 100%, 50%)"],
//     ["hsl(320, 100%, 50%)", "hsl(340, 100%, 50%)", "hsl(360, 100%, 50%)"],
//     ["hsl(0, 100%, 60%)", "hsl(0, 100%, 40%)", "hsl(0, 100%, 20%)"],
//     ["hsl(30, 100%, 50%)", "hsl(60, 100%, 50%)", "hsl(90, 100%, 50%)", "hsl(120, 100%, 50%)"],
//     ["hsl(150, 100%, 50%)", "hsl(180, 100%, 50%)", "hsl(210, 100%, 50%)", "hsl(240, 100%, 50%)"],
//     ["hsl(270, 100%, 50%)", "hsl(300, 100%, 50%)", "hsl(330, 100%, 50%)", "hsl(360, 100%, 50%)"],
//     ["hsl(0, 0%, 100%)", "hsl(0, 0%, 90%)", "hsl(0, 0%, 80%)", "hsl(0, 0%, 70%)"],
//   ];    
const colarr = [
    ["hsl(200, 100%, 50%)", "hsl(210, 100%, 50%)", "hsl(220, 100%, 50%)", "hsl(230, 100%, 50%)", "hsl(240, 100%, 50%)"],
    ["hsl(0, 100%, 50%)", "hsl(30, 100%, 50%)", "hsl(60, 100%, 50%)", "hsl(120, 100%, 50%)", "hsl(240, 100%, 50%)", "hsl(330, 100%, 50%)"],
    ["hsl(0, 100%, 40%)", "hsl(30, 100%, 50%)", "hsl(60, 100%, 50%)", "hsl(330, 100%, 60%)"],
    ["hsl(340, 80%, 55%)","hsl(50, 100%, 60%)","hsl(200, 100%, 60%)"],  
    ["hsl(90, 100%, 50%)", "hsl(90, 100%, 30%)", "hsl(120, 100%, 50%)"],
    ["hsl(270, 100%, 50%)", "hsl(300, 100%, 50%)", "hsl(330, 100%, 50%)"],
    ["hsl(270, 100%, 75%)", "hsl(260, 100%, 70%)", "hsl(250, 100%, 65%)"],
    ["hsl(45, 100%, 50%)", "hsl(0, 100%, 100%)", "hsl(60, 100%, 50%)"],
    ["hsl(300, 100%, 50%)", "hsl(0, 100%, 70%)", "hsl(0, 100%, 50%)"], 
    ["hsl(240, 70%, 50%)", "hsl(240, 70%, 40%)", "hsl(240, 70%, 30%)", "hsl(180, 70%, 50%)", "hsl(180, 70%, 40%)", "hsl(180, 70%, 30%)", "hsl(300, 70%, 50%)", "hsl(300, 70%, 40%)", "hsl(300, 70%, 30%)"]
  ];
  
const len = colarr.length;
class Particle {
    constructor(x, y, r, col, velocity) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;
        this.velocity = velocity;
        this.gravity = 0.02;
        this.floss = 0.99;
        this.alpha = 1;
        this.update = () => {
            this.draw();
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.y += this.gravity;
            this.velocity.x *= this.floss;
            this.velocity.y *= this.floss;
            this.alpha -= 0.003;
        };
        this.draw = () => {
            c.save();
            c.globalAlpha = this.alpha;
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, 2 * pi);
            c.fillStyle = this.col;
            c.fill();
            c.closePath();
            c.restore();
        }
    }
}
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})
let mouse = {
    x: 0,
    y: 0
}
let particles;
function init() {
    particles = []
}
window.addEventListener('click', (e) => {
   audio.currentTime=0;
   audio.play();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const count = 400;
    const power = 8;
    const angleInc = 2 * pi / count;
    let index = Math.floor(Math.random()*len);
    let l = colarr[index].length;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(mouse.x, mouse.y, 3, colarr[index][Math.floor(Math.random()*l)],
            {
                x: Math.cos(angleInc * i) * power * Math.random(),
                y: Math.sin(angleInc * i) * Math.random() * power
            }));
    }
})
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.05)';
    c.fillRect(0, 0, w, h);
    particles.forEach((e,i) => {
        if (e.alpha > 0.001) {
            e.update();
        }
        else {
            particles.splice(i, 1);
        }
    });
}
init();
animate();
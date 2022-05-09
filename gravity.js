const canvas = document.querySelector('#canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')

let maxRadius = 50
let minRadius = 10
let gravity = 1
let friction = 0.9
let colorArray = ['#E76F51', '#F4A261', '#E9C46A', '#2A9D8F', '#264653']
let mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', e => {
  mouse.x = e.x
  mouse.y = e.y
})

window.addEventListener('resize', e => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init()
})

// const getDistance = (x1, y1, x2, y2) => {
//   let xDistance = x2 - x1
//   let yDistance = y2 - y1

//   return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
// }
let circleArray = []
const init = () => {
  circleArray = []
  for (let index = 0; index < 500; index++) {

    let radius = Math.floor((Math.random() + 1) * 20)
    let x = Math.random() * (innerWidth - (radius * 2)) + radius
    let y = Math.random() * (innerHeight - (radius * 2)) + radius
    let dx = (Math.random() - 0.5) * 8
    let dy = (Math.random()) * 4
    circleArray.push(new Ball(x, y, dx, dy, radius))

  }
}
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = `${colorArray[Math.floor(Math.random() * colorArray.length - 1)]}`

  this.update = function () {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
      this.dy = this.dy * friction;
      this.dx = this.dx * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx * friction;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
}



const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (let index = 0; index < circleArray.length; index++) {
    circleArray[index].update()

  }
}
init()
animate()



const canvas = document.querySelector('#canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')

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

    let radius = Math.floor((Math.random() * 5) + 1)
    let x = canvas.width / 2
    let y = canvas.height / 2
    circleArray.push(new Particle(x, y, 0.05, radius))

  }
}
function Particle(x, y, velocity, radius, color) {
  this.x = x;
  this.y = y;
  this.velocity = velocity
  this.radians = Math.random() * Math.PI * 2
  this.radius = radius;
  this.color = `${colorArray[Math.floor(Math.random() * colorArray.length - 1)]}`
  this.distanceFromCenter = (Math.random() * 1200) + 50

  this.update = function () {
    const lastPoint = {
      x: this.x,
      y: this.y
    }
    this.radians += this.velocity
    this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  };

  this.draw = function (lastPoint) {
    c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x, lastPoint.y)
    c.lineTo(this.x, this.y)
    c.stroke()
    c.closePath();
  };
}



const animate = () => {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(255,255,255,0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  // c.clearRect(0, 0, innerWidth, innerHeight)
  circleArray.forEach(circle => {
    circle.update()
  })
}
init()
animate()



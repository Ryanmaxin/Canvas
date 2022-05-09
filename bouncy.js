const canvas = document.querySelector('#canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')

//Rectangle

// c.fillStyle = "blue"
// c.fillRect(100, 200, 40, 40)

//Line

// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(100, 50)
// c.lineTo(400, 800)
// c.strokeStyle = "red"
// c.stroke()

//Arc
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = "blue"
// c.stroke()

//Draw multiple

// for (let index = 0; index < 1000; index++) {
//   let x = Math.random() * (window.innerWidth)
//   let y = Math.random() * (window.innerHeight)
//   c.beginPath()
//   c.arc(x, y, 30, 0, Math.PI * 2, false)
//   c.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
//   c.stroke()
// }

//Animation
let maxRadius = 50
let minRadius = 10
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
let circleArray = []
const init = () => {
  circleArray = []
  for (let index = 0; index < 1000; index++) {

    let radius = Math.floor((Math.random() + 1) * 10)
    let x = Math.random() * (innerWidth - (radius * 2)) + radius
    let y = Math.random() * (innerHeight - (radius * 2)) + radius
    let dx = (Math.random() - 0.5) * 8
    let dy = (Math.random() - 0.5) * 8
    circleArray.push(new Circle(x, y, dx, dy, radius))

  }
}
function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.originalRadius = this.radius
  this.color = `${colorArray[Math.floor(Math.random() * colorArray.length - 1)]}`
  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    c.fillStyle = this.color
    c.strokeStyle = "black"
    c.fill()
    c.stroke()
  }
  this.update = function () {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.dx = this.dx * -1
    }
    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.dy = this.dy * -1
    }
    this.x += this.dx
    this.y += this.dy
    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius) {
      this.radius += 1
    }
    else if (this.radius > this.originalRadius) {
      this.radius -= 1
    }
    this.draw()
  }
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



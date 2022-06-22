function preload() {
  img = loadImage('images/logoGED.png')
}

function setup() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  blendMode(BLEND)
  background(0, 40)

  if (mouseIsPressed) {
    createBubble()
  }

  touches.forEach(touch => {
    createBubble(touch.x, touch.y)
  })

  drawBubbles()

  // Logo de la GED
  image(img,
    width/2 - img.width/2,
    height/2 - img.height/2
  )
}

const bubbles = []
  // Logo de la GED
const colors = [
  'gold', // #FFFFD700  
  'darkviolet', // #FF9400D3 
  'darkturquoise', // #FF00CED1 
  'greenyellow', // #FFADFF2F 
  'deepskyblue', // #FF00BFF 
  'deeppink', // #FFFF1493 
  'crimson', // #FFDC143C 
]

function createBubble(x = mouseX, y = mouseY) {
  let size = random(15, 50)
  let speed = norm(size, 5, 40) * 3

  bubbles.push({
    x: x,
    y: y,
    size: size,
    speed: speed,
    direction: random(0, PI * 2),
    // direction: atan2(mouseY - pmouseY, mouseX - pmouseX),
    color: random(colors),
    opacity: 1,
    acceleration: 0
  })
}

const GRAVITY = 0.1

function drawBubbles() {
  // Dessin des bulles
  bubbles.forEach((bubble, index) => {
    bubble.x += cos(bubble.direction) * bubble.speed
    bubble.y += sin(bubble.direction) * bubble.speed

    bubble.acceleration += GRAVITY
    bubble.y += bubble.acceleration

    bubble.opacity -= 0.005

    // Si la bulle est complètement transparente, on la supprime
    if (bubble.opacity <= 0) {
      bubbles.splice(index, 1)
      return // On stoppe ici
    }

    // cf. transparence du dessin
    drawingContext.globalAlpha = bubble.opacity
    fill(bubble.color) // remplit le dessin (parametre de la couleur)
    noStroke()
    blendMode(LIGHTEST)
    circle(bubble.x, bubble.y, bubble.size)

    drawingContext.globalAlpha = 1
  })
}
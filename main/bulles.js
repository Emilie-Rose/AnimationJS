// Permet de mettre en place une image et d'indiquer où elle est ranger dans le dossier contenant le projet
function preload() {
  img = loadImage('images/logoGED.png')
}

function setup() {
  resizeCanvas(windowWidth, windowHeight)
}

// On crée un "tableau" dans une variable constante (qui ne change pas) qui va nous permettre de "stocké" les bulles qui vont apparaitre sinon au clic elle apparait et disparait (l'info n'est pas enregistré)
const bubbles = []

// On declare dans une variable constante les couleurs a afficher lors du dessin des bulles
const colors = [
  'gold',  // #FFFFD700  
  'darkviolet',  // #FF9400D3 
  'darkturquoise',  // #FF00CED1 
  'greenyellow',  // #FFADFF2F 
  'deepskyblue',   // #FF00BFF 
  'deeppink',   // #FFFF1493 
  'crimson',   // #FFDC143C 
]

// Fonction qui va créer une bulle et on lui indique sa taille et vitesse de deplacement
function createBubble(x = mouseX, y = mouseY) {
  let size = random(15, 50)
  let speed = norm(size, 5, 40) * 3

  bubbles.push({
    x: x,
    y: y,
    size: size,
    speed: speed,
    direction: random(0, PI * 2),
    // Permet de selectionner les couleurs de maniere aléatoire parmi les couleurs déclarés dans la variable 'colors'
    color: random(colors),
    opacity: 1,
    acceleration: 0
  })
}

// Permet de dessiner une bulle et d'ordonner la création de la bulle lorsqu'on fait un clic sur la souris.
// On lui indique également que lorqu'on l'a crée, on doit l'a dessiné et on lui donne des propriétés
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

const GRAVITY = 0.1

// Fonction pour le Dessin des bulles
function drawBubbles() {
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
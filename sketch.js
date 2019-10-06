var searchX;
var searchY;

var dots = new Array(5);
var nextPositions = new Array(5, 2);
var nextX = new Array(5);
var nextY = new Array(5);

var mutationVal = 50;
var inpMutationAmnt;
var smartMutations = true;

rnd = 0;

const size = 7;

class dot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 10;
    this.distance = 0;
  }
  draw() {
    fill(255);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
  setLoc(x, y) {
    this.x = x;
    this.y = y;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  checkDist(x, y, xdist, ydist, isx, isy, tsearchX, tsearchY) {
    x = this.x;
    y = this.y;
    isx = false;
    isy = false;
    xdist = 0;
    ydist = 0;
    tsearchX = searchX + (size / 2);
    tsearchY = searchY + (size / 2);

    if ((x >= searchX) && (x <= (searchX + size))) {
      isx = true;
    }
    if ((y >= searchY) && (y <= (searchY + size))) {
      isy = true;
    }

    if (isy && isx) {
      return true;

    } else if (isy) {
      if (x > searchX) {
        xdist = (x - (searchX + size))
      } else {
        xdist = (searchX - x)
      }
      this.distance = Math.round(xdist);
      return Math.round(xdist);

    } else if (isx) {
      if (y > searchY) {
        ydist = (y - (searchY + size))
      } else {
        ydist = (searchY - y)
      }
      this.distance = Math.round(ydist);
      return Math.round(ydist);

    } else {
      if (x > searchX) {
        xdist = (x - (searchX + size))
      } else {
        xdist = (searchX - x)
      }
      if (y > searchY) {
        ydist = (y - (searchY + size))
      } else {
        ydist = (searchY - y)
      }
      xdist = Math.round(xdist);
      ydist = Math.round(ydist);
      this.distance = Math.round(Math.hypot(xdist, ydist));
      return this.distance;
      //return Math.round(Math.hypot(xdist, ydist));
    }
  }
}

function setup() {
  createCanvas(750, 750);
  frameRate(60);
  ellipseMode(RADIUS);
  //rectMode(CENTER);

  searchX = random(0, height - size);
  searchY = random(0, height - size);

  button = createButton('Reset');
  button.mousePressed(reset);

  button2 = createButton('Evolve');
  button2.mousePressed(evolve);

  if (!smartMutations) {
    inpMutationAmnt = createInput("60", "integer");
    inpMutationAmnt.input(changeMutationAmnt);
  }

  populateDots();

}

function changeMutationAmnt() {
  mutationVal = parseInt(inpMutationAmnt.value());
  console.log(mutationVal);
}

function reset() {
  rnd = 0;
}

function sortNumber(a, b) {
  // change alphabetical sort to numerical sort
  return a - b;
}

// Button handler
function evolve() {
  populateDots();

  for (i = 0; i < 5; i++) {
    dots[i].checkDist();
  }


  // Sort dots array by distance
  dots.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

  // log distances
  //for (i = 0; i < 5; i++) {
  //  console.log(dots[i].distance);
  //}

  // selection top 2 or 3



  d1 = dots[0].distance;
  d2 = dots[1].distance;
  d3 = dots[2].distance;
  d4 = dots[3].distance;
  d5 = dots[4].distance;

  console.log("Round: " + rnd + ", average distance: " + ((d1+d2+d3+d4+d5)/5));

  // crossover
  // averaging x and y of d1 and d2
  avgx = (dots[0].x + dots[1].x + dots[2].x) / 3;
  avgy = (dots[0].y + dots[1].y + dots[2].y) / 3;



  // smart mutation using the average distance of the 3 top + 25%
  if (smartMutations) {
    smartMutationVal = (d1 + d2 + d3) / 3;
    smartMutationVal = smartMutationVal * 1.25;
    for (i = 0; i < 5; i++) {
      nextX[i] = (avgx + random(-smartMutationVal, smartMutationVal + 1));
      nextY[i] = (avgy + random(-smartMutationVal, smartMutationVal + 1));
    }
  } else {
    for (i = 0; i < 5; i++) {
      nextX[i] = (avgx + random(-mutationVal, mutationVal + 1));
      nextY[i] = (avgy + random(-mutationVal, mutationVal + 1));
    }
  }


  rnd++;
}

function setSearchArea() {
  fill(255, 0, 0);
  rect(searchX, searchY, size, size);
}

function populateDots() {
  if (rnd == 0) {
    // first round, random locations
    for (i = 0; i < 5; i++) {
      dots[i] = new dot();
      dots[i].setX(random(10, width - 10));
      dots[i].setY(random(10, height - 10));
    }
  } else {
    // after first round, calculate locations
    for (i = 0; i < 5; i++) {
      dots[i] = new dot();
      dots[i].setX(nextX[i]);
      dots[i].setY(nextY[i]);
    }
  }
}

function drawDots() {
  for (i = 0; i < 5; i++) {
    dots[i].draw();
  }
}


function checkDist(x, y) {
  isx = false;
  isy = false;
  xdist = 0;
  ydist = 0;
  tsearchX = searchX + (size / 2);
  tsearchY = searchY + (size / 2);
  if ((x >= tsearchX) && (x <= (tsearchX + size))) {
    isx = true;
  }
  if ((y >= tsearchY) && (y <= (tsearchY + size))) {
    isy = true;
  }

  if (isy && isx) {
    return true;
  } else if (isy) {
    if (x > tsearchX) {
      xdist = (x - (tsearchX + size))
    } else {
      xdist = (tsearchX - x)
    }
    return xdist;
  } else if (isx) {
    if (y > tsearchY) {
      ydist = (y - (tsearchY + size))
    } else {
      ydist = (tsearchY - y)
    }
    return ydist;
  } else {
    if (x > tsearchX) {
      xdist = (x - (tsearchX + size))
    } else {
      xdist = (tsearchX - x)
    }
    if (y > tsearchY) {
      ydist = (y - (tsearchY + size))
    } else {
      ydist = (tsearchY - y)
    }

    return Math.hypot(xdist, ydist);
  }
}

function draw() {
  background(170,170,170);
  setSearchArea();
  drawDots();
  //dot1.draw();

  roundDisplay = ("Evolutions: " + rnd)
  fill(255);
  textSize(20);
  text(roundDisplay, 10, 30);
}


// fitness function is distance
// 5 random dots each evolution
// take averages of 3 best dots plus mutation
// allow to evolve until all dots are in/near the square

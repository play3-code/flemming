let geodata;
let treeData;

let backgroundImage;
let hoheslicht = null;

let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};

function preload() {
  geodata = loadJSON("lucerne-trees.json");
  backgroundImage = loadImage('tree_background (1).png');
}

// Quadtree 
let quadtree = d3.quadtree();

function setup() {
  createCanvas(900, 650);

  treeData = geodata.features;

  quadtree
    .x(function (d) {
      return d.geometry.coordinates[0];
    })
    .y(function (d) {
      return d.geometry.coordinates[1];
    })
    .addAll(treeData);



  noLoop();
}

function draw() {
  background(255);
  image(backgroundImage, 0, 0)
  // drawTrees();

  if (hoheslicht) {
    let lon = hoheslicht.geometry.coordinates[0];
    let lat = hoheslicht.geometry.coordinates[1];
    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);
    let ageTrees = hoheslicht.properties.GlobalId
    let dm = hoheslicht.properties.KR_DURCHMESSER

    noFill();
    stroke("green");
    strokeWeight(2)
    ellipse(x, y, 20, 20);
    console.log(dm)
    line(mouseX + 30, mouseY, x, y)
    strokeWeight(1)
    fill(0)
    textAlign(LEFT, CENTER)
    if (dm == null) {
      dm = 0
    }
    let circlePos = (textWidth("🌲" + ageTrees)) / 2

    let circleposY = ((dm * 15) * 0.5) + 40
    strokeWeight(2)
    line(mouseX + 30, mouseY - 15, mouseX + 30, mouseY + 15)
    line(mouseX + 15, mouseY, mouseX + 45, mouseY)
    noStroke()
    text("🌲" + ageTrees, mouseX + 40, mouseY - 15)
    noFill()

    stroke("blue")
    circle(mouseX + circlePos + 40, mouseY - circleposY, dm * 15)
    console.log(circleposY)

  }

}


function mouseMoved() {

  let lon = map(mouseX, 0, width, bounds.left, bounds.right);

  let lat = map(mouseY, 0, height, bounds.top, bounds.bottom);

  hoheslicht = quadtree.find(lon, lat);

  redraw();

}

function keyTyped() {
  saveCanvas("tree_background", "png");
}



function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];
    let geometry = treeObject.geometry;
    let properties = treeObject.properties;
    // console.log(properties);
    let coordinates = geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

    noStroke();
    fill(0, 164, 153, 1);
    ellipse(x, y, 10, 10);
    ellipse(x, y, 5, 5);
    ellipse(x, y, 3, 3);
    text("🌲", x, y)
  }
}

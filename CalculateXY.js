const data = require('./data.json');
const dataXY = require('./dataXY.json');
const fs = require('fs');
let objects = [];

function calculateX(mean_anomaly, semimajor_axis, eccentricity) {
    let E = mean_anomaly;
    let a = semimajor_axis;
    let e = eccentricity;
    let x = a * (Math.cos(E) - e);
    return x;
}
  
function calculateY(mean_anomaly, semimajor_axis, eccentricity) {
    let E = mean_anomaly;
    let a = semimajor_axis;
    let e = eccentricity;
    let y = a * (Math.sqrt(1 - Math.pow(e, 2)) * Math.sin(E));
    return y;
}


let maxX = dataXY[0]['x'];
let maxY = dataXY[0]['y'];

let minX = maxX;
let minY = maxY;

dataXY.forEach((object) => {
    if (object.x < minX) {
      minX = object.x;
    }
    if (object.x > maxX) {
      maxX = object.x;
    }
    if (object.y < minY) {
      minY = object.y;
    }
    if (object.y > maxY) {
      maxY = object.y;
    }
  });

function scaleX(x, maxX, minX) {
    let xScale = (maxX - minX) / 5000;
    let xScaled = Math.round((x / xScale) - (minX / xScale));
    return xScaled;
}

function scaleY(y, maxY, minY) {
    let yScale = (maxY - minY) / 5000;
    let yScaled = Math.round((y / yScale) - (minY / yScale));
    return yScaled;
}

for(let i = 0; i < data.length; i++) {
    let obj = data[i];
    let mean_anomaly = obj["MEAN_ANOMALY"];
    let semimajor_axis = obj["SEMIMAJOR_AXIS"];
    let eccentricity = obj["ECCENTRICITY"];
    let y = calculateY(mean_anomaly, semimajor_axis, eccentricity);
    let x = calculateX(mean_anomaly, semimajor_axis, eccentricity);
    let xScaled = scaleX(x, maxX, minX);
    let yScaled = scaleY(y, maxY, minY);

    objects.push({
        name: obj["OBJECT_NAME"],
        type: obj["OBJECT_TYPE"],
        designator: obj["INTLDES"],
        launch: obj["EPOCH"],
        motion: obj["MEAN_MOTION"],
        orbit: (1440 / obj["MEAN_MOTION"]),
        inclination: obj["INCLINATION"],
        xScaled: xScaled,
        yScaled: yScaled
    });
}

fs.writeFile("dataXYAvg.json", JSON.stringify(objects, null, 2), function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data was saved to file successfully.");
  });

//console.log(JSON.stringify(objects, null, 2));

let maxX2 = objects[0]['xScaled'];
let maxY2 = objects[0]['yScaled'];

let minX2 = maxX2;
let minY2 = maxY2;

objects.forEach((object) => {
    if (object.xScaled < minX2) {
      minX2 = object.xScaled;
    }
    if (object.xScaled > maxX2) {
      maxX2 = object.xScaled;
    }
    if (object.yScaled < minY2) {
      minY2 = object.yScaled;
    }
    if (object.yScaled > maxY2) {
      maxY2 = object.yScaled;
    }
  });

console.log("Max Y: ", maxY2);
console.log("Max X: ", maxX2);

console.log("Min Y: ", minY2);
console.log("Min X: ", minX2);
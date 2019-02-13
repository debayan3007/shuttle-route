const distance = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

function perpDistanceToLine ({x: x1, y: y1}, {x: x2, y: y2}, {x, y}) {
  if (x === undefined || y === undefined) {
    return 0
  }
  
  const a = y1 - y2
  const b = x2 - x1
  const c = (x1 - x2) * y1 + (y2 - y1) * x1
  
  return Math.abs(a * x + b * y + c)/Math.sqrt(a * a + b * b)
}

function meetPoint (pts) {
  let xSum = 0
  let ySum = 0
  for (let pt of pts) {
    xSum += pt.x
    ySum += pt.y
  }
  return {
    x: xSum / pts.length,
    y: ySum / pts.length,
  }
}

function fallBetween ({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}) {
  const k = ((y2-y1) * (x3-x1) - (x2-x1) * (y3-y1)) / (Math.pow((y2 - y1), 2) + Math.pow((x2-x1), 2))
  
  const x4 = x3 - k * (y2-y1)
  const y4 = y3 + k * (x2-x1)

  const pt = {
    x: x4, y: y4
  }
//   console.log({pt})
  const d1 = distance({x: x1, y: y1}, {x: x2, y: y2})
  const d2 = distance({x: x1, y: y1}, {x: x4, y: y4})
  const d3 = distance({x: x4, y: y4}, {x: x2, y: y2})
//   console.log({d1,d2,d3, sum: d2+d3})

  if (d2 > d1 || d3 > d1) {
    return false
  }
  return true
}

module.exports = {
  distance,
  perpDistanceToLine,
  meetPoint,
  fallBetween,
}
const { distance, perpDistanceToLine, meetPoint, fallBetween } = require('./lib')

function solution({ commuters, cabs, dest }) {
  // console.log({ commuters, cabs, dest })

  const groups = []
  let totalDistance = 0

  for (let com of commuters) {
    let min = Infinity
    let minIndex = -1

    for (let i = 0; i < cabs.length; i++) {
      let cab = cabs[i]
      let dist = perpDistanceToLine(cab, dest, com)
      const bet = fallBetween(cab, dest, com)
      //       console.log(bet, {cab, com})
      if (dist < min && bet) {
        min = dist
        minIndex = i
      }
    }

    groups[minIndex] = groups[minIndex] ? groups[minIndex] : {}
    groups[minIndex].cab = cabs[minIndex]
    groups[minIndex].commuters = groups[minIndex].commuters ? groups[minIndex].commuters : []
    groups[minIndex].commuters.push(com)
    groups[minIndex].pickup = meetPoint(groups[minIndex].commuters)
    groups[minIndex].distance = distance(groups[minIndex].cab, groups[minIndex].pickup) + distance(dest, groups[minIndex].pickup)
    totalDistance += groups[minIndex].distance
  }

  return { path: groups, totalDistance }
}

module.exports = solution

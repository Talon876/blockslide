import {getTile} from './Level';

const isBlocking = (level, xy) => {
  let blocking = true;
  if (xy.x >= 0 && xy.x < level.width && xy.y >= 0 && xy.y < level.height) {
    const tile = getTile(xy, level.data);
    if (tile && tile.type !== 'wall') {
      blocking = false;
    }
  }
  return blocking;
};

export const calculateNewLocation = (level, location, direction) => {
  if (direction.x === 0 && direction.y === 0) return location;
  let canContinue = true;
  let destination = Object.assign({}, location);
  while (canContinue) {
    if (isBlocking(level, {x: destination.x + direction.x, y: destination.y + direction.y})) {
      canContinue = false;
    } else {
      destination.x += direction.x;
      destination.y += direction.y;
    }
  }
  return destination;
};


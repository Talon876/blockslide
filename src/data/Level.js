const types = {
  '@': 'start',
  '#': 'wall',
  '.': 'floor',
  '$': 'end',
};

const search = (tiles, target) => {
  let found = null;
  tiles.forEach((tile) => {
    if (tile.type === target) {
      found = tile;
    }
  });
  return found;
};

const createLevel = (data) => {
  const levelData = data.split('\n').map((row, y) => {
    return row.split('').map((tile, x) => {
      return {
        x,
        y,
        type: types[tile],
      };
    });
  }).reduce((a, b) => a.concat(b));
  const start = search(levelData, 'start');
  const end = search(levelData, 'end');

  if (start === null || end === null) {
    const msg = `There must be a start and an end. start: ${start} end: ${end}`;
    console.log(msg);
    throw new Error(msg);
  }

  return {
    data: levelData,
    width: data.split('\n')[0].length,
    height: data.split('\n').length,
    start,
    end
  };
};

export const getLevel = (data) => createLevel(data);

export const getTile = (xy, levelData) => {
  let found = null;
  levelData.forEach((tile) => {
    if (tile.x === xy.x && tile.y === xy.y) {
      found = tile;
    }
  });
  return found;
};


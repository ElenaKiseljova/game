'use strict';

window.renderStatistics = function (ctx, names, times) {
  var WIDTH_STAT = 40;
  var HEIGHT_STAT = 150;
  var SPACE_STAT = 50;
  var SATURATE_COLOR = 100;
  var COORDINATE_STAT_X = 120;
  var COORDINATE_STAT_Y = 80;

  /* ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(100, 10, 420, 270); */

  ctx.beginPath();

  ctx.moveTo(110, 20);

  ctx.lineTo(60, 155);
  ctx.lineTo(110, 280);
  ctx.lineTo(320, 290);
  ctx.lineTo(530, 280);
  ctx.lineTo(580, 155);
  ctx.lineTo(530, 20);
  ctx.lineTo(320, 10);
  ctx.lineTo(110, 20);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fill();

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.stroke();

  ctx.closePath();

  ctx.beginPath();

  ctx.moveTo(100, 10);

  ctx.lineTo(50, 145);
  ctx.lineTo(100, 270);
  ctx.lineTo(310, 280);
  ctx.lineTo(520, 270);
  ctx.lineTo(570, 145);
  ctx.lineTo(520, 10);
  ctx.lineTo(310, 0);
  ctx.lineTo(100, 10);

  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.strokeStyle = 'white';
  ctx.stroke();

  ctx.closePath();

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  ctx.fillText('Ура Вы победили!', COORDINATE_STAT_X, (COORDINATE_STAT_Y - 50));

  ctx.fillText('Список результатов:', COORDINATE_STAT_X, (COORDINATE_STAT_Y - 30));

  var timeStatMax = 0;

  for (var j = 0; j < times.length; j++) {
    if (times[j] > timeStatMax) {
      timeStatMax = times[j];
    }
  }

  for (var i = 0; i < names.length; i++) {
    var heightStatItem = Math.trunc((times[i] * 100 / timeStatMax) * HEIGHT_STAT / 100);
    var coordinateStatItemX = COORDINATE_STAT_X + (WIDTH_STAT + SPACE_STAT) * i;
    var coordinateStatItemY = COORDINATE_STAT_Y + (HEIGHT_STAT - heightStatItem);

    var saturateStatItem = Math.trunc(SATURATE_COLOR * Math.random());
    var colorStatItem;
    if (names[i] === 'Вы') {
      colorStatItem = colorStatItem = 'hsl(240, 100%, 50%)';
    } else {
      colorStatItem = 'hsl(240, ' + saturateStatItem + '%, 50%)';
    }

    ctx.fillStyle = colorStatItem;

    ctx.fillRect(coordinateStatItemX, coordinateStatItemY, WIDTH_STAT, heightStatItem);

    ctx.font = '16px PT Mono';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], coordinateStatItemX, (COORDINATE_STAT_Y + HEIGHT_STAT + 26));

    ctx.fillText(Math.trunc(times[i]), coordinateStatItemX, (coordinateStatItemY - 10));
  }
};

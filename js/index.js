(function () {
  
  var unit = 100,
      canvas, context, canvas2, context2,
      height, width, xAxis, yAxis,
      draw;

  function init() {
      canvas = document.getElementById("canvas");
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight * 0.9; 
      
      context = canvas.getContext("2d");
      
      height = canvas.height;
      width = canvas.width;
      
      xAxis = Math.floor(height/1.75);
      yAxis = 0;
      
      draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    drawWave('#10c2cd', 0.3, 3, 0);
    drawWave('#0fcda0', 0.3, 2, 250);
    drawWave('#0e54cd', 0.3, 1.5, 150);

    draw.seconds = draw.seconds + .012;
    draw.t = draw.seconds*Math.PI;
    setTimeout(draw, 35);
  };

  draw.seconds = 0;
  draw.t = 0;

  function drawWave(color, alpha, zoom, delay) {
    context.fillStyle = color;
    context.globalAlpha = alpha;
    context.beginPath();
    drawSine(draw.t / 0.5, zoom, delay);
    context.lineTo(width + 10, height);
    context.lineTo(0, height);
    context.closePath()
    context.fill();

    var text = "Yoshitaka Terazawa's portfolio";
    context.globalAlpha = 1;
    context.fillStyle = "black"
    context.font = "48px 'Arial'";
    context.textAlign = "center";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  function drawSine(t, zoom, delay) {
      var x = t;
      var y = Math.sin(x)/zoom;
      context.moveTo(yAxis, unit*y+xAxis);

      for (i = yAxis; i <= width + 10; i += 10) {
          x = t+(-yAxis+i)/unit/zoom;
          y = Math.sin(x - delay)/3;
          context.lineTo(i, unit*y+xAxis);
      }
  }
  init();
})();
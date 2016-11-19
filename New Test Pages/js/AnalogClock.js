document.addEventListener('DOMContentLoaded', function() {
    showClock();
}, false);
window.onload = function () {
	setInterval(showClock, 1000);

  function showClock(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var date = new Date();
    var angle;
    var secHandLength = 150;

    //Clear Everything and Re-Draw every second
    ctx.clearRect(0,0,canvas.width,canvas.height);
    centerDial();
    markHours();
    //markSeconds();

    showSeconds();
    showMinutes();
    showHours();
    function centerDial(){
      ctx.beginPath();
      ctx.arc(canvas.width/2,canvas.height/2,2,0,Math.PI*2);
      ctx.lineWidth = 3;
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }
    function markHours() {
      for (var i = 0; i < 12; i++) {
        angle = (i - 3) * (Math.PI * 2) / 12;       // THE ANGLE TO MARK.
        ctx.lineWidth = 1;            // HAND WIDTH.
        ctx.beginPath();

        var x1 = (canvas.width/2 ) + Math.cos(angle) * (secHandLength);
        var y1 = (canvas.height/2 ) + Math.sin(angle) * (secHandLength);
        var x2 = (canvas.width/2 ) + Math.cos(angle) * (secHandLength - (secHandLength / 7));
        var y2 = (canvas.height/2 ) + Math.sin(angle) * (secHandLength - (secHandLength / 7));

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = '#466B76';
        ctx.stroke();
      }
    }

      function markSeconds() {

          for (var i = 0; i < 60; i++) {
              angle = (i - 3) * (Math.PI * 2) / 60;       // THE ANGLE TO MARK.
              ctx.lineWidth = 1;            // HAND WIDTH.
              ctx.beginPath();

              var x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength);
              var y1 = (canvas.height / 2) + Math.sin(angle) * (secHandLength);
              var x2 = (canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 30));
              var y2 = (canvas.height / 2) + Math.sin(angle) * (secHandLength - (secHandLength / 30));

              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);

              ctx.strokeStyle = '#FFFFFF';
              ctx.stroke();
          }
      }

        function showSeconds() {

            var sec = date.getSeconds();
            angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
            ctx.lineWidth = 0.5;              // HAND WIDTH.

            ctx.beginPath();
            // START FROM CENTER OF THE CLOCK.
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            // DRAW THE LENGTH.
            ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength),
                canvas.height / 2 + Math.sin(angle) * secHandLength);

            // DRAW THE TAIL OF THE SECONDS HAND.
            ctx.moveTo(canvas.width / 2, canvas.height / 2);    // START FROM CENTER.
            // DRAW THE LENGTH.
            ctx.lineTo((canvas.width / 2 - Math.cos(angle) * 20),
                canvas.height / 2 - Math.sin(angle) * 20);

            ctx.strokeStyle = '#586A73';        // COLOR OF THE HAND.
            ctx.stroke();
        }

        function showMinutes() {

            var min = date.getMinutes();
            angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
            ctx.lineWidth = 1.5;              // HAND WIDTH.

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);  // START FROM CENTER.
            // DRAW THE LENGTH.
            ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength / 1.1),
                canvas.height / 2 + Math.sin(angle) * secHandLength / 1.1);

            ctx.strokeStyle = '#FFFFFF';  // COLOR OF THE HAND.
            ctx.stroke();
        }

        function showHours() {

            var hour = date.getHours();
            var min = date.getMinutes();
            angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
            ctx.lineWidth = 1.5;              // HAND WIDTH.

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);     // START FROM CENTER.
            // DRAW THE LENGTH.
            ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength / 1.5),
                canvas.height / 2 + Math.sin(angle) * secHandLength / 1.5);

            ctx.strokeStyle = '#FFF';   // COLOR OF THE HAND.
            ctx.stroke();
        }
	  
  }
};

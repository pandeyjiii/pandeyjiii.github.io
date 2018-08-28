var header = $('header.counthead');

var backgrounds = new Array(
    'url("../img/gif/1.jpg")'
  , 'url("../img/gif/2.jpg")'
  , 'url("../img/gif/3.jpg")'
  , 'url("../img/gif/4.jpg")'
  , 'url("../img/gif/5.jpg")'
  , 'url("../img/gif/6.jpg")'
  , 'url("../img/gif/7.jpg")'
  , 'url("../img/gif/8.jpg")'
);
    
var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    header.css('background-image', backgrounds[current]);
}
setInterval(nextBackground, 1500);

header.css('background-image', backgrounds[0]);
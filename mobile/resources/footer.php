<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnzxae2AewMUN0Tt_fC3gN38goeLVdVE&callback=initMap"
async defer></script>

<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.5.9/lottie.js" charset="utf-8"></script> -->
<script src="js/lottie_svg.js" charset="utf-8"></script>
<script type="text/javascript">
console.log("tes");
var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), // Required
  path: 'img/lottie-1.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "Hello World", // Name for future reference. Optional.
  rendererSettings: {
  progressiveLoad: true // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
  //hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
}
});
console.log('test');
// $( document ).ajaxStart( function() {
//   console.log("yyyyy");
//     $( "#lottie" ).fadeIn();
//         $( "#lottie" ).css({
//         left: ( $( window ).width() - 32 ) / 2 + "px", // 32 = lebar gambar
//         top: ( $( window ).height() - 32 ) / 2 + "px", // 32 = tinggi gambar
//         display: "block"
//       })
// }).ajaxComplete( function() {
//   console.log("yyyyyend");
//   $( "#lottie" ).fadeOut();
// });
function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  if (visible == true) {
    $(selector).fadeIn();
  }else {
    $(selector).fadeOut();
  }
}

onReady(function() {
  setVisible('#map', true);
  setVisible('#lottie', false);
});
// if (tunggu==true) {
//   console.log("end");
//     $( "#lottie" ).fadeOut();
//     tunggu=false;
// }
</script>

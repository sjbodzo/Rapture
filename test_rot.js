<html>
<head>
<link rel="stylesheet" type="text/css" href="theme.css">
<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
<title>Bioinformatics Project</title>
<style>canvas { width: 60%; height: 60% }</style>
</head>

<script src="./three.min.js" type="text/javascript"></script>
<script src="./amino_acids.js" type="text/javascript"></script>
<script src="./amino_acid.js" type="text/javascript"></script>
<script src="./sequence.js" type="text/javascript"></script>
<script src="./seqBuilder.js" type="text/javascript"></script>
<script src="./jquery-2.1.1.min.js" type="text/javascript"></script>
<script src="./jquery.requestAnimationFrame.min.js" type="text/javascript"></script>
<script>

function addMouseHandler() {
  var dom = renderer.domElement;
  dom.addEventListener('click', onClick, false);
}

function onClick(event) {
  event.preventDefault();
  //window.alert(event.screenX + ' ' + event.screenY);
  //for (var i = 0, len = sequence.chain.length; i < len; i++) {
  //sequence = new Sequence();
  //TODO: create onClick, possibly for phi/psi modulation?
  //window.alert(sequence.chain[i].type);
  //}
}

function attachHandler(el, evtname, fn) {
  if (el.addEventListener) {
    el.addEventListener(evtname, fn.bind(el), false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + evtname, fn.bind(el));
  }
}
attachHandler(window, "load", function(){
  var ele = document.querySelector("input[name=amino_seq_input]");
  attachHandler(ele, "invalid", function (e) {
    this.setCustomValidity("");
    if (!e.target.validity.valid) {
      window.alert("Please input a valid amino acid sequence.");
    }
  });
});

var scene, camera, renderer, radius, theSeq;
radius = 0.28;
bondLengthScalar = 0.8; //used to exaggerate bond lengths for visual clarity

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, (window.innerWidth) / (window.innerHeight), 0.1, 1000 );
  camera.position.z = 10;
  camera.position.x = -6;
  camera.position.y = 0;

  var light = new THREE.DirectionalLight( 0xffffff, 1.5);
  //var light = new THREE.AmbientLight(0xffffff);
  light.position.set(0, 0, 1);
  scene.add(light);

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );
  var node = document.getElementById("renderBody");
  node.appendChild(renderer.domElement);

  addMouseHandler();
  console.log("Scene initialized...");
}

function addMouseHandler() {
  var dom = renderer.domElement;
  dom.addEventListener('mouseup', onMouseUp, false);
}

function onMouseUp (event) {
  event.preventDefault();
  //console.log("x = %f", event.clientX);
  //console.log("y = %f", event.clientY);
}


// SAMPLE INPUT: ADGIFILSAI
function processInputSeq() {
  $('input#seq_box').blur();

  //TESTING SPACE FOR CODE
  var gx = new THREE.SphereGeometry(1, 10, 10);
  var mx = new THREE.MeshPhongMaterial();
  var ms = new THREE.Mesh(gx, mx);
  scene.add(ms);
}

function run() {
  renderer.render(scene, camera);

  for (var i = 0, len = theSeq.aminoAcidChain.length; i < len; i++) {
    //sequence.chain[i].mesh.rotation.x -= 0.01;
    //sequence.chain[i].mesh.rotation.y -= 0.01;
  }

  // Ask for another frame
  //requestAnimationFrame(run);
}

</script>

<body>

<div id="titleBody">
<span id="theTitle"><h1>Sequence Input Visualization</h1></span>
</div>

<div id="renderBody">
</div>

<div id="mainBody">
<span id="spanBox">
To begin, input a sequence of amino acids by using their corresponding letter codes.
After you click run the sequence will appear. You can manipulate the phi and psi angles
respectively, and see the changes these rotations produce.
</span></br>

<!--
<div width="50%">
<form action="javascript:zoom(-1, 1)">
<input type="image" src="zoom_in.png" alt="Zoom In" width="48" height="48">
</form>

<form action="javascript:zoom(1, 1)">
<input type="image" src="zoom_out.png" alt="Zoom In" width="48" height="48">
</form>
</div>
-->

<form action="javascript:processInputSeq()">
<input name = "amino_seq_input" id="seq_box" type ="text" autofocus
maxlength ="20" pattern ="[GAVLIPFYWSTCMNQKRHDEgavlipfywstcmnqkrhde]{0,20}">
</input>
<input type="submit" value="Run" />
</form>

<button onclick="javascript:triggerRotateByPhi(0)">PHI</button>
</div>

</body>
</html>

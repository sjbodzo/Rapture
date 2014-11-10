function Sequence() {
  this.chain = [];
  this.currentX = 0;
  this.currentY = 0;
  this.currentZ = 0;
}

function AminoAcid(aminoAcidRefVar) {
  this.type = aminoAcidRefVar.letter; //represents amino acid by letter
  this.color = new THREE.Color(aminoAcidRefVar.color);
  this.geometry = new THREE.SphereGeometry(radius,10,10);
  this.material = new THREE.MeshPhongMaterial({color: this.color});
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.X = sequence.currentX;
  this.Y = 0;
  this.Z = 0;
  this.phi = 0; // N-C alpha bond
  this.psi = 0; // C-C alpha bond
}

function updateModelByPhi(indexOfAminoAcid, angle) {
  indexOfAminoAcid = Math.floor(Math.random()*sequence.chain.length);
  angle = Math.random()*Math.PI/2;
  console.log(indexOfAminoAcid);
  console.log(angle);
  aminoAcidRef = sequence.chain[indexOfAminoAcid];
  prevAminoAcidRef = sequence.chain[indexOfAminoAcid-1];
  horizontalDistance = aminoAcidRef.X - prevAminoAcidRef.X;
  s = horizontalDistance*angle;
  verticalDistance = Math.sin(s);
  console.log("vertical distance = %o", verticalDistance);
  console.log("horizontal distance = %o", horizontalDistance);
  console.log("Math.sin(s) = %o", Math.sin(s));
  console.log("s = %o", s);

  aminoAcidRef.phi = angle;
  // horizontalDistance / cot angle = verticalDistance
  // cot = 1 / tan

  var n = 2;
  for (var i = indexOfAminoAcid+1, len = sequence.chain.length; i < len; i++) {
    sequence.chain[i].Y += (verticalDistance*n);
    console.log(sequence.chain[i].Y*n);
    sequence.chain[i].mesh.translateY(sequence.chain[i].Y);
    n++;
  }

  renderer.render(scene, camera);
}

function updateModelByPsi(indexOfAminoAcid, angle) {
}

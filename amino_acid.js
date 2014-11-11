//Observed lengths of atomic bonds in Angstroms.
var bondLengths = {};
bondLengths['CCa'] = { length: 1.52 }
bondLengths['CO']  = { length: 1.23 }
bondLengths['CN']  = { length: 1.33 }
bondLengths['NH']  = { length: 1.00 }
bondLengths['NCa'] = { length: 1.45 }
bondLengths['CaR'] = { length: 1.40 }
bondLengths['CH']  = { length: 1.35 }

function AminoAcid(aminoAcidRefVar) {
  this.type = aminoAcidRefVar.letter; //represents amino acid by letter
  this.color = new THREE.Color(aminoAcidRefVar.color);
  this.phi = 0; // N-C alpha torsion angle
  this.psi = 0; // C-C alpha torsion angle
  this.atoms = [];
  this.fillAtoms = function() {
    this.atoms[0] = new Atom('C');
    this.atoms[1] = new Atom('A');
    this.atoms[2] = new Atom('H'); //connected to A
    this.atoms[3] = new Atom('N');
    this.atoms[4] = new Atom('H'); //connected to N
    this.atoms[5] = new Atom('R');
    this.atoms[6] = new Atom('O');
  }
}

function Atom(name) {
  this.mesh;
  this.name = name;
  if (name == 'C') {
    this.color = 0x6E6E6E;
  }
  //this is carbon alpha
  else if (name == 'A') {
    this.color = 0xFFFF00;
  }
  else if (name == 'N') {
    this.color = 0x0101DF;
  }
  else if (name == 'H') {
    this.color = 0xE2A9F3;
  }
  else if (name == 'O') {
    this.color = 0xDF0101;
  }
  else {
    this.color = 0x393B0B;
  }
  this.x = 0;
  this.y = 0;
  this.z = 0;
  function createMesh() {
    geometry = new THREE.SphereGeometry(radius, 10, 10);
    material = new THREE.MeshPhongMaterial({color: this.color});
    this.mesh = new THREE.Mesh(geometry, material);
  }
}

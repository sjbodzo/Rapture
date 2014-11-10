function seqBuilder(sequence) {
  this.aminoAcid = sequence.chain[0];
  function updateAminoAcid(i) {
    this.aminoAcid = sequence.chain[i];
  }
  function initCarbonAlpha() {
    aminoAcid.atoms[1].createMesh();
    aminoAcid.atoms[1].x = sequence.currentX;
    aminoAcid.atoms[1].y = sequence.currentY;
    aminoAcid.atoms[1].z = sequence.currentZ;
    scene.add(aminoAcid.atoms[1].mesh);
  }
  function CarbonAlphaToR(stericToggle) {
    //tetrahedral C -> rot movement in XZ-axis of ~109.5 (~1.91)
    calcLength = bondLengths['CaR'].length * bondLengthScalar;
    calcZ = calcLength*Math.sin(tetraHedralAngleInRad);
    calcY = calcLength*Math.cos(tetraHedralAngleInRad);

    aminoAcid.atoms[5].createMesh();
    aminoAcid.atoms[5].x = aminoAcid.atoms[1].x;
    aminoAcid.atoms[5].y = aminoAcid.atoms[1].y+calcY*stericToggle;
    //by convention always consider R group in fwd direction
    aminoAcid.atoms[5].z = aminoAcid.atoms[1].z+calcZ*stericToggle;
    scene.add(aminoAcid.atoms[5].mesh);
  }
  function CarbonAlphaToH(stericToggle) {
    calcLength = bondLengths['CH'].length * bondLengthScalar;
    calcZ = calcLength*Math.sin(tetraHedralAngleInRad);
    calcY = calcLength*Math.cos(tetraHedralAngleInRad);

    aminoAcid.atoms[2].createMesh();
    aminoAcid.atoms[2].x = aminoAcid.atoms[1].x;
    aminoAcid.atoms[2].y = aminoAcid.atoms[1].y+calcY*stericToggle;
    aminoAcid.atoms[2].z = aminoAcid.atoms[1].z-calcZ*stericToggle;
    scene.add(aminoAcid.atoms[2].mesh);
  }
  function CarbonAlphaToCarbon(stericToggle) {
    calcLength = bondLengths['CCa'].length * bondLengthScalar;
    calcX = Math.cos(tetraHedralAngleInRad)*calcLength;
    calcY = Math.sin(tetraHedralAngleInRad)*calcLength;

    aminoAcid.atoms[0].createMesh();
    aminoAcid.atoms[0].x = aminoAcid.atoms[1].x+calcX;
    aminoAcid.atoms[0].y = aminoAcid.atoms[1].y+calcY*stericToggle;
    aminoAcid.atoms[0].z = aminoAcid.atoms[1].z;
    scene.add(aminoAcid.atoms[0].mesh);
  }
  function CarbonToOxygen(stericToggle) {
    //sp2 hybridized & e- delocalization via C-N bond and C-O bond (~120 deg)
    calcLength = bondLengths['CO'].length * bondLengthScalar;

    aminoAcid.atoms[6].createMesh();
    aminoAcid.atoms[6].x = aminoAcid.atoms[0].x;
    aminoAcid.atoms[6].z = aminoAcid.atoms[0].z;
    aminoAcid.atoms[6].y = aminoAcid.atoms[0]+stericToggle*calcLength;
    scene.add(aminoAcid.atoms[6].mesh);
  }
  function CarbonToNitrogen(stericToggle) {
    calcLength = bondLengths['CN'].length * bondLengthScalar;
    calcX = Math.cos(tPlanarAngleInRad)*calcLength;
    calcY = Math.sin(tPlanarAngleInRad)*calcLength;

    aminoAcid.atoms[3].createMesh();
    aminoAcid.atoms[3].z = aminoAcid.atoms[0].z;
    aminoAcid.atoms[3].y = aminoAcid.atoms[0].y+stericToggle*calcY;
    aminoAcid.atoms[3].x = aminoAcid.atoms[0].x+calcX;
    scene.add(aminoAcid.atoms[3].mesh);
  }
  function NitrogenToHydrogen() {

  }
  function NitrogenToCarbonAlpha() {

  }
}

tetraHedralAngleInRad = 1.91113553;
tPlanarAngleInRad = 2.0943951;

function Sequence() {
  this.aminoAcidChain = [];
  this.currentX = 0;
  this.currentY = 0;
  this.currentZ = 0;

  function drawSeq() {
    //centers the sequence
    this.currentX = -1*sequence.chain.length*radius/2;
    seqBuilder = sequenceBuilder(sequence);
    seqBuilder.initCarbonAlpha();
    for (var i = 0, len = sequence.chain.length; i < len; i++) {
      seqBuilder.updateAminoAcid(i);
      if (i == 0) seqBuilder.initCarbonAlpha();
      else //todo: write carbon alpha in linkage method
      //Toggle passed as arg alternates R group orientation
      if (i%2==0) {
        seqBuilder.CarbonAlphaToR(1);
        seqBulder.CarbonAlphaToH(1);
        seqBuilder.CarbonAlphaToCarbon(-1);
        seqBuilder.CarbonToOxygen(-1);
        seqBuilder.CarbonToNitrogen(1);
      }
      else if (i%2==1) {
        seq.Builder.CarbonAlphaToR(-1);
        seqBuilder.CarbonAlphaToH(-1);
        seqBuilder.CarbonAlphaToCarbon(1);
        seqBuilder.CarbonToOxygen(1);
        seqBuilder.CarbonToNitrogen(-1); 
      }

      if (i > 0) linkAtoms(i);
    }

    run();
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
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

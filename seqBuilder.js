function SeqBuilder(seq) {
  this.seq = seq;
  this.aminoAcid;
}

SeqBuilder.prototype = {
    constructor: SeqBuilder,
    updateAminoAcid:function (i) {
      this.aminoAcid = this.seq.aminoAcidChain[i];
    },
    initCarbonAlpha:function () {
      this.aminoAcid.atoms[1].createMesh();
      this.aminoAcid.atoms[1].x = this.seq.currentX;
      this.aminoAcid.atoms[1].y = this.seq.currentY;
      this.aminoAcid.atoms[1].z = this.seq.currentZ;
      scene.add(this.aminoAcid.atoms[1].mesh);

      //Move coords b/c scene does not respect obj coord properties on draw
      this.aminoAcid.atoms[1].mesh.translateX(this.aminoAcid.atoms[1].x);
      this.aminoAcid.atoms[1].mesh.translateY(this.aminoAcid.atoms[1].y);
      this.aminoAcid.atoms[1].mesh.translateZ(this.aminoAcid.atoms[1].z);
    },
    CarbonAlphaToR:function (stericToggle) {
      //tetrahedral C -> rot movement in XZ-axis of ~109.5 (~1.91)
      calcLength = bondLengths['CaR'].length * bondLengthScalar;
      calcZ = calcLength*Math.sin(tetraHedralAngleInRad);
      calcY = calcLength*Math.cos(tetraHedralAngleInRad);

      this.aminoAcid.atoms[5].createMesh();
      this.aminoAcid.atoms[5].x = this.aminoAcid.atoms[1].x;
      this.aminoAcid.atoms[5].y = this.aminoAcid.atoms[1].y+calcY*stericToggle;
      //by convention always consider R group in fwd direction
      this.aminoAcid.atoms[5].z = this.aminoAcid.atoms[1].z+calcZ*stericToggle;
      scene.add(this.aminoAcid.atoms[5].mesh);

      this.aminoAcid.atoms[5].mesh.translateX(this.aminoAcid.atoms[5].x);
      this.aminoAcid.atoms[5].mesh.translateY(this.aminoAcid.atoms[5].y);
      this.aminoAcid.atoms[5].mesh.translateZ(this.aminoAcid.atoms[5].z);
    },
    CarbonAlphaToH:function (stericToggle) {
      calcLength = bondLengths['CH'].length * bondLengthScalar;
      calcZ = calcLength*Math.sin(tetraHedralAngleInRad);
      calcY = calcLength*Math.cos(tetraHedralAngleInRad);

      this.aminoAcid.atoms[2].createMesh();
      this.aminoAcid.atoms[2].x = this.aminoAcid.atoms[1].x;
      this.aminoAcid.atoms[2].y = this.aminoAcid.atoms[1].y+calcY*stericToggle;
      this.aminoAcid.atoms[2].z = this.aminoAcid.atoms[1].z-calcZ*stericToggle;
      scene.add(this.aminoAcid.atoms[2].mesh);

      this.aminoAcid.atoms[2].mesh.translateX(this.aminoAcid.atoms[2].x);
      this.aminoAcid.atoms[2].mesh.translateY(this.aminoAcid.atoms[2].y);
      this.aminoAcid.atoms[2].mesh.translateZ(this.aminoAcid.atoms[2].z);
    },
    CarbonAlphaToCarbon:function (stericToggle) {
      calcLength = bondLengths['CCa'].length * bondLengthScalar;
      calcX = Math.cos(tetraHedralAngleInRad)*calcLength;
      calcY = Math.sin(tetraHedralAngleInRad)*calcLength;

      this.aminoAcid.atoms[0].createMesh();
      this.aminoAcid.atoms[0].x = this.aminoAcid.atoms[1].x+calcX;
      this.aminoAcid.atoms[0].y = this.aminoAcid.atoms[1].y+calcY*stericToggle;
      this.aminoAcid.atoms[0].z = this.aminoAcid.atoms[1].z;
      scene.add(this.aminoAcid.atoms[0].mesh);

      this.aminoAcid.atoms[0].mesh.translateX(this.aminoAcid.atoms[0].x);
      this.aminoAcid.atoms[0].mesh.translateY(this.aminoAcid.atoms[0].y);
      this.aminoAcid.atoms[0].mesh.translateZ(this.aminoAcid.atoms[0].z);
    },
    CarbonToOxygen:function (stericToggle) {
      //sp2 hybridized & e- delocalization via C-N bond and C-O bond (~120 deg)
      calcLength = bondLengths['CO'].length * bondLengthScalar;

      this.aminoAcid.atoms[6].createMesh();
      this.aminoAcid.atoms[6].x = this.aminoAcid.atoms[0].x;
      this.aminoAcid.atoms[6].z = this.aminoAcid.atoms[0].z;
      this.aminoAcid.atoms[6].y = this.aminoAcid.atoms[0]+stericToggle*calcLength;
      scene.add(this.aminoAcid.atoms[6].mesh);

      this.aminoAcid.atoms[6].mesh.translateX(this.aminoAcid.atoms[6].x);
      this.aminoAcid.atoms[6].mesh.translateY(this.aminoAcid.atoms[6].y);
      this.aminoAcid.atoms[6].mesh.translateZ(this.aminoAcid.atoms[6].z);
    },
    CarbonToNitrogen:function (stericToggle) {
      calcLength = bondLengths['CN'].length * bondLengthScalar;
      calcX = Math.cos(tPlanarAngleInRad)*calcLength;
      calcY = Math.sin(tPlanarAngleInRad)*calcLength;

      this.aminoAcid.atoms[3].createMesh();
      this.aminoAcid.atoms[3].z = this.aminoAcid.atoms[0].z;
      this.aminoAcid.atoms[3].y = this.aminoAcid.atoms[0].y+stericToggle*calcY;
      this.aminoAcid.atoms[3].x = this.aminoAcid.atoms[0].x+calcX;
      scene.add(this.aminoAcid.atoms[3].mesh);

      this.aminoAcid.atoms[3].mesh.translateX(this.aminoAcid.atoms[3].x);
      this.aminoAcid.atoms[3].mesh.translateY(this.aminoAcid.atoms[3].y);
      this.aminoAcid.atoms[3].mesh.translateZ(this.aminoAcid.atoms[3].z);
    },
    NitrogenToHydrogen:function (stericToggle) {
      calcLength = bondLengths['NH'].length * bondLengthScalar;

      this.aminoAcid.atoms[4].createMesh();
      this.aminoAcid.atoms[4].x = this.aminoAcid.atoms[3].x;
      this.aminoAcid.atoms[4].y = this.aminoAcid.atoms[3].y+stericToggle*calcLength;
      this.aminoAcid.atoms[4].z - this.aminoAcid.atoms[3].z;
      scene.add(this.aminoAcid.atoms[4].mesh);

      this.aminoAcid.atoms[4].mesh.translateX(this.aminoAcid.atoms[4].x);
      this.aminoAcid.atoms[4].mesh.translateY(this.aminoAcid.atoms[4].y);
      this.aminoAcid.atoms[4].mesh.translateZ(this.aminoAcid.atoms[4].z);
    },
    NitrogenToCarbonAlpha:function (i, stericToggle) {
      prevAminoAcid = this.seq.aminoAcidChain[i-1];
      prevNitrogen = prevAminoAcid.atoms[3];
      calcLength = bondLengths['NCa'].length * bondLengthScalar;
      calcX = Math.cos(tPlanarAngleInRad)*calcLength;
      calcY = Math.sin(tPlanarAngleInRad)*calcLength;

      this.aminoAcid.atoms[1].createMesh();
      this.aminoAcid.atoms[1].x = prevNitrogen.x + calcX;
      this.aminoAcid.atoms[1].y = prevNitrogen.y + stericToggle*calcY;
      this.aminoAcid.atoms[1].z = prevNitrogen.z;
      scene.add(this.aminoAcid.atoms[1].mesh);

      this.aminoAcid.atoms[1].mesh.translateX(this.aminoAcid.atoms[1].x);
      this.aminoAcid.atoms[1].mesh.translateY(this.aminoAcid.atoms[1].y);
      this.aminoAcid.atoms[1].mesh.translateZ(this.aminoAcid.atoms[1].z);
    },
    DebugCurrentLocation:function () {
      var loc_info = "[x,y,z] -> [" + seq.currentX + "," + seq.currentY + "," + seq.currentZ + "]";
      console.log("%s", loc_info);
    }
}

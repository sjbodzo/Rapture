tetraHedralAngleInRad = 1.91113553;
tPlanarAngleInRad = 2.0943951;

function Sequence() {
  this.aminoAcidChain = [];
  this.currentX = 0;
  this.currentY = 0;
  this.currentZ = 0;
  this.chainBuilder = new SeqBuilder(this);
}

Sequence.prototype = {
  constructor: Sequence,
  drawSeq:function () {
    //this.currentX = window.innerWidth/2;
    for (var i = 0, len = this.aminoAcidChain.length; i < len; i++) {
      this.chainBuilder.updateAminoAcid(i);
      if (i == 0) this.chainBuilder.initCarbonAlpha();
      else {
        if (i%2==0) this.chainBuilder.NitrogenToCarbonAlpha(i, -1);
        else this.chainBuilder.NitrogenToCarbonAlpha(i, 1);
      }
      if (i%2==0) {
        this.chainBuilder.CarbonAlphaToR(1);
        this.chainBuilder.CarbonAlphaToH(1);
        this.chainBuilder.CarbonAlphaToCarbon(-1);
        this.chainBuilder.CarbonToOxygen(-1);
        this.chainBuilder.CarbonToNitrogen(1);
        this.chainBuilder.NitrogenToHydrogen(1);
      }
      else if (i%2==1) {
        this.chainBuilder.CarbonAlphaToR(-1);
        this.chainBuilder.CarbonAlphaToH(-1);
        this.chainBuilder.CarbonAlphaToCarbon(1);
        this.chainBuilder.CarbonToOxygen(1);
        this.chainBuilder.CarbonToNitrogen(-1);
        this.chainBuilder.NitrogenToHydrogen(-1);
      }
    }
    run();
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

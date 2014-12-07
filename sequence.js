tetraHedralAngleInRad = 1.91113553;
tPlanarAngleInRad = 2.0943951;
var count = 0;

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

      if (i > 0) linkAtoms(i);
    }
    run();
  },
  rotateAboutX:function(angle) {
    //Calculate the sin and cos values for rotation
    var rot_cos = Math.cos(angle);
    var rot_sin = Math.sin(angle);

    for (var a = 0; a < this.aminoAcidChain.length; a++) {
      var atoms_in_chain = this.aminoAcidChain[a].atoms;
      for (var b = 0; b < this.aminoAcidChain[a].atoms.length-1; b++) {

        //Calculate rotated point coordinates
        atoms_in_chain[b].y = atoms_in_chain[b].z*rot_sin
                            + atoms_in_chain[b].y*rot_cos;
        atoms_in_chain[b].z = atoms_in_chain[b].z*rot_cos
                            - atoms_in_chain[b].y*rot_sin;

        atoms_in_chain[b].mesh.position.y = atoms_in_chain[b].y;
        atoms_in_chain[b].mesh.position.z = atoms_in_chain[b].z;
        }
    }
    //grp.rotation.x += angle;
  },
  rotateAboutZ:function(angle) {
    var rot_cos = Math.cos(angle);
    var rot_sin = Math.sin(angle);

    for (var a = 0; a < this.aminoAcidChain.length; a++) {
      var atoms_in_chain = this.aminoAcidChain[a].atoms;
      for (var b = 0; b < this.aminoAcidChain[a].atoms.length; b++) {

        //Calculate rotated point coordinates
        atoms_in_chain[b].y = atoms_in_chain[b].x*rot_sin
                            + atoms_in_chain[b].y*rot_cos;
        atoms_in_chain[b].x = atoms_in_chain[b].x*rot_cos
                            - atoms_in_chain[b].y*rot_sin;

        atoms_in_chain[b].mesh.position.y = atoms_in_chain[b].y;
        atoms_in_chain[b].mesh.position.x = atoms_in_chain[b].x;
        }
      }
    },
    rotateAboutY:function(angle) {
      var rot_cos = Math.cos(angle);
      var rot_sin = Math.sin(angle);

      for (var a = 0; a < this.aminoAcidChain.length; a++) {
        var atoms_in_chain = this.aminoAcidChain[a].atoms;
        for (var b = 0; b < this.aminoAcidChain[a].atoms.length; b++) {

          //Calculate rotated point coordinates
          atoms_in_chain[b].z = atoms_in_chain[b].z*rot_cos
                              + atoms_in_chain[b].x*rot_sin;
          atoms_in_chain[b].x = atoms_in_chain[b].x*rot_cos
                              - atoms_in_chain[b].z*rot_sin;
          //atoms_in_chain[b].mesh.position.y = atoms_in_chain[b].y;
          atoms_in_chain[b].mesh.position.z = atoms_in_chain[b].z;
          atoms_in_chain[b].mesh.position.x = atoms_in_chain[b].x;
          }
        }
      },
  //rot matrix around x: [x  y*cos(B)-z*sin(B)  y*sin(B)+z*cos(B)]
  //If moved to [1,1,1] first, get [x  y*(cos(B)-sin(B))  z*sin(B)]
  rotateByPhi:function (angle) {
    //todo: fix this to use actual passed angle

    //Psuedorandom gen of which AA to choose
    //var nInt = Math.floor(Math.random()*this.aminoAcidChain.length-1);
    //if (nInt < 0) nInt = nInt *-1;
    var nInt = 2;

    /**
    //Pseudorandom gen of rot amount
    var rInt = Math.random(); //# in [0,1]
    var rot;
    if (rInt < 0.5) { //do a negative rotation
      //Rotate by rInt% of -Math.PI/2
      rot = rInt*Math.PI/2*-1;
    }
    else if (rInt >= 0.5) { //do a positive rotation
      //Rotate by rInt% of +Math.PI/2
      rot = (rInt/2)*Math.PI/2;
    }
    **/
    rot = angle;

    console.log("Chain[%f] selected -> %o", nInt, this.aminoAcidChain[nInt]);
    console.log("Phi rotation selected = %f", rot);

    var theCos = Math.cos(rot);
    var theSin = Math.sin(rot);
    console.log("the cos = %f", theCos);
    console.log("the sin = %f", theSin);
    /** Rotation Matrix
        [ c, -s, 0
          s,  c, 0
          0,  0, 1  ]
    **/

    for (var x = 0; x < this.aminoAcidChain.length; x++) {
      for (var v = 0; v < 7; v++) {
        //Log old location
        console.log("INITIAL : [ %f, %f, %f ]", this.aminoAcidChain[x].atoms[v].x,
                                                this.aminoAcidChain[x].atoms[v].y,
                                                this.aminoAcidChain[x].atoms[v].z);

        //Log old distance to neighboring amino acid
        if (x > 0) {
          var xdiff2 = this.aminoAcidChain[x].atoms[v].x - this.aminoAcidChain[x-1].atoms[v].x;
          xdiff2 = xdiff2 * xdiff2;
          var ydiff2 = this.aminoAcidChain[x].atoms[v].y - this.aminoAcidChain[x-1].atoms[v].y;
          ydiff2 = ydiff2 * ydiff2;
          var zdiff2 = this.aminoAcidChain[x].atoms[v].z - this.aminoAcidChain[x-1].atoms[v].z;
          xdiff2 = xdiff2 * xdiff2;
          var dist_old = Math.sqrt(xdiff2 + ydiff2 + zdiff2);
        }

        //Calculate new locations -- around x-axis so x is constant
        //If moved to [1,1,1] first, get [x  y*(cos(B)-sin(B))  z*sin(B)]
        this.aminoAcidChain[x].atoms[v].y = this.aminoAcidChain[x].atoms[v].y*theCos +
                                            this.aminoAcidChain[x].atoms[v].z*theSin;
        this.aminoAcidChain[x].atoms[v].z = this.aminoAcidChain[x].atoms[v].z*theCos +
                                            this.aminoAcidChain[x].atoms[v].y*theSin*-1;

        if (x > 0) {
          //Log new distance to neighboring amino acid
          var xdiff2 = this.aminoAcidChain[x].atoms[v].x - this.aminoAcidChain[x-1].atoms[v].x;
          xdiff2 = xdiff2 * xdiff2;
          var ydiff2 = this.aminoAcidChain[x].atoms[v].y - this.aminoAcidChain[x-1].atoms[v].y;
          ydiff2 = ydiff2 * ydiff2;
          var zdiff2 = this.aminoAcidChain[x].atoms[v].z - this.aminoAcidChain[x-1].atoms[v].z;
          xdiff2 = xdiff2 * xdiff2;
          var dist = Math.sqrt(xdiff2 + ydiff2 + zdiff2);
          console.log("%f -> %f", dist_old, dist);


          //Log new location
          console.log("POST-ROT : [ %f, %f, %f ]", this.aminoAcidChain[x].atoms[v].x,
          this.aminoAcidChain[x].atoms[v].y,
          this.aminoAcidChain[x].atoms[v].z);
        }

        //translate mesh of geometries
        this.aminoAcidChain[x].atoms[v].mesh.position.x(this.aminoAcidChain[x].atoms[v].x);
        this.aminoAcidChain[x].atoms[v].mesh.position.y(this.aminoAcidChain[x].atoms[v].y);
        this.aminoAcidChain[x].atoms[v].mesh.position.z(this.aminoAcidChain[x].atoms[v].z);
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

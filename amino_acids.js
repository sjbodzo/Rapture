var glycine = {
  color: 0x3366FF,
  letter: 'G' }

var alanine = {
  color: 0x6633FF,
  letter: 'A' }

var valine = {
  color: 0xCC33FF,
  letter: 'V' }

var leucine = {
  color: 0xFF33CC,
  letter: 'L' }

var isoleucine = {
  color: 0x33CCFF,
  letter: 'I' }

var proline = {
  color: 0x003DF5,
  letter: 'P' }

var phenylalanine = {
  color: 0x002EB8,
  letter: 'F' }

var tyrosine = {
  color: 0xFF3366,
  letter: 'Y' }

var tryptophan = {
  color: 0x33FFCC,
  letter: 'W' }

var serine = {
  color: 0xB88A00,
  letter: 'S' }

var threonine = {
  color: 0xF5B800,
  letter: 'T' }

var cysteine = {
  color: 0xFF6633,
  letter: 'C' }

var methionine = {
  color: 0x33FF66,
  letter: 'M' }

var asparagine = {
  color: 0x66FF33,
  letter: 'N' }

var glutamine = {
  color: 0xCCFF33,
  letter: 'Q' }

var lysine = {
  color: 0xFFCC33,
  letter: 'K' }

var arginine = {
  color: 0x8A2E5C,
  letter: 'R' }

var histidine = {
  color: 0xCC6666,
  letter: 'H' }

var aspartate = {
  color: 0x66CCCC,
  letter: 'D' }

var glutamate = {
  color: 0x99CC66,
  letter: 'E' }

function identifyByLetter(char) {
  if (char == 'G') {
    return glycine;
  }
  else if (char == 'A') {
    return alanine;
  }
  else if (char == 'V') {
    return valine;
  }
  else if (char == 'L') {
    return leucine;
  }
  else if (char == 'I') {
    return isoleucine;
  }
  else if (char == 'P') {
    return proline;
  }
  else if (char == 'F') {
    return phenylalanine;
  }
  else if (char == 'Y') {
    return tyrosine;
  }
  else if (char == 'W') {
    return tryptophan;
  }
  else if (char == 'S') {
    return serine;
  }
  else if (char == 'T') {
    return threonine;
  }
  else if (char == 'C') {
    return cysteine;
  }
  else if (char == 'M') {
    return methionine;
  }
  else if (char == 'N') {
    return asparagine;
  }
  else if (char == 'Q') {
    return glutamine;
  }
  else if (char == 'K') {
    return lysine;
  }
  else if (char == 'R') {
    return arginine;
  }
  else if (char == 'H') {
    return histidine;
  }
  else if (char == 'D') {
    return aspartate;
  }
  else {
    return glutamate;
  }
}

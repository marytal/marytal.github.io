V = {
  add: function(v1, v2){
    return [v2[0] + v1[0], v2[1] + v1[1]];
  },

  subtract: function(v1, v2){
    return [v2[0] - v1[0], v2[1] - v1[1]];
  },

  magnitude: function(v){
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))
  },

  scale: function(v, scale){
    newVector = [v[0] * scale, v[1] * scale];
    if (newVector[0] == -0)
      newVector[0] = 0;
    if (newVector[1] == -0)
      newVector[1] = 0;
    
    return newVector;
    },

  dotproduct: function(v1, v2){
    return (v1[0] * v2[0] + v1[1] * v2[1]);
  },

  normalize: function(v) {
    var magnitude = V.magnitude(v);
    if(magnitude == 0)
      return [0,0];
    return V.scale(v, 1 / magnitude);
  },


}


Vmodify = {
  add: function(v1, v2){
    v1[0] += v2[0];
    v1[1] += v2[1];
  },

  subtract: function(v1, v2){
    v2[0] -= v1[0];
    v2[1] -= v1[1];
  },

  scale: function(v, scale){
    v[0] *= scale;
    v[1] *= scale;
  }
}
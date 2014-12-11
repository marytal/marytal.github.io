// Maximum and minimum integers not tested.

describe("Calculated Vectors", function() {
  it("adds", function() {
    expect(V.add([2, 3], [5, 7])).toEqual([7,10]);
    // Edge case: adding zeros
    expect(V.add([0, 3], [5, 0])).toEqual([5,3]);
    // Edge case: adding negatives
    expect(V.add([-30, 13], [5, -4])).toEqual([-25,9]);
  });

  it("subtracts", function() {
    expect(V.subtract([5, 10], [3, 6])).toEqual([-2, -4]);
    // Edge case: subtracting negatives
    expect(V.subtract([-5, -10], [3, 6])).toEqual([8, 16]);
    // Edge case: subtracting from negatives
    expect(V.subtract([5, 10], [-3, -6])).toEqual([-8, -16]);
  });

  it("scales", function() {
    expect(V.scale([5, 10], 5)).toEqual([25, 50]);
    // Edge case: scalar is negative
    expect(V.scale([1, 10], -5)).toEqual([-5, -50]);
    // Edge case: scalar is zero
    expect(V.scale([7, 10], 0)).toEqual([0, 0]);
    // Edge case: negative zero (Jasmine framework issue)
    expect(V.scale([0, 12], -2)).toEqual([0, -24]);
  });

  it("determines magnitude", function() {
    expect(V.magnitude([6, 8])).toEqual(10);
    // Edge case: magnitude is zero
    expect(V.magnitude([0, 0])).toEqual(0);
    // Magnitude is not integer
    expect(V.magnitude([6, 12])).toBeCloseTo(13.42);
    // Edge case: zero values
    expect(V.magnitude([0, 8])).toEqual(8);
    // Edge case: negative values
    expect(V.magnitude([-6, 8])).toEqual(10);
  });

  it("normalizes vector", function() {
    var v = V.normalize([6, 8]);
    expect(v[0]).toBeCloseTo(0.6);
    expect(v[1]).toBeCloseTo(0.8);

    // Edge case: magnitude is negative
    v = V.normalize([-23, 4]);
    expect(v[0]).toBeCloseTo(-0.99);

    // Edge case: magnitude is zero
    v = V.normalize([0,0]);
    expect(v).toEqual([0,0]);
  });

  it("determines the dot product", function() {
    expect(V.dotproduct([3,4],[5,3])).toEqual(27);

    // Edge case: negative values
    expect(V.dotproduct([3,-4],[5,3])).toEqual(3);

    // Edge case: zero values
    expect(V.dotproduct([0,4],[5,3])).toEqual(12);
  });

});


describe("Modified Vectors", function(){

  it("adds", function() {
    var v1 = [2,3];
    Vmodify.add(v1, [5, 7])
    expect(v1).toEqual([7,10]);
  });

  it("subtracts", function() {
    var v2 = [3,6];
    Vmodify.subtract([5, 10], v2);
    expect(v2).toEqual([-2,-4]);
  });

  it("scales", function() {
    var v = [3,6];
    Vmodify.scale(v, 5);
    expect(v).toEqual([15,30]);
  });

})
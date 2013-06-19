describe("$canvas", function() {
  var canvas;

  beforeEach(inject(function($canvas) {
    canvas = $canvas;
  }));

  describe("#startLine", function() {
    it("calls beginPath of context", function() {
      spyOn(canvas.context, "beginPath")
      canvas.startLine({x: 0, y: 0})
      expect(canvas.context.beginPath).toHaveBeenCalled()
    });

    it("moves to the x and y coordinates", function() {
      spyOn(canvas.context, "moveTo")
      canvas.startLine({x: 0, y: 0})
      expect(canvas.context.moveTo).toHaveBeenCalledWith(0, 0)
    });
  });

  describe("#drawSegment", function() {
    it("draws a line", function() {
      spyOn(canvas.context, "lineTo")
      spyOn(canvas.context, "stroke")
      canvas.drawSegment({x: 2, y: 2})
      expect(canvas.context.lineTo).toHaveBeenCalledWith(2,2)
      expect(canvas.context.stroke).toHaveBeenCalled()
    });
  });

  describe("#endLine", function() {
    it("calls closePath of context", function() {
      spyOn(canvas.context, "closePath")
      canvas.endLine()
      expect(canvas.context.closePath).toHaveBeenCalled()
    });
  });

  describe("#drawLine", function() {
    it("draws a series of points", function() {
      spyOn(canvas.context, "beginPath")
      spyOn(canvas.context, "moveTo")
      spyOn(canvas.context, "lineTo")
      spyOn(canvas.context, "stroke")
      spyOn(canvas.context, "closePath")

      canvas.drawLine([
        { x: 0, y: 0},
        { x: 10, y: 10},
        { x: 20, y: 20}
      ])

      expect(canvas.context.beginPath).toHaveBeenCalled()
      expect(canvas.context.moveTo).toHaveBeenCalledWith(0,0)
      expect(canvas.context.lineTo).toHaveBeenCalledWith(10,10)
      expect(canvas.context.lineTo).toHaveBeenCalledWith(20,20)
      expect(canvas.context.stroke.callCount).toEqual(2)
      expect(canvas.context.closePath).toHaveBeenCalled()
    });
  });

  describe("#drawText", function() {
    it("draws text", function() {
      spyOn(canvas.context, "fillText")

      canvas.drawText("cool", {x: 20, y: 40})
      expect(canvas.context.fillText).toHaveBeenCalledWith("cool", 20, 40)
    });
  });
});

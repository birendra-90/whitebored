describe("$clear", function() {
  var clear, canvas;

  beforeEach(inject(function($clear, $canvas) {
    clear = $clear;
    canvas = $canvas;
  }));

  describe("#clear", function() {
    it("calls canvas.clear", function() {
      spyOn(canvas, "clear")
      clear.clear()
      expect(canvas.clear).toHaveBeenCalled()
    });

    it("sends push event", function() {

    });

    it("stores to tape", function() {

    });
  });
});

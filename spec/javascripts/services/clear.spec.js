describe("$clear", function() {
  var clear, canvas, event;

  beforeEach(inject(function($clear, $canvas, $event) {
    clear = $clear;
    canvas = $canvas;
    event = $event;
    spyOn(event, "publish")
  }));

  describe("#clear", function() {
    it("calls canvas.clear", function() {
      spyOn(canvas, "clear")
      clear.execute()
      expect(canvas.clear).toHaveBeenCalled()
    });

    it("publishes an event", function() {
      clear.execute()
      expect(event.publish).toHaveBeenCalledWith({
        type: "clear",
        payload: {
          user_id: 66
        }
      })
    });
  });
});

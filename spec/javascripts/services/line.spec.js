describe("$line", function() {
  var push, line, canvas;

  beforeEach(inject(function($line, $push, $canvas) {
    line = $line;
    push = $push;
    canvas = $canvas;
  }));

  describe("#mousedown", function() {
    it("stores the current point", function() {
      line.mousedown({ pageX: 0, pageY: 0, preventDefault: jasmine.createSpy()})
      expect(line.points).toEqual([{x: 0, y: 0}])
    });
  });

  describe("#mouseup", function() {
    beforeEach(function() {
      line.points = [
        {x: 0, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 2}
      ]
    })

    it("draws a line on the canvas", function() {
      spyOn(canvas, "drawLine")
      line.mouseup({ preventDefault: jasmine.createSpy()})
      expect(canvas.drawLine).toHaveBeenCalledWith([
        {x: 0, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 2}
      ])
    });

    it("publishes line to push server", function() {
      spyOn(push, "sendMessage")
      line.mouseup({ preventDefault: jasmine.createSpy()})
      expect(push.sendMessage).toHaveBeenCalledWith({
        type: "line",
        payload: {
          points: [
            {x: 0, y: 0},
            {x: 1, y: 1},
            {x: 2, y: 2}
          ],
          user_id: 66
        }
      })
    });

    it("clears points", function() {
      line.mouseup({ preventDefault: jasmine.createSpy()})
      expect(line.points.length).toEqual(0)
    });
  });

  describe("#mousemove", function() {
    describe("when active", function() {
      beforeEach(function() {
        line.mousedown({pageX: 0, pageY: 0, preventDefault: jasmine.createSpy()})
      });

      it("appends to points", function() {
        line.mousemove({
          pageX: 123,
          pageY: 456
        })

        expect(line.points.length).toEqual(2)
        expect(line.points[1]).toEqual({
          x: 123,
          y: 456
        })
      });
    });

    describe("when inactive", function() {
      it("does nothing", function() {
        line.mousemove({
          pageX: 123,
          pageY: 456
        })
        expect(line.points.length).toBeFalsy()
      });
    });
  });
});

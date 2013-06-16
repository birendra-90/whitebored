describe("$line", function() {
  var push, line, canvas, tape;

  beforeEach(inject(function($line, $push, $canvas, $tape) {
    line = $line;
    push = $push;
    canvas = $canvas;
    tape = $tape;
  }));

  describe("#mousedown", function() {
    it("stores the current point", function() {
      line.mousedown({ pageX: 0, pageY: 0, preventDefault: jasmine.createSpy()})
      expect(line.points).toEqual([{x: 0, y: 0}])
    });

    it("starts a line on the canvas", function() {
      spyOn(canvas, "startLine")
      line.mousedown({ pageX: 0, pageY: 0, preventDefault: jasmine.createSpy()})
      expect(canvas.startLine).toHaveBeenCalledWith({x: 0, y: 0})
    });
  });

  describe("#mouseup", function() {
    beforeEach(function() {
      line.points = [
        {x: 0, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 2}
      ]

      spyOn(tape, "save")
    })

    it("publishes line to push server", function() {
      spyOn(push, "sendMessage")
      line.mouseup({ preventDefault: jasmine.createSpy()})
      expect(push.sendMessage).toHaveBeenCalledWith({
        type: "line",
        payload: JSON.stringify({
          points: [
            {x: 0, y: 0},
            {x: 1, y: 1},
            {x: 2, y: 2}
          ],
          user_id: 66
        })
      })
    });

    it("saves line to tape", function() {
      line.mouseup({ preventDefault: jasmine.createSpy()})
      expect(tape.save).toHaveBeenCalledWith("poop", {
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

    it("ends line on canvas", function() {
      spyOn(canvas, "endLine")
      line.mouseup({ preventDefault: jasmine.createSpy()})
      expect(canvas.endLine).toHaveBeenCalled()
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

      it("draws a line segment on the canvas", function() {
        spyOn(canvas, "drawSegment")
        line.mousemove({ pageX: 10, pageY: 10 })
        expect(canvas.drawSegment).toHaveBeenCalledWith({x: 10, y: 10})
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
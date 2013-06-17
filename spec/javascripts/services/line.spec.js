describe("$line", function() {
  var line, event, canvas;

  beforeEach(inject(function($line, $event, $canvas) {
    line = $line;
    event = $event;
    canvas = $canvas;
  }));

  describe("#mousedown", function() {
    it("stores the current point", function() {
      line.mousedown({ offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})
      expect(line.points).toEqual([{x: 0, y: 0}])
    });

    it("starts a line on the canvas", function() {
      spyOn(canvas, "startLine")
      line.mousedown({ offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})
      expect(canvas.startLine).toHaveBeenCalledWith({x: 0, y: 0})
    });
  });

  describe("#mouseup", function() {
    it("does nothing unless active", function() {
      spyOn(event, "publish")
      line.mouseup({preventDefault: jasmine.createSpy()})
      expect(event.publish)
    });

    describe("when active", function() {
      beforeEach(function() {
        line.mousedown({offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})

        line.points = [
          {x: 0, y: 0},
          {x: 1, y: 1},
          {x: 2, y: 2}
        ]

        spyOn(event, "publish")
      })

      it("publishes line payload", function() {
        line.mouseup({ preventDefault: jasmine.createSpy()})
        expect(event.publish).toHaveBeenCalledWith({
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
    })
  });

  describe("#mousemove", function() {
    describe("when active", function() {
      beforeEach(function() {
        line.mousedown({offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})
      });

      it("appends to points", function() {
        line.mousemove({
          offsetX: 123,
          offsetY: 456
        })

        expect(line.points.length).toEqual(2)
        expect(line.points[1]).toEqual({
          x: 123,
          y: 456
        })
      });

      it("draws a line segment on the canvas", function() {
        spyOn(canvas, "drawSegment")
        line.mousemove({ offsetX: 10, offsetY: 10 })
        expect(canvas.drawSegment).toHaveBeenCalledWith({x: 10, y: 10})
      });
    });

    describe("when inactive", function() {
      it("does nothing", function() {
        line.mousemove({
          offsetX: 123,
          offsetY: 456
        })
        expect(line.points.length).toBeFalsy()
      });
    });
  });
});

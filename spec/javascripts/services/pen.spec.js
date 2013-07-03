describe("$pen", function() {
  var pen, event, canvas;

  beforeEach(inject(function($pen, $event, $canvas) {
    pen = $pen;
    event = $event;
    canvas = $canvas;
  }));

  describe("#mousedown", function() {
    it("stores the current point", function() {
      pen.mousedown({ offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})
      expect(pen.points).toEqual([{x: 0, y: 0}])
    });

    it("starts a line on the canvas", function() {
      spyOn(canvas, "startLine")
      pen.mousedown({ offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})
      expect(canvas.startLine).toHaveBeenCalledWith({x: 0, y: 0})
    });
  });

  describe("#mousemove", function() {
    describe("when active", function() {
      beforeEach(function() {
        pen.mousedown({offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})
      });

      it("appends to points", function() {
        pen.mousemove({
          offsetX: 123,
          offsetY: 456
        })

        expect(pen.points.length).toEqual(2)
        expect(pen.points[1]).toEqual({
          x: 123,
          y: 456
        })
      });

      it("draws a line segment on the canvas", function() {
        spyOn(canvas, "drawSegment")
        pen.mousemove({ offsetX: 10, offsetY: 10 })
        expect(canvas.drawSegment).toHaveBeenCalledWith({x: 10, y: 10}, { color: "#000000"})
      });

      it("allows color", function() {
        spyOn(canvas, "drawSegment")
        pen.setColor("#f0f0f0")
        pen.mousemove({ offsetX: 10, offsetY: 10 })
        expect(canvas.drawSegment).toHaveBeenCalledWith({x: 10, y: 10}, { color: "#f0f0f0"})
      });
    });

    describe("when inactive", function() {
      it("does nothing", function() {
        pen.mousemove({
          offsetX: 123,
          offsetY: 456
        })
        expect(pen.points.length).toBeFalsy()
      });
    });
  });

  describe("#mouseup", function() {
    it("does nothing unless active", function() {
      spyOn(event, "publish")
      pen.mouseup({preventDefault: jasmine.createSpy()})
      expect(event.publish)
    });

    describe("when active", function() {
      beforeEach(function() {
        pen.mousedown({offsetX: 0, offsetY: 0, preventDefault: jasmine.createSpy()})

        pen.points = [
          {x: 0, y: 0},
          {x: 1, y: 1},
          {x: 2, y: 2}
        ]

        spyOn(event, "publish")
      })

      it("publishes line payload", function() {
        pen.mouseup({ preventDefault: jasmine.createSpy()})
        expect(event.publish).toHaveBeenCalledWith({
          type: "line",
          payload: {
            points: [
              {x: 0, y: 0},
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            color: "#000000",
            user_id: 66
          }
        })
      });

      it("clears points", function() {
        pen.mouseup({ preventDefault: jasmine.createSpy()})
        expect(pen.points.length).toEqual(0)
      });

      it("ends line on canvas", function() {
        spyOn(canvas, "endLine")
        pen.mouseup({ preventDefault: jasmine.createSpy()})
        expect(canvas.endLine).toHaveBeenCalled()
      });
    })
  });

  describe("replaying", function() {
    it("retains points and color", function() {
      spyOn(canvas, "drawLine")
      event.trigger({
        type: "line",
        payload: {
          points: [{x: 0, y: 0}, {x: 10, y: 10}],
          color: "#ff0000"
        }
      })

      // without a manual flush, this test runs too fast and the queue is never cleared
      pen.flush()
      expect(canvas.drawLine).toHaveBeenCalledWith([{x: 0, y: 0}, {x: 10, y: 10}], {color: "#ff0000"})
    });
  });
});

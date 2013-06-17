describe("$event", function() {
  var event, tape, push;

  beforeEach(inject(function($event, $tape, $push) {
    event = $event;
    tape = $tape;
    push = $push;

    spyOn(tape, "save")
  }));

  describe("#publish", function() {
    it("passes json along to tape", function() {
      event.publish({
        type: "line",
        payload: {
          species: "kitten",
          cute: true
        }
      })

      expect(tape.save).toHaveBeenCalledWith({
        type: "line",
        payload: {
          species: "kitten",
          cute: true
        }
      })
    });

    it("passes stringified json to the push server", function() {
      spyOn(push, "sendMessage")

      event.publish({
        type: "line",
        payload: {
          species: "kitten",
          cute: true
        }
      })

      expect(push.sendMessage).toHaveBeenCalledWith({
        type: "line",
        payload: JSON.stringify({
          species: "kitten",
          cute: true
        })
      })
    });
  });
});

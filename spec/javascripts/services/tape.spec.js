describe("$tape", function() {
  var tape;

  beforeEach(inject(function($tape) {
    tape = $tape;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  describe("#record", function() {
    it("sends json to the server", function() {
      $httpBackend.expectPOST(
        "/api/tapes/save",
        {
          label: "slug",
          event: {
            cool: "nice"
          }
        }
      ).respond(200)

      tape.save("slug", {cool: "nice"})

      $httpBackend.flush()
    });
  });
});

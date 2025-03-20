//var campaign = require('./campaignModel'); <== to define with dynamo db if schema required

module.exports = function (app) {
  // api crud for campaign

  //app.get()
  app.get("/campaign", function (req, res) {});

  //app.get()
  app.get(
    "/campaign/:campaignId/lot/:sequenceID/messageSents",
    function (req, res) {}
  );

  //app.post()
  app.post("/campaign/:campaignId/upload/entryFile", function (req, res) {});

  //app.put()

  app.put("/api/quote/:id", function (req, res) {});

  //app.delete()

  app.delete("/api/quote/:id", function (req, res) {});
};

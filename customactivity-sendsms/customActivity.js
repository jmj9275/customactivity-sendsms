define(["postmonger"], function (Postmonger) {
  "use strict";

  var mockCampaign = require('./mockCampaign.json');
  var connection = new Postmonger.Session();
  var payload = {};
  var telephoneMobile;
  var codePostalVille;
  var nomEnquete;
  var SubscriberKey;
  var campaignDisplay;

  $(window).ready(onRender);

  connection.on("initActivity", initialize);
  connection.on("requestedTokens", onGetTokens);
  connection.on("requestedEndpoints", onGetEndpoints);

  connection.on("clickedNext", onClickedNext);

  function onRender() {
    // JB will respond the first time 'ready' is called with 'initActivity'
    connection.trigger("ready");

    connection.trigger("requestTokens");
    connection.trigger("requestEndpoints");
    getCampaignData();

    // Disable the next button if a value isn't selected
    $("#select1").change(function () {
      var message = getMessage();
      connection.trigger("updateButton", {
        button: "done",
        enabled: Boolean(message),
      });

      $("#message").html(message);
    });
  }

  function initialize(data) {
    document.getElementById("configuration").value = campaignDisplay;

    if (data) {
      payload = data;
    }

    var message;
    var hasInArguments = Boolean(
      payload["arguments"] &&
        payload["arguments"].execute &&
        payload["arguments"].execute.inArguments &&
        payload["arguments"].execute.inArguments.length > 0
    );

    var inArguments = hasInArguments
      ? payload["arguments"].execute.inArguments
      : {};

    $.each(inArguments, function (index, inArgument) {
      $.each(inArgument, function (key, val) {
        if (key === "SubscriberKey") {
          SubscriberKey = val;
        }
        if (key === "telephoneMobile") {
          telephoneMobile = val;
        }
        if (key === "codePostalVille") {
          codePostalVille = val;
        }
        if (key === "nomEnquete") {
          nomEnquete = val;
        }
        if (key === "message") {
          message = val;
        }
      });
    });

    // If there is no message selected, disable the next button
    if (!message) {
      connection.trigger("updateButton", { button: "done", enabled: false });
      // If there is a message, skip to the summary step
    } else {
      $("#select1")
        .find("option[value=" + message + "]")
        .attr("selected", "selected");
      $("#message").html(message);
    }
  }

  function onGetTokens(tokens) {
    // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
    // console.log(tokens);
  }

  function onGetEndpoints(endpoints) {
    // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
    // console.log(endpoints);
  }

  function onClickedNext() {
    save();
  }

  function save() {
    var name = $("#select1").find("option:selected").html();
    var value = getMessage();

    // 'payload' is initialized on 'initActivity' above.
    // Journey Builder sends an initial payload with defaults
    // set by this activity's config.json file.  Any property
    // may be overridden as desired.
    //payload.name = name;
    //payload["arguments"].execute.inArguments.push({
       /* "telephoneMobile": telephoneMobile,
        "codePostalVille": codePostalVille,
        "nomEnquete": nomEnquete,
        "SubscriberKey": SubscriberKey,*/
       // "campaignId": value
     // }); 
    
    

    payload["metaData"].isConfigured = true;

    connection.trigger("updateActivity", payload);
  }

  function getMessage() {
    return $("#select1").find("option:selected").attr("value").trim();
  }

  function getCampaignData() {
    // get json 
    // create object to display
     // obj recomposed
    let campaign = mockCampaign.content[0];
    campaignDisplay = {
      "campaignId": campaign.id,
      "campaignRef": campaign.campaignRef,
      "title": campaign.title,
      "description": campaign.description,
      "nbMsgSent": campaign.nbMsgSent,
      "author": campaign.author,
      "templateId": campaign.template[0].id,
      "templateContent": campaign.template[0].content,
      "channelCode": campaign.template[0].channelCode
    }
    return campaignDisplay;
  }
});

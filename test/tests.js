QUnit.test("getIpDoneCallback", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("your-ip");
    assert.equal(elem[0].innerHTML, "Your IP: ", "Initial HTML element content is correct");
    App.getIpDoneCallback({'data': {'ip': '8.8.8.8'}});
    assert.equal(elem[0].innerHTML, "Your IP: 8.8.8.8", "IP address is correctly set");
});

QUnit.test("getIpFailCallback bad request (status=400)", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("your-ip");
    assert.equal(elem[0].innerHTML, "Your IP: ", "Initial HTML element content is correct");
    App.getIpFailCallback({status: 400, responseJSON: {error: {message: 'Error text'}}});
    assert.equal(elem[0].innerHTML, "Your IP: " + 'Error text');
});

QUnit.test("getIpFailCallback internal server error or other error statuses", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("your-ip");
    assert.equal(elem[0].innerHTML, "Your IP: ", "Initial HTML element content is correct");
    App.getIpFailCallback({status: 500});
    assert.equal(elem[0].innerHTML, "Your IP: " + 'Unable to access geolocation service. '
        + 'Please try again or contact system administrator');
});

QUnit.test("getIp test done-callback is called (AJAX call)", function () {

    let server = sinon.createFakeServer();
    server.respondImmediately = true;

    $.ajaxSetup({async: false});

    // console.log(server.requests); // Logs all requests so far

    server.respondWith("GET", App.backendUrl + "/ip", [
        200,
        {"Content-Type": "application/json"},
        JSON.stringify({"ip": "8.8.8.8"})
    ]);


    var callback = sinon.spy();
    App.getIp(App.backendUrl + "/ip", callback, callback);

    server.respond();

    sinon.assert.calledWith(callback, {ip: "8.8.8.8"});

    server.restore();

    QUnit.assert.ok(true, "getIp done-callback is called correctly");
});

QUnit.test("getGeolocation", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("additional-info");
    assert.equal(elem[0].innerHTML, "", "Initial HTML element content is correct");
    App.geolocationDoneCallback({'data': {'city': 'Mountain View', 'country': 'US'}});
    assert.equal(
        elem[0].innerHTML,
        '<span id="city">City: Mountain View</span>&nbsp;' + '<span id="country">Country: US</span>',
        "IP address is correctly set"
    );
});

QUnit.test("geolocationFailCallback bad request (status=400)", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("additional-info");
    assert.equal(elem[0].innerHTML, "", "Initial HTML element content is correct");
    App.geolocationFailCallback({status: 400, responseJSON: {error: {message: 'Error text'}}});
    assert.equal(elem[0].innerHTML, 'Error text');
});

QUnit.test("getIpFailCallback internal server error or other error statuses", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("additional-info");
    assert.equal(elem[0].innerHTML, "", "Initial HTML element content is correct");
    App.geolocationFailCallback({status: 500});
    assert.equal(elem[0].innerHTML, 'Unable to access geolocation service. '
        + 'Please try again or contact system administrator');
});

QUnit.test("getGeolocation test done-callback is called (AJAX call)", function () {

    let server = sinon.createFakeServer();
    server.respondImmediately = true;

    $.ajaxSetup({async: false});

    // console.log(server.requests); // Logs all requests so far

    server.respondWith("GET", App.backendUrl + "/ipinfo", [
        200,
        {"Content-Type": "application/json"},
        JSON.stringify({'data': {'city': 'Mountain View', 'country': 'US'}})
    ]);


    var callback = sinon.spy();
    App.getGeolocation(App.backendUrl + "/ipinfo", callback, callback);

    server.respond();

    sinon.assert.calledWith(callback, {'data': {'city': 'Mountain View', 'country': 'US'}});

    server.restore();

    QUnit.assert.ok(true, "getIp done-callback is called correctly");
});
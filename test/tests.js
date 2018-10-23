QUnit.test("getIpDoneCallback", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("your-ip");
    assert.equal(elem[0].innerHTML, "Your IP: ", "Initial HTML element content is correct");
    getIpDoneCallback({'ip': '8.8.8.8'});
    assert.equal(elem[0].innerHTML, "Your IP: 8.8.8.8", "IP address is correctly set");
});

QUnit.test("getIpFailCallback", function (assert) {
    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("your-ip");
    assert.equal(elem[0].innerHTML, "Your IP: ", "Initial HTML element content is correct");
    getIpFailCallback();
    assert.equal(elem[0].innerHTML, "Your IP: " + 'Unable to access geolocation service. '
        + 'Please try again or contact system administrator', 'Error message is correctly set');
});

QUnit.test("getIp success response (mocking AJAX call)", function (assert) {

    let server = sinon.createFakeServer();
    server.respondImmediately = true;

    $.ajaxSetup({
        async: false
    });

    var elem = document.getElementById("qunit-fixture")
        .getElementsByClassName("your-ip");
    assert.equal(elem[0].innerHTML, "Your IP: ", "Initial HTML element content is correct");


    // console.log(server.requests); // Logs all requests so far

    server.respondWith("GET", backendUrl, [
        200,
        {"Content-Type": "application/json"},
        JSON.stringify({"ip": "8.8.8.8"})
    ]);


    var callback = sinon.spy();
    getIp(backendUrl, getIpDoneCallback, getIpFailCallback);

    server.respond();

    // sinon.assert.calledWith(callback, {ip: "8.8.8.8"});

    assert.equal(elem[0].innerHTML, "Your IP: 8.8.8.8", "IP address is correctly set");

    server.restore();
});

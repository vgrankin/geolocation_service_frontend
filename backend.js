let backendUrl = "http://localhost:8000";

function getIpDoneCallback(data) {
    $('.your-ip').append(data.ip);
    console.log("here", data.ip);
}

function getIpFailCallback() {
    $("button").prop('disabled', true);
    $('.your-ip').append(
        'Unable to access geolocation service. '
        + 'Please try again or contact system administrator'
    );
}

function getIp(url, doneCallback, failCallback) {
    $.ajax(url)
        .done(doneCallback)
        .fail(failCallback);
}

function geolocationDoneCallback(data) {

    $("button").prop('disabled', true);

    if (data.hasOwnProperty('error')) {
        $('.additional-info').html(data.error);
    } else {
        $('.additional-info').html('<span id="city">City: ' + data.city + '</span>&nbsp;');
        $('.additional-info').append('<span id="country">Country: ' + data.country + '</span>');
    }
}

function geolocationFailCallback(data) {
    $('.additional-info').html(
        'Something went wrong during request to the server. '
        + 'Please try again or contact system administrator!'
    );
}

function getGeolocation(url, doneCallback, failCallback) {
    $.ajax({url: url})
        .done(doneCallback)
        .fail(failCallback);
}
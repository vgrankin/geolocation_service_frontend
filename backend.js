let backendUrl = "http://localhost:8000";

function getIpDoneCallback(data) {
    $('.your-ip').append(data.data.ip);
}

function getIpFailCallback(jqXHR) {

    if (jqXHR.status == 400) {
        $('.your-ip').append(jqXHR.responseJSON.error.message);
    } else {
        $('.your-ip').append(
            'Unable to access geolocation service. '
            + 'Please try again or contact system administrator'
        );
    }
}

function getIp(url, doneCallback, failCallback) {
    $.ajax(url)
        .done(doneCallback)
        .fail(failCallback);
}

function geolocationDoneCallback(data) {

    if (data.hasOwnProperty('error')) {
        $('.additional-info').html(data.error);
    } else {
        $('.additional-info').html('<span id="city">City: ' + data.data.city + '</span>&nbsp;');
        $('.additional-info').append('<span id="country">Country: ' + data.data.country + '</span>');
    }
}

function geolocationFailCallback(jqXHR) {
    if (jqXHR.status == 400) {
        $('.additional-info').html(jqXHR.responseJSON.error.message);
    } else {
        $('.additional-info').html(
            'Unable to access geolocation service. '
            + 'Please try again or contact system administrator'
        );
    }
}

function getGeolocation(url, doneCallback, failCallback) {
    $.ajax({url: url})
        .done(doneCallback)
        .fail(failCallback);
}
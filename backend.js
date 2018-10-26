var App = {
    backendUrl: "http://localhost:8000/api",
    allowedErrorStatuses: [400, 404],

    getIpDoneCallback: function (data) {
        $('.your-ip').append(data.data.ip);
    },

    getIpFailCallback: function (jqXHR) {
        if (App.allowedErrorStatuses.includes(jqXHR.status)) {
            $('.your-ip').append(jqXHR.responseJSON.error.message);
        } else {
            $('.your-ip').append(
                'Unable to access geolocation service. '
                + 'Please try again or contact system administrator'
            );
        }
    },

    getIp: function (url, doneCallback, failCallback) {
        $.ajax(url)
            .done(doneCallback)
            .fail(failCallback);
    },

    geolocationDoneCallback: function (data) {

        if (data.hasOwnProperty('error')) {
            $('.additional-info').html(data.error);
        } else {
            $('.additional-info').html('<span id="city">City: ' + data.data.city + '</span>&nbsp;');
            $('.additional-info').append('<span id="country">Country: ' + data.data.country + '</span>');
        }
    },

    geolocationFailCallback: function (jqXHR) {
        if (App.allowedErrorStatuses.includes(jqXHR.status)) {
            $('.additional-info').html(jqXHR.responseJSON.error.message);
        } else {
            $('.additional-info').html(
                'Unable to access geolocation service. '
                + 'Please try again or contact system administrator'
            );
        }
    },

    getGeolocation: function (url, doneCallback, failCallback) {
        $.ajax({url: url})
            .done(doneCallback)
            .fail(failCallback);
    }
}
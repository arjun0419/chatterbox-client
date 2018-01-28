$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('X-Parse-Application-Id', '');
  jqXHR.setRequestHeader('X-Parse-REST-API-Key', '');
});

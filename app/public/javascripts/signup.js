// bootstrap needs jQuery to be global
window.jQuery = $ = require('jquery')
var bootstrap = require('bootstrap')
var jqueryValidator = require('jquery-validation')

// wait until the document is loaded before running any javascript
$(document).ready(function (){

  // global form validation options
  $('#loginForm').validate({
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
            error.insertAfter(element);
    }
  });

  // custom username validator
  $.validator.addMethod('username', function (value, element){
    return this.optional(element) || !/\s/.test(value)
  }, 'Spaces are not allowed in usernames.')

  // display name validation
  $('#displayName').rules("add", {
    required: true
  });

  // username validation
  $('#username').rules("add", {
    required: true,
    username: true
  });

  // email validation
  $('#email').rules("add", {
    required: true,
    email: true
  });

  // email validation
  $('#email').rules("add", {
    required: true,
    email: true
  });

  // confirmation email validation
  $('#confirmEmail').rules("add", {
    equalTo: '#email',
    messages: {
      equalTo: "Emails do not match.",
    }
  });

  // password validation
  $('#password').rules("add", {
    required: true,
    minlength: 14,
    maxlength: 160
  });

  // confirmation passowrd validation
  $('#confirmPassword').rules("add", {
    equalTo: '#password',
    messages: {
      equalTo: "Passwords do not match.",
    }
  });

});
"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  ApiConnector.login(data, function (response) {
    console.log("login response:", response);

    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
    }
  });
};

userForm.registerFormCallback = function (data) {
  ApiConnector.register(data, function (response) {
    console.log("register response:", response);

    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }
  });
};

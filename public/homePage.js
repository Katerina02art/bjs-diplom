"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = function () {
  ApiConnector.logout((response) => {
    console.log("logout:", response);
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  console.log("current:", response);
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((response) => {
    console.log("stocks:", response);
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

updateRates();
setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    console.log("addMoney:", response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс успешно пополнен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    console.log("convertMoney:", response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Конвертация успешно выполнена");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    console.log("transferMoney:", response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Перевод успешно выполнен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

function refreshFavoritesAndUsersList(favorites) {
  favoritesWidget.clearTable();
  favoritesWidget.fillTable(favorites);
  moneyManager.updateUsersList(favorites);
}

ApiConnector.getFavorites((response) => {
  console.log("getFavorites:", response);

  if (response.success) {
    refreshFavoritesAndUsersList(response.data);
  } else {
    favoritesWidget.setMessage(false, response.error);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    console.log("addUserToFavorites:", response);

    if (response.success) {
      refreshFavoritesAndUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь добавлен в избранное");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    console.log("removeUserFromFavorites:", response);

    if (response.success) {
      refreshFavoritesAndUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь удалён из избранного");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

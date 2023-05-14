let isOrderAccepted = false;
let isValetFound = false;
let hasRestaurantSeenYourOrder = false;
let restaurantTimer = null;
let valetTimer = null;
let valetDeliveryTimer = null;
let isOrderDelivered = false;

window.addEventListener("load", function () {
  document.getElementById("acceptOrder").addEventListener("click", function () {
    askRestaurantToAcceptOrReject();
  });

  document.getElementById("findValet").addEventListener("click", function () {
    startSearchingForValets();
  });

  document.getElementById('deliverOrder').addEventListener('click', function() {
    setTimeout(() => {
        isOrderDelivered = true;
    }, 2000) 
  })

  checkIfOrderAcceptedFromRestaurant()
    .then((isOrderAccepted) => {
      console.log(isOrderAccepted);
      if (isOrderAccepted) {
        startPreparingOrder();
      } else {
        alert("Sorry we will refund your amount");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong! Please try again after sometime");
    });
  // console.log(res);
});

//check whether restaurant accepted order or not
function askRestaurantToAcceptOrReject() {
  setTimeout(() => {
    isOrderAccepted = confirm("Should restaurant accept order?");
    hasRestaurantSeenYourOrder = true;

    // console.log(isOrderAccepted);
  }, 1000);
}

//check if restaurant has accepeted order
function checkIfOrderAcceptedFromRestaurant() {
  return new Promise((res, rej) => {
    restaurantTimer = setInterval(() => {
      console.log("checking if order accepted or not");
      if (!hasRestaurantSeenYourOrder) return;

      if (isOrderAccepted) {
        res(true);
      } else {
        res(false);
      }
      clearInterval(restaurantTimer);
    }, 2000);
  });
}

function startPreparingOrder() {
  Promise.all([
    updateOrderStatus(),
    updateMapView(),
    checkIfValetAssigned(),
    checkIfOrderDelivered()

  ])
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        alert("Did you like it. Rate your food and delivery partner");
      }, 5000);
    })
    .catch((err) => {
      console.error(err);
    });
}

//helper functions
function updateOrderStatus() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      document.getElementById("currentStatus").innerText =
        isOrderDelivered ? 'Order delivered succesfully' : "Preparing your order";
      res("status updated");
    }, 1500);
  });
}

function updateMapView() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      document.getElementById("mapview").style.opacity = "1";
      res("map initialised");
    }, 1000);
  });
}

function startSearchingForValets() {
  const valetsPromises = [];
  for (let i = 0; i < 5; i++) {
    valetsPromises.push(getRandomDriver());
  }
  console.log(valetsPromises);

  Promise.any(valetsPromises)
    .then((selectedValet) => {
      console.log("Selected Valet = " + selectedValet);
      isValetFound = true;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getRandomDriver() {
  return new Promise((res, rej) => {
    const timeout = Math.random() * 1000;
    setTimeout(() => {
      res("Valet - " + timeout);
    }, timeout);
  });
}

function checkIfValetAssigned() {
  return new Promise((res, rej) => {
    valetTimer = setInterval(() => {
      console.log("Searching for valet");
      if (isValetFound) {
        updateValetDetails();
        res("Update valet details");
        clearTimeout(valetTimer);
      }
    }, 1000);
  });
}

function checkIfOrderDelivered() {
    return new Promise((res, rej) => {
        valetDeliveryTimer = setInterval(() => {
          console.log("Is order delivered by valet");
          if (isOrderDelivered) {
            res("Order Delivered valet details");
            updateOrderStatus();
            clearTimeout(valetDeliveryTimer);
          }
        }, 1000);
      });
}

function updateValetDetails() {
  if (isValetFound) {
    document.getElementById("finding-driver").classList.add("none");
    document.getElementById("found-driver").classList.remove("none");
    document.getElementById("call").classList.remove("none");
  }
}


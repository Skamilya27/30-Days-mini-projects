let isOrderAccepted = false;
let isValetFound = false;
let hasRestaurantSeenYourOrder = false;
let restaurantTimer = null;

window.addEventListener("load", function () {
  document.getElementById("acceptOrder").addEventListener("click", function () {
    askRestaurantToAcceptOrReject();
  });

  checkIfOrderAcceptedFromRestaurant()
        .then(isOrderAccepted => {
            console.log(isOrderAccepted);
            if(isOrderAccepted) {
                alert('Your order has been accepted');
            }
            else {
                alert('Sorry we will refund your amount');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Something went wrong! Please try again after sometime');
        })
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

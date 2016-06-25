$(function () {
  /*
   * Listens for changes in min-price element
   */
  $("#min-price").change(function() {
    var newMin = parseFloat($("#min-price").val());
    if (!isNaN(newMin)) {
      showSpotsAboveThisPrice(filterManager.allMarkers, newMin);
    }
  });

  /*
   * Listens for changes in max-price element
   */
   $("#max-price").change(function() {
     var newMax = parseFloat($("#max-price").val());
     if (!isNaN(newMax)) {
       showSpotsBelowThisPrice(filterManager.allMarkers, newMax);
     }
   });

   var options = {
      twentyFour: true,  //Display 24 hour format, defaults to false
      upArrow: 'wickedpicker__controls__control-up',  //The up arrow class selector to use, for custom CSS
      downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS
      close: 'wickedpicker__close', //The close class selector to use, for custom CSS
      hoverState: 'hover-state', //The hover state class to use, for custom CSS
      title: 'Time Picker' //The Wickedpicker's title
   };
   $('.timepicker').wickedpicker(options);
});

/*
 * Show only spots with prices lower than newMax
 */
function showSpotsBelowThisPrice(allMarkers, newMax) {
  var allMarkersLength = allMarkers.length;
  for (var i = 0; i < allMarkersLength; i++) {
    var obj = allMarkers[i];
    var pricingRestrictions = obj.spot.formatted_details.pricing_restrictions[0];

    if (pricingRestrictions !== undefined) {
      spotPrice = getSpotPrice(pricingRestrictions);
      if (spotPrice <= newMax) {
        obj.marker.marker.setVisible(true);
      } else {
        obj.marker.marker.setVisible(false);
      }
    }
  }
}

/*
 * Extract spot price from pricing restrictions string
 */
function getSpotPrice(pricingRestrictions) {
  var PRICE_REGEX = /[0-9]+\.[0-9][0-9]/;

  var i = pricingRestrictions.search(PRICE_REGEX);
  var j = pricingRestrictions.length;
  var priceStr = pricingRestrictions.substring(i,j);

  var spotPrice = parseFloat(priceStr);
  return spotPrice;
}

/*
 * Shows only spots with prices higher than newMin
 */
function showSpotsAboveThisPrice(allMarkers, newMin) {
  var allMarkersLength = allMarkers.length;
  for (var i = 0; i < allMarkersLength; i++) {
    var obj = allMarkers[i];
    var pricingRestrictions = obj.spot.formatted_details.pricing_restrictions[0];

    // If the spot has any pricing restrictions
    if (pricingRestrictions !== undefined) {
      spotPrice = getSpotPrice(pricingRestrictions);
      if (spotPrice >= newMin) {
        obj.marker.marker.setVisible(true);
      } else {
        obj.marker.marker.setVisible(false);
      }
    }
  }
}
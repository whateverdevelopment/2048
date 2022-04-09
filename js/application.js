// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

// Constants //
const accFeatures = {
	"accDyslexic": "accDyslexicState",
  "accNight": "accNightState",
}

// Global Functions //
// toggleIcon
function toggleIcon(iconID, iconState) {
	// Fetch Document Element
	var toggleIcon = document.getElementById(iconID);
	// Define Icon Classes
	var toggleOn = "images/vermilicon/toggle-right.svg";
	var toggleOff = "images/vermilicon/toggle-left.svg";

	// Set Button Icon
	if (iconState === true) {
    toggleIcon.src = toggleOn;
		toggleIcon.alt = "On";
	} else {
    toggleIcon.src = toggleOff;
		toggleIcon.alt = "Off";
	}
}
// toggleLSV
function toggleLSV(localVar) {
	// Enable / Disable & return new state.
	if (localStorage.getItem(localVar) === null) {
		// Set local storage variable.
		localStorage.setItem(localVar, "enabled");
		// Return that access feature is on.
		return true;
	} else if (localStorage.getItem(localVar) === "enabled") {
		// Remove local storage variable.
		localStorage.removeItem(localVar);
		// Return that access feature is off.
		return false;
	}
}
// toggleShow
function toggleShow(tgsID) {
  document.getElementById(tgsID).classList.toggle("show");
  event.preventDefault();
}


// Accessibility Functions
var accessibility = {
	// accDyslexic
	accDyslexic: function(toggleState) {
		// Enable or disable dyslexic font.
		if (toggleState === true) {
			document.documentElement.setAttribute("dyslexic", "on");
			// Set icon to enabled.
			toggleIcon("accDyslexicIcon", true);
		} else {
			document.documentElement.setAttribute("dyslexic", "off");
			// Set icon to disabled.
			toggleIcon("accDyslexicIcon", false);
		}
	},
  accNight: function(toggleState) {
    // Enable or disable night colors.
    if (toggleState === true) {
      document.documentElement.setAttribute("night", "on");
      // Set icon to enabled.
      toggleIcon("accNightIcon", true);
    } else {
      document.documentElement.setAttribute("night", "off");
      // Set icon to disabled.
      toggleIcon("accNightIcon", false);
    }
  },
	// buttonAction
	buttonAction: function(accFunction) {
		// Toggle local storage variable and get bool of new state.
		var accState = toggleLSV(accFeatures[accFunction]);
		// Call accessibility feature function and send it the LSV state.
		accessibility[accFunction](accState);
		// Prevent scroll
		event.preventDefault();
	},
	checkAll: function() {
		for (var accFunction in accFeatures) {
			if (localStorage.getItem(accFeatures[accFunction]) === "enabled") {
				accessibility[accFunction](true);
			}
		}
	}
}

// Page Load
document.addEventListener("DOMContentLoaded", function() {
	// Accessibility Checks
	accessibility.checkAll();
});

// Close Menu
window.onclick = function(event) {
  if (!event.target.matches('.menu-btn')) {
    var menus = document.getElementsByClassName("menu-content");
    var i;
    for (i = 0; i < menus.length; i++) {
      var openmenu = menus[i];
      if (openmenu.classList.contains('show')) {
        openmenu.classList.remove('show');
      }
    }
  }
}

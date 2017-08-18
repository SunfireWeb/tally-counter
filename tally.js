document.isSetError = false;
document.countval = 0;
document.countername = "TALLY COUNTER";
document.currCounterCount = 0;

function showMessage (counterID, msg, className, fadeOut) {
	if (typeof(className) == "undefined") className = "";
	if (typeof(fadeOut) == "undefined") fadeOut = false;
	$(counterID + " .message").text(msg).removeClass("error").removeClass("green");
	if (className != "") {
		$(counterID + " .message").addClass(className);
	}
	if (fadeOut) {
		setTimeout(function () {
			$(counterID + " .message").fadeOut("slow");
		}, 2000);
	}
}

function clearMessage () {
	$(".message").text("").removeClass("error").removeClass("green");
}

function changeStartValue(id) {
	var isSetError = false;
	var sv = $(id + " .newStartValue").val();
	if (sv == "" || sv == null) sv = 0;
	if(!$.isNumeric(sv)) {
		isSetError = true;
		showMessage(id, "Please enter numbers only.", "error");
	} else {
		sv = parseInt(sv);
		if (sv < -99999999 || sv > 99999999) {
			isSetError = true;
			showMessage(id, "Too many digits.", "error");
		}
	}
	if (!isSetError) {
		countval = sv;
		$(id + " .newStartValue").removeClass("error");
		$(id + " .tally").text(countval);
		$(id + " .startValueInput").hide();
		$(id + " .startVal").show();
	} else {
		$(id + " .newStartValue").addClass("error");
	}
	return isSetError;
}

function changeCounterName(id) {
	var isSetError = false;
	var newName = $(id + " .renameInputValue").val();
	if(newName == "" || newName == null) {
		newName = "TALLY COUNTER";
	}

	if (!isSetError) {
		$(id + " .renameInputValue").removeClass("error");
		countername = newName;
		$(id + " .name").html(countername);
		$(id + " .renameInput").hide();
		$(id + " .renameCounter").show();
	} else {
		$(id + " .renameInputValue").addClass("error");
	}
	return isSetError;
}

function setElementDataVals (id, num) {
	$(id).attr("data-counter", num);
	$(id+" div").each(function () {
		$(this).attr("data-counter",num);
	});
}

function getCurrCounterID (ele) {
	var num = $(ele).closest(".counter").attr("data-counter");
	return "#counter"+num;
}

$(document).ready(function() {
	countername = $(".name").html();
	setElementDataVals("#counter1", 1);

	//Counter Buttons
	$(".addBtn").on("click", function() {
		id = getCurrCounterID($(this));
		countval = parseInt($(id + " .tally").text());
		countval++;
		$(id + " .tally").text(countval);
	});

	$(".subBtn").on("click", function() {
		id = getCurrCounterID($(this));
		countval = parseInt($(id + " .tally").text());
		countval--;
		$(id + " .tally").text(countval);
	});

	//Reset Button
	$(".resetCount").on("click", function() {
		id = getCurrCounterID($(this));
		$(id + " .tally").text(0);
		$(id + " .newStartValue").val(0);
		showMessage(id, "Counter has been reset.", "green", true);
	});

	//Rename Button
	$(".renameCounter").on("click", function() {
		id = getCurrCounterID($(this));
		$(this).hide();
		$(id + " .renameInput").show();
		showMessage(id, "Enter the new name, then click SET.", "", false);
	});

	//Start Value Button
	$(".startVal").on("click", function() {
		id = getCurrCounterID($(this));
		$(this).hide();
		$(id + " .startValueInput").show();
		showMessage(id, "Enter the starting value, then click SET.", "", false);
	});

	$(".setStartValueBtn").on("click", function () {
		id = getCurrCounterID($(this));
		isSetError = changeStartValue(id);
		if (!isSetError) {
			clearMessage();
			$(id + " .startValueInput").hide();
			$(id + " .startVal").show();
		}
	});

	$(".renameInputBtn").on("click", function () {
		id = getCurrCounterID($(this));
		isSetError = changeCounterName(id);
		if (!isSetError) {
			clearMessage();
			$(id + " .renameInput").hide();
			$(id + " .renameCounter").show();
		}
	});

	//Add Another Counter Button
	$("#addNewCounter").on("click", function() {
		document.currCounterCount++;
		var cID = "counter"+document.currCounterCount;
		$("#counter0").clone(true).show().attr("id",cID).insertBefore($("#addCounter"));
		setElementDataVals("#"+cID, document.currCounterCount);
	});

	// create item 1
	$("#addNewCounter").click();
});
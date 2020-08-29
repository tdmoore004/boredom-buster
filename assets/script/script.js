// drop-down
$(document).ready(function () {
    $('select').formSelect();
});

// global DOM elements
let activityType = document.getElementsByClassName('activityType');
let activityCost = document.getElementsByClassName('activityCost');
let activityParticipants = document.getElementsByClassName('activityParticipants');


// RETURN SELECTED VALUES FROM FORM AND CREATE URL
// activity Type
function type() {
    for (let i = 0; i < activityType.length; i++) {
        // console.log(activityType)
        if (activityType[0].selected == true) {
            return "";
        } else if (activityType[i].selected == true) {
            const typeVal = "?type=" + activityType[i].text.toLowerCase();
            return typeVal;
        }
    }
}
// activityCost
function cost() {
    for (let i = 0; i < activityCost.length; i++) {
        if (activityCost[0].selected == true) {
            return "";
        } else if (type() == "" && activityCost[i].selected == true) {
            console.log(activityCost[i].text)
            const costVal = "?cost=" + activityCost[i].textContent;
            return costVal;
        } else if (activityCost[i].selected == true) {
            const costVal = "&cost=" + activityCost[i].text.toLowerCase();
            return costVal;
        }
    }
}
// activityParticipants
function participants() {
    for (let i = 0; i < activityParticipants.length; i++) {
        if (activityParticipants[0].selected == true) {
            return "";
        } else if (type() == "" && cost() == "" && activityCost[i].selected == true) {
            const costVal = "?participants=" + activityParticipants[i].text.toLowerCase();
            return costVal;
        }else if (activityParticipants[i].selected == true) {
            const participantsVal = '&participants=' + activityParticipants[i].text.toLowerCase();
            return participantsVal;
        }
    }
}


//Bored-API call
$('#searchBtn').on('click', function (event) {
    event.preventDefault();


    let boredQueryUrl = "https://www.boredapi.com/api/activity" + type() + cost() + participants();
    console.log(boredQueryUrl)


    $.ajax({
        url: boredQueryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);






        var activityName = response.activity
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + activityName;

        //Google Books API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })

    }).catch(function (error) {
        console.log(error);
    })

})
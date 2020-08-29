// drop-down
$(document).ready(function () {
    $('select').formSelect();
});

// global DOM elements
let activityType = document.getElementsByClassName('activityType');
let activityCost = document.getElementsByClassName('activityCost');
let activityParticipants = document.getElementsByClassName('activityParticipants');

//Bored-API call
$('#searchBtn').on('click', function (event) {
    event.preventDefault();
    $.ajax({
        url: "https://www.boredapi.com/api/activity/",
        method: "GET"
    }).then(function (response) {
        console.log(response);


        // RETURN SELECTED VALUES FROM FORM
        // activity Type
        for (let i = 0; i < activityType.length; i++) {
            if (activityType[i].selected == true) {
                console.log('Type selected: ' + activityType[i].text);
            }
        }
        // activityCost
        for (let i = 0; i < activityCost.length; i++) {
            if (activityCost[i].selected == true) {
                console.log('Cost selected: ' + activityCost[i].text);
            }
        }
        // activityParticipants
        for (let i = 0; i < activityParticipants.length; i++) {
            if (activityParticipants[i].selected == true) {
                console.log('Participants selected: ' + activityParticipants[i].text);
            }
        }



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
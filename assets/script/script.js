// drop-down
$(document).ready(function(){
    $('select').formSelect();
});


//Bored-API call
$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    $.ajax({
        url: "http://www.boredapi.com/api/activity/",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        var activityName = response.activity
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + activityName;
        
        //Google Books API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        })

    }).catch(function(error) {
        console.log(error);
    })

})



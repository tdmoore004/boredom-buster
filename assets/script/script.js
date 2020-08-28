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
    }).catch(function(error) {
        console.log(error);
    })

})

//Google Books API call
var queryURL = "https://www.googleapis.com/books/v1/volumes?q=take a bubble bath" 

$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    }).catch(function(error) {
        console.log(error);
    })

})

// drop-down
$(document).ready(function(){
    $('select').formSelect();
});


// Bored-API call
// let boredQueryUrl = "http://www.boredapi.com/api/activity/";

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
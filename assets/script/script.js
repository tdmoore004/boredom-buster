// drop-down and collapsible
$(document).ready(function (event) {
    $('select').formSelect();
    $('.collapsible').collapsible();
    
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
                console.log(activityCost[i].value)
                const costVal = "?minprice=0&maxprice=" + activityCost[i].value;
                return costVal;
            } else if (activityCost[i].selected == true) {
                const costVal = "&minprice=0&maxprice=" + activityCost[i].value;
                return costVal;
            }
        }
    }
    // activityParticipants
    function participants() {
        for (let i = 0; i < activityParticipants.length; i++) {
            if (activityParticipants[0].selected == true) {
                return "";
            } else if (type() == "" && cost() == "" && activityParticipants[i].selected == true) {
                const costVal = "?participants=" + activityParticipants[i].text.toLowerCase();
                return costVal;
            }else if (activityParticipants[i].selected == true) {
                const participantsVal = '&participants=' + activityParticipants[i].text.toLowerCase();
                return participantsVal;
            }
        }
    }
    
    // Display activity
    function displayActivity(activityResponse) {
    }
    
    //Bored-API call
    $('#searchBtn').on('click', function (event) {
        event.preventDefault();
        
        
        let boredQueryUrl = "https://www.boredapi.com/api/activity" + type() + cost() + participants();
        console.log(boredQueryUrl)
        
        
        $.ajax({
            url: boredQueryUrl,
            method: "GET"
        }).then(function (activityResponse) {
            console.log(activityResponse);
            
            // Display activity to page
            let activityDisplay = $("<h3>");
            activityDisplay.addClass("light-blue-text darken-2")
            activityDisplay.text(activityResponse.activity);
            $("#activity-response").append(activityDisplay);
            
            var activityName = activityResponse.activity
            var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + activityName;
            
            //Google Books API call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (booksResponse) {
                console.log(booksResponse);
                
                // Display books to page
                let booksList = $("<ul>")
                booksList.addClass("collapsible");
                let relatedBookInfo = $("<li>");
                let relatedBooks = $("<div>");
                let relatedBooksList = $("<div>")
                relatedBooks.addClass("collapsible-header");
                relatedBooks.attr("tabindex", "0");
                relatedBooksList.addClass("collapsible-body");
                relatedBooks.text("Related books:");
                
                
                $("#activity-response").append(booksList);
                booksList.append(relatedBookInfo);
                relatedBookInfo.append(relatedBooks);
                relatedBookInfo.append(relatedBooksList);
                
                for (let i = 0; i < 5; i++) {
                    let bookTitle = $("<p>");
                    bookTitle.text(booksResponse.items[i].volumeInfo.title);
                    relatedBooksList.append(bookTitle);
                }
                
            }).catch(function (error) {
                console.log(error);
            })
            
        }).catch(function (error) {
            console.log(error);
        })
        
    })
});


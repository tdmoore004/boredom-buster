// drop-down and collapsible
$(document).ready(function (event) {
    $('select').formSelect();
    $('.collapsible').collapsible();

    // global DOM elements
    let activityType = document.getElementsByClassName('activityType');
    let activityCost = document.getElementsByClassName('activityCost');
    let activityParticipants = document.getElementsByClassName('activityParticipants');
    $('.collapsible').addClass('hide');

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
            } else if (activityParticipants[i].selected == true) {
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
        $('.collapsible').removeClass('hide');

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
            $("#activity-response").prepend(activityDisplay);

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

                let relatedBooksList = $("<div>")
                relatedBooksList.addClass("collapsible-body");

                $("#booksListDiv").append(booksList); // <ul>
                booksList.append(relatedBookInfo); // <li>
                relatedBookInfo.append(relatedBooksList); // <div class="collapsible-body">



                for (let i = 0; i < 3; i++) {
                    // create collapsible-header div
                    let relatedBooks = $("<div>");
                    relatedBooks.addClass("collapsible-header");
                    relatedBooks.attr("tabindex", "0");
                    relatedBooks.text("Related books:");

                    // add text to collapsible-header
                    let relatedBooksText = relatedBooks.text(booksResponse.items[i].volumeInfo.title);

                    // append collapsible-header to relatedBookInfo
                    relatedBookInfo.append(relatedBooksText);
                }

            }).catch(function (error) {
                console.log(error);
            })

        }).catch(function (error) {
            console.log(error);
        })

    })
});


$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.modal').modal();
});

function displayList() {
    $("#activityList").empty();

    // prepend localStorage
    let activityListDisplay = JSON.parse(localStorage.getItem('activityList'));
    for (let i = 0; i < activityListDisplay.length; i++) {
        // Appending activity to todo list
        let activityListEl = $('<li>');
        activityListEl.addClass('collection-item');

        let activityNameEl = $('<div>');
        activityNameEl.attr('value', i)
        activityNameEl.text(activityListDisplay[i]);
        activityListEl.append(activityNameEl);

        // Adding completed button with activity
        let completedBtn = $('<a>');
        completedBtn.attr('href', '#!');
        completedBtn.addClass('secondary-content');
        activityNameEl.append(completedBtn);

        let completedBtnSymbol = $('<i>');
        completedBtnSymbol.addClass('far fa-trash-alt blue-text text-darken-2 modal-trigger');
        completedBtnSymbol.attr('data-target', 'modal1');

        completedBtn.append(completedBtnSymbol);

        $('#activityList').append(activityListEl);
    }
}
displayList();

// Removing activity item when button is clicked
let deletedE;

function deletedFunc(event) {
    event.preventDefault();
    deletedE = event.currentTarget.parentElement.attributes[0].value;
}

$(document).on('click', '.secondary-content', deletedFunc);


$('#agree').on('click', function () {
    // Get activityList from localStorage
    let completedActivityList = JSON.parse(localStorage.getItem('activityList'));
    // remove the item clicked on
    completedActivityList.splice(deletedE, 1);
    // set activityList back into localStorage
    localStorage.setItem('activityList', JSON.stringify(completedActivityList));
    displayList();
    return;
});

$('#dissagree').on('click', function () {
    displayList();
    return;
});

// Run displaylist again - this way we won't have to reload the page
displayList();

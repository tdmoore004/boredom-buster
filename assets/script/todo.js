$(document).ready(function(){
    $('.sidenav').sidenav();
  });

function displayList () {
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
    completedBtnSymbol.addClass('far fa-trash-alt blue-text text-darken-2');
    completedBtn.append(completedBtnSymbol);

    $('#activityList').append(activityListEl);
}
}
displayList();

    // Removing activity item when button is clicked
    $(document).on('click', '.secondary-content', function(event){
        event.preventDefault();
        console.log(event)
        let completedActivityList = JSON.parse(localStorage.getItem('activityList'));
        completedActivityList.splice(event.currentTarget.parentElement.attributes[0].value, 1);
        localStorage.setItem('activityList', JSON.stringify(completedActivityList));
        console.log(completedActivityList);
        displayList();
    });

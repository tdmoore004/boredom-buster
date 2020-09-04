// prepend localStorage
let activityListDisplay = JSON.parse(localStorage.getItem('activityList'));
for (let i = 0; i < activityListDisplay.length; i++) {
    // Appending activity to todo list
    let activityListEl = $('<li>');
    activityListEl.addClass('collection-item');

    let activityNameEl = $('<div>');
    activityNameEl.text(activityListDisplay[i]);
    activityListEl.append(activityNameEl);

    // Adding completed button with activity
    let completedBtn = $('<a>');
    completedBtn.attr('href', '#!');
    completedBtn.addClass('secondary-content');
    activityNameEl.append(completedBtn);

    let completedBtnSymbol = $('<i>');
    completedBtnSymbol.addClass('material-icons blue-text text-darken-2');
    completedBtnSymbol.text('check_box')
    completedBtn.append(completedBtnSymbol);

    $('#activityList').append(activityListEl);

}



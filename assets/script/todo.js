// prepend localStorage
let activityListDisplay = JSON.parse(localStorage.getItem('activityList'));
for (let i = 0; i < activityListDisplay.length; i++) {
    let activityNameEl = $('<li>');
    activityNameEl.attr('class', 'collection-item');
    // activityName = localStorage.getItem('activityList');
    activityNameEl.text(activityListDisplay[i]);
    $('#activityList').append(activityNameEl);
}



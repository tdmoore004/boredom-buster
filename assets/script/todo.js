// prepend localStorage
    let activityNameEl = $('<li>');
    activityNameEl.attr('class', 'collection-item');
    activityName = localStorage.getItem('activityName');
    activityNameEl.text(activityName);
    $('#activityList').prepend(activityNameEl);



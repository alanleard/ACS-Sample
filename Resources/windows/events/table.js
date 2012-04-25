Ti.include(
    'create.js',
    'show.js',
    'query.js',
    'update.js',
    'remove.js'
);

windowFunctions['Events'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: offset + u,
        data: createRows([
            'Create an Event',
            'List Events'
        ])
    });
    table.addEventListener('click', handleOpenWindow);
    win.add(table);
    win.open();
};
Ti.include(
    'create.js',
    'query.js',
    'remove.js',
    'search.js',
    'show.js',
    'update.js'
);

windowFunctions['Places'] = function (evt) {
    var win = createWindow();
    var offset = addBackButton(win);
    var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: offset + u,
        data: createRows([
            'Add a Venue',
            'Query Place',
            'List Venues'
        ])
    });
    table.addEventListener('click', handleOpenWindow);
    win.add(table);
    win.open();
};
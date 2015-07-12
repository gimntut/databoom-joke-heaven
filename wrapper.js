function connectTo(userName, dbName) {
    var dbUrl = "https://" + userName + ".databoom.space/api1/" + dbName;
    var collectionPath = dbUrl + '/collections/';
    return {
        userName: userName,
        dbName: dbName,
        dbUrl: dbUrl,
        collectionPath: collectionPath,
        settings: function(method, path, data) {
            return {
                'async': true,
                'crossDomain': true,
                'url': this.collectionPath + path,
                'method': method,
                'headers': {
                    'content-type': 'application/json'
                },
                'data': data
            };
        },
        login: function(login, password) {
            $.ajaxSetup({
                headers: {
                    'Authorization': "Basic " + btoa(login + ":" + password)
                }
            });
        },
        save: function(collection, jsonString, success) {
            return $.ajax(this.settings('POST', collection, jsonString));
        },
        get: function(query) {
            var s = this.settings('GET', query.path);
            s.dataType = 'json';
            return $.ajax(s);
        },
        delete: function(path) {
            return $.ajax(this.settings('DELETE', path));
        }

    };
}

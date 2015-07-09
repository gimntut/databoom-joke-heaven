var databoom = {
    userName: "",
    dbName: "",
    connectTo: function(userName, dbName) {
        this.userName = userName;
        this.dbName = dbName;
    },
    auth: function(login, password) {
        $.ajaxSetup({
            headers: {
                'Authorization': "Basic " + btoa(login + ":" + password)
            }
        });
    },
    addToCollection: function(collection, jsonString, success) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://" + this.userName + ".databoom.space/api1/" + this.dbName + "/collections/" + collection,
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "data": jsonString
        };

        $.ajax(settings).done(success);

    }

};

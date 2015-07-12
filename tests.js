QUnit.test("joke-heaven wrapper tests", function(assert) {
    assert.ok(true, "");
    var db = connectTo('gimntut', 'elf-chat');
    db.login('user', 'user');
    db.save('table1', '[{"id":"test", "a":"2"}]').done(checkInsert).fail(fail);

    function checkInsert(data, textStatus, jqXHR) {
        console.log(data);
        assert.ok(true, "checkInsert passed!");
        db.get({
            'path': 'table1(test)'
        }).done(checkGet).fail(fail);
    };

    function checkGet(data, textStatus, jqXHR) {
        console.log(data);
        var object = data.d.results[0];
        assert.ok(object.a == "2", "checkGet passed!");
        object.a = "3";
        db.save('table1', JSON.stringify(object)).done(checkUpdate);
    };

    function checkUpdate(data, textStatus, jqXHR) {
        console.log(data);
        assert.ok(true, "checkUpdate passed!");
        db.get({
            'path': 'table1(test)'
        }).done(checkGet2).fail(fail);
    }

    function checkGet2(data, textStatus, jqXHR) {
        console.log(data);
        var object = data.d.results[0];
        assert.ok(object.a == "3", "checkGet2 passed!");
        db.delete('table1(test)').done(checkDelete).fail(fail);
    }

    function checkDelete(data, textStatus, jqXHR) {
        console.log(data);
        assert.ok(true, "checkDelete passed!");
        db.get({
            'path': 'table1(test)'
        }).done(checkDeleteEffect).fail(fail);
    }

    function checkDeleteEffect(data, textStatus, jqXHR) {
        console.log(data);
        assert.ok(data.d.results.length === 0, "checkDeleteEffect passed!");
    }

    function fail(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        assert.push(true, true, "", textStatus);
    };
});

// QUnit.test("joke-heaven databoom.js tests", function(assert) {
//     assert.ok(true, "");
//     var db = databoom('http://gimntut.databoom.space', 'elf-chat');
//     db.login('user', 'user');
//     db.save('table1', [{
//         "a": "30"
//     }]).done(success);

//     function success(data, textStatus, jqXHR) {
//         console.log(data);
//         assert.ok(1 == "1", "passed!");
//     }
// });

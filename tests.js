QUnit.test("joke-heaven wrapper tests", function(assert) {
    assert.ok(true, "");
    databoom.connectTo('gimntut', 'elf-chat');
    databoom.auth('user', 'user');
    databoom.addToCollection('table1', '[{"a":"2"}]', success);

    function success(response) {
        console.log(response);
        assert.ok(1 == "1", "Passed!");
    }
});

QUnit.test("joke-heaven app tests", function(assert) {
    assert.ok(1 == 2, "Passed!");
});

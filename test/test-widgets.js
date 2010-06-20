var forms = require('forms');

var test_input = function(type){
    return function(test){
        test.equals(
            forms.widgets[type]().toHTML('field1'),
            '<input type="' + type + '" name="field1" id="id_field1" />'
        );
        var w = forms.widgets[type]({classes: ['test1', 'test2', 'test3']});
        test.equals(
            w.toHTML('field2', {id:'form2_field2'}),
            '<input type="' + type + '" name="field2" id="form2_field2"' +
            ' class="test1 test2 test3" />'
        );
        test.equals(
            forms.widgets[type]().toHTML('field1', {value:'some value'}),
            '<input type="' + type + '" name="field1" id="id_field1"' +
            ' value="some value" />'
        );
        test.equals(forms.widgets[type]().type, type);
        test.done();
    };
};

exports['text'] = test_input('text');
exports['password'] = test_input('password');
exports['hidden'] = test_input('hidden');

exports['checkbox'] = function(test){
    test.equals(
        forms.widgets.checkbox().toHTML('field1'),
        '<input type="checkbox" name="field1" id="id_field1" />'
    );
    var w = forms.widgets.checkbox({classes: ['test1', 'test2', 'test3']});
    test.equals(
        w.toHTML('field2', {id:'form2_field2'}),
        '<input type="checkbox" name="field2" id="form2_field2"' +
        ' class="test1 test2 test3" />'
    );
    test.equals(
        forms.widgets.checkbox().toHTML('field', {value:true}),
        '<input type="checkbox" name="field" id="id_field" checked="checked" />'
    );
    test.equals(
        forms.widgets.checkbox().toHTML('field', {value:false}),
        '<input type="checkbox" name="field" id="id_field" />'
    );
    test.equals(forms.widgets.checkbox().type, 'checkbox');
    test.done();
};

exports['select'] = function(test){
    test.equals(
        forms.widgets.select().toHTML('name', {choices: {
            val1:'text1',
            val2:'text2'
        }}),
        '<select name="name" id="id_name">' +
            '<option value="val1">text1</option>' +
            '<option value="val2">text2</option>' +
        '</select>'
    );
    test.equals(
        forms.widgets.select({classes: ['one', 'two']}).toHTML('name', {
            choices: {
                val1:'text1',
                val2:'text2'
            },
            id: 'someid',
            value: 'val2'
        }),
        '<select name="name" id="someid" class="one two">' +
            '<option value="val1">text1</option>' +
            '<option value="val2" selected="selected">text2</option>' +
        '</select>'
    );
    test.equals(forms.widgets.select().type, 'select');
    test.done();
};

exports['textarea'] = function(test){
    test.equals(
        forms.widgets.textarea().toHTML('name', {}),
        '<textarea name="name" id="id_name"></textarea>'
    );
    test.equals(
        forms.widgets.textarea({
            classes: ['one', 'two'],
            rows: 20,
            cols: 80
        }).toHTML('name', {id: 'someid', value: 'value'}),
        '<textarea name="name" id="someid" class="one two" rows="20"' +
        ' cols="80">value</textarea>'
    );
    test.equals(forms.widgets.textarea().type, 'textarea');
    test.done();
};

exports['multipleCheckbox'] = function(test){
    var w = forms.widgets.multipleCheckbox();
    var field = {
        choices: {one:'Item one',two:'Item two',three:'Item three'},
        value: 'two'
    };
    test.equals(
        w.toHTML('name', field),
        '<input type="checkbox" name="name" id="id_name_one" value="one">' +
        '<label for="id_name_one">Item one</label>' +
        '<input type="checkbox" name="name" id="id_name_two" value="two"' +
        ' checked="checked">' +
        '<label for="id_name_two">Item two</label>' +
        '<input type="checkbox" name="name" id="id_name_three" value="three">' +
        '<label for="id_name_three">Item three</label>'
    );
    test.equals(forms.widgets.multipleCheckbox().type, 'multipleCheckbox');
    test.done();
};

exports['multipleCheckbox mutliple selected'] = function(test){
    var w = forms.widgets.multipleCheckbox();
    var field = {
        choices: {one:'Item one',two:'Item two',three:'Item three'},
        value: ['two', 'three']
    };
    test.equals(
        w.toHTML('name', field),
        '<input type="checkbox" name="name" id="id_name_one" value="one">' +
        '<label for="id_name_one">Item one</label>' +
        '<input type="checkbox" name="name" id="id_name_two" value="two"' +
        ' checked="checked">' +
        '<label for="id_name_two">Item two</label>' +
        '<input type="checkbox" name="name" id="id_name_three" value="three"' +
        ' checked="checked">' +
        '<label for="id_name_three">Item three</label>'
    );
    test.equals(forms.widgets.multipleCheckbox().type, 'multipleCheckbox');
    test.done();
};

exports['multipleRadio'] = function(test){
    var w = forms.widgets.multipleRadio();
    var field = {
        choices: {one:'Item one',two:'Item two',three:'Item three'},
        value: 'two'
    };
    test.equals(
        w.toHTML('name', field),
        '<input type="radio" name="name" id="id_name_one" value="one">' +
        '<label for="id_name_one">Item one</label>' +
        '<input type="radio" name="name" id="id_name_two" value="two"' +
        ' checked="checked">' +
        '<label for="id_name_two">Item two</label>' +
        '<input type="radio" name="name" id="id_name_three" value="three">' +
        '<label for="id_name_three">Item three</label>'
    );
    test.equals(forms.widgets.multipleRadio().type, 'multipleRadio');
    test.done();
};

exports['multipleRadio mutliple selected'] = function(test){
    var w = forms.widgets.multipleRadio();
    var field = {
        choices: {one:'Item one',two:'Item two',three:'Item three'},
        value: ['two', 'three']
    };
    test.equals(
        w.toHTML('name', field),
        '<input type="radio" name="name" id="id_name_one" value="one">' +
        '<label for="id_name_one">Item one</label>' +
        '<input type="radio" name="name" id="id_name_two" value="two"' +
        ' checked="checked">' +
        '<label for="id_name_two">Item two</label>' +
        '<input type="radio" name="name" id="id_name_three" value="three"' +
        ' checked="checked">' +
        '<label for="id_name_three">Item three</label>'
    );
    test.equals(forms.widgets.multipleRadio().type, 'multipleRadio');
    test.done();
};

exports.id = 'randomstring';
exports.title = 'Random String Generator';
exports.group = 'Emblem';
exports.color = '#37BC9B';
exports.input = true;
exports.output = 1;
exports.version = '0.0.3';
exports.author = 'Shannon Code';
exports.icon = 'random';
exports.options = {  };
exports.npm = [];

exports.readme = `# Random String Generator

Generates a random string for use in multiple applications, used to generate a seed, for example.

## Fields

*Length*: How long should the random string be? Default is 64 if not specified.

*Chars*: Which characters are allowed in the string? Default is hex if not specified.

Use the following table for reference:

|What to enter in the field|What it means you will get as allowable characters|
|--------------------------|--------------------------------------------------|
|hex                       |The string generated will be a hex string         |
|OR any combination of:    |                                                  |
|a                         |Lowercase letters (abcdefghijklmnopqrstuvwxyz)    |
|A                         |Uppercase letters (ABCDEFGHIJKLMNOPQRSTUVWXYZ)    |
|#                         |Digits (0123456789)                               |
|!                         |Special Characters (!@#$%^&*()_+-={}[]:";\'<>?,./|\\)|

`;

exports.html = `
<div class="padding">
    <div class="row">
        <div class="col-md-6">
            <div data-jc="textbox" data-jc-path="length" data-jc-config="placeholder:64">@(length) (@(optional))</div>
            <div class="help">Specify the length of your desired string. Default is 64 if not specified.</div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div data-jc="textbox" data-jc-path="chars" data-jc-config="placeholder:hex">@(chars) (@(optional))</div>
            <div class="help">Specify the allowable characters you want in your string, i.e. Aa#! Default is hex is not specified.</div>
        </div>
    </div>
</div>
`;

exports.install = function(instance) {

	instance.on('data', function(flowdata) {
        var length = instance.options.length || flowdata.data.length || FLOW.variables.length || 64
        var chars = instance.options.chars || flowdata.data.chars || FLOW.variables.chars || 'hex'
        instance.send({data: randomString(length, chars)})
    });
    
    function randomString(length, chars) {
        let mask = '';
        if (chars.indexOf('a') > -1) { mask += 'abcdefghijklmnopqrstuvwxyz'; }
        if (chars.indexOf('A') > -1) { mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; }
        if (chars.indexOf('hex') > -1) { mask += '0123456789abcdefABCDEF'; }
        if (chars.indexOf('#') > -1) { mask += '0123456789'; }
        if (chars.indexOf('!') > -1) { mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'; }
        let result = '';
        for (let i = length; i > 0; --i) { result += mask[Math.floor(Math.random() * mask.length)]; }
        return result;
    }
};

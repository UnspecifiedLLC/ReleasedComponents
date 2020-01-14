exports.id = 'split';
exports.title = 'Split';
exports.group = 'Common';
exports.version = '1.1.1';
exports.color = '#656D78';
exports.input = true;
exports.output = 1;
exports.options = {};
exports.author = 'Jiří Travěnec';
exports.icon = 'code-fork';

exports.readme = '60000316157';

exports.install = function(instance) {
	instance.on('data', function (response) {
		var data = response.data;
		if (data instanceof Array) {
			for (var i = 0; i < data.length; i++) {
				if (data[i] != null) {
					var msg = instance.make(data[i], 0);
					msg.repository = response.repository;
					if (instance.options.downstream) {
						response.set(instance.name, msg.data);
					}
					instance.send2(msg);
				}
			}
		}
	});
};

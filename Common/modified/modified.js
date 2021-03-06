exports.id = 'modified';
exports.title = 'Modified';
exports.group = 'Logic';
exports.color = '#4e895d';
exports.version = '1.0.1';
exports.input = true;
exports.click = true;
exports.output = 1;
exports.author = 'Peter Širka';
exports.icon = 'refresh';

exports.readme = '60000315847';

exports.install = function(instance) {
	var backup = undefined;
	var counter = 0;
	
	instance.on('click', () => {
        checkConfig()
	});
	
	instance.on('data', function(response) {
		doWork(response)
	});

	function doWork(response) {
		var data = response.data;
		if (data instanceof Buffer)
			data = data.toString('base64');
		else if (typeof(data) === 'object' || data instanceof Date)
			data = JSON.stringify(data);
		if (backup !== data) {
			if (!backup) {
				instance.status("First capture", "green")
				backup = data
			} else {
				counter = 0;
				instance.status("Change detected", "green")
				backup = data;
				if (instance.options.downstream) {
					response.set(instance.name, response.data);
				}
				instance.send2(response);
			}
		} else {
			counter++;
			instance.status('Not modified: {0}x'.format(counter));
		}
		if (instance.options.debug_output) {
			instance.send(1, data);
		}
	}

	function checkConfig() {
        backup = undefined;
        counter = 0;
        instance.status("Reset", "green")
    }
};
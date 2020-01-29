exports.id ="csv_mergeupstream";
exports.title ="CSV Template Merge Upstream";
exports.group = "Template Components";
exports.color ="#764f78";
exports.input =true;
exports.output =1;
exports.version ="0.0.2";
exports.author ="Shannon Code";
exports.icon ="object-group";

exports.readme = '60000318020';

exports.html = ``;

exports.install = function(instance) {

	instance.on('data', function(response) {
		response.data = response.repository
		if (instance.options.downstream) {
			response.set(instance.name, response.data);
		}
		instance.send(response)
	});
};
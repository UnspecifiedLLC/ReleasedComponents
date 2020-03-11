exports.id = 'getethereumprice';
exports.title = 'Get Ethereum Price';
exports.group = 'Bittrex';
exports.color = '#8bc53f';
exports.input = true;
exports.output = true;
exports.author = 'Stacy Howerton <stacy@unspecified.me>';
exports.icon = 'dollar-sign';
exports.version = '0.0.1';
exports.options = {  };
exports.npm = [];


exports.html = `
<div class="padding">
    <div class="row">
        <div class="col-md-6">
        </div>
    </div>
</div>`;

exports.readme = '60000611285';

exports.install = function(instance) {
    const Bittrex = require('bittrex-api-node');
    const api = Bittrex({
        publicKey: '',
        secretKey: '',
        verbose: true,
    });
    instance.on('data', function(flowdata) {
        runIt(flowdata);
    });

    function runIt(flowdata) {
        json = {};
        api.getETHPrice().then((response) => {
            console.log('[getETHPrice] response:', response);
            flowdata.data = response;
            instance.send(flowdata);
        }).catch((error) => {
            console.error('[getETHrice] error:', error);
        }).finally(() => {
            console.log('[getETHPrice] done!');
        });
    };
};


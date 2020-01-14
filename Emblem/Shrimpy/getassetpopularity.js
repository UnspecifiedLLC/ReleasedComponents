// #### https://github.com/shrimpy-dev/shrimpy-node
exports.id = 'getassetpopularity';
exports.title = 'Get Asset Popularity';
exports.group = 'Shrimpy';
exports.color = '#c13333';
exports.input = true;
exports.output = true;
exports.author = 'Shannon Code <shannon@unspecified.me>';
exports.icon = 'balance-scale';
exports.version = '1.0.0';
exports.options = {  };
exports.npm = ["shrimpy-node"];
exports.readme = `# Shrimpy Get Asset Popularity

This component retrieves aggregate information about asset percentage popularity of the chosen exchange. The popularity of an asset is calculated based on the percentage of portfolios that contain the asset. For example, if there are two users, one with 50% Bitcoin and one with 5% Bitcoin, the asset popularity for Bitcoin would be 100% because 100% of portfolios contain Bitcoin

## Fields

*Select an Exchange* (required): This is the exchange you want to get asset popularity from.

*Public Key* (required): The public key provided by Shrimpy. [Get API Key Here](https://developers.shrimpy.io/signup)

*Private Key* (required):The private key provided by Shrimpy. [Get API Key Here](https://developers.shrimpy.io/signup)

[Shrimpy Documentation](https://developers.shrimpy.io/docs/#get-asset-popularity)
`;
exports.html = `<div class="padding">
    <div class="row">
        <div class="col-md-6">
            <div data-jc="dropdown" data-jc-path="exchange" data-jc-config="items:Binance|binance,Binance US|binanceus,Bittrex|bittrex,KuCoin|kucoin,CoinbasePro|coinbasepro,Poloniex|poloniex,Kraken|kraken,Bibox|bibox,Gemini|gemini,HuiboGlobal|huobiglobal,HitBTC|hitbtc,BitMart|bitmart,Bitstamp|bitstamp,OKEx|okex,Bitfinex|bitfinex;required:true" class="m">@(Select an Exchange)</div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div data-jc="textbox" data-jc-path="publicKey" data-jc-config="required:true">@(Public Key) </div>
        </div>
        <div class="col-md-6">
            <div data-jc="textbox" data-jc-path="privateKey" data-jc-config="required:true;type:password;">@(Private Key) </div>
        </div>
    </div>
</div>`;

exports.install = function(instance) {
    const Shrimpy = require('shrimpy-node');
    instance.on('data', (response) => {
        if ((!FLOW.variables.privateKey && !instance.options.privateKey) || (!FLOW.variables.publicKey && !instance.options.publicKey)) {
            instance.status("This component requires Shrimpy Keys", "red");
        } else {
            instance.status("");
            const privateClient = new Shrimpy.ShrimpyApiClient(instance.options.publicKey || FLOW.variables.publicKey, instance.options.privateKey || FLOW.variables.privateKey);
            privateClient.getExchangeAssets(instance.options.exchange).then(assets =>{
                var assetList = assets
                privateClient.getAssetPopularity().then(insights =>{
                    var list = []
                    assetList.forEach((asset)=>{
                        var insight = insights.filter((item)=>{ return item.id === asset.id})[0]
                        list.push({
                            id: insight.id,
                            name: asset.name,
                            symbol: asset.symbol,
                            tradingSymbol: asset.tradingSymbol,
                            percent: insight.percent,
                            change24h: insight.change24h,
                            change7d: insight.change7d,
                            change30d: insight.change30d
                        });
                    })
                    response.data = JSON.parse(JSON.stringify({exchange: instance.options.exchange, insights: list}));
                    if (instance.options.downstream) {
                        response.set(instance.name, response.data);
                    }
                    instance.send(response);
                });
            })
            
        }
    });
};

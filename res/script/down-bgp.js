const fs = require('fs');
const { join } = require('path');
const https = require('https');
const no = process.argv.pop();
function onerr(err) {
	if (err && process.argv.pop() !== '-again') {
		require('child_process').spawn('node', [__filename, '-again', no]);
	}
	throw err;
}
function req(url, callback) {
	https.request(url, res =>
		res.statusCode === 302 || res.statusCode === 301
			? req(res.headers.location, callback)
			: callback(res)
	).on('error', onerr).end();
}
function sign(n) {
	sign[n] = true;
	if (sign.got && sign.signed) {
		fs.unlink(join(__dirname, '../bgp/bgp' + no), () => void 0);
	}
}
fs.writeFile(join(__dirname, '../bgp/bgp' + no), '', () => sign('signed'));
fs.readFile(join(__dirname, '../../config.js'), 'utf-8', (err, configjs) => {
	if (err) onerr(err);
	const config = eval(`(function(){
		${configjs}
		return CONFIG
	})()`);
	req(config.bgp, res =>
		res.pipe(fs.createWriteStream(join(__dirname, '../bgp/bgp' + no + '.jpg')))
			.on('close', () => sign('got'))
	);
});
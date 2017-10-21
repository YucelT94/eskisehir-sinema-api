var request = require('request');
var cheerio = require('cheerio');
var url = 'https://www.sinemalar.com/sinemasalonu/1813/eskisehir-ozdilek-cinetime';

exports.ozdilek = function (req, res, next) {
    request(url, function (err, response, body) {
        if (err) {
            return next(err);
        }
        if (response.statusCode !== 200) {
            return next(new Error('Server Error'));
        }
        $ = cheerio.load(body);

        var links = $('div.grid8.bestof.cinema-detail.shadow')
            .map(function (i, e) {
                var tds = $(e).find('div.grid2');
                return {
                    name: $(tds[0]).find('img').attr('alt'),
                    picUrl: $(tds[0]).find('img').attr('src'),
                };
            })
            .get();

        if (req.query.skip) {
            links = links.slice(req.query.skip);
        }
        if (req.query.limit) {
            links = links.slice(0, req.query.limit);
        }

        return res.json(links);
    });
};
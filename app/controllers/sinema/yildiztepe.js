var request = require('request');
var cheerio = require('cheerio');
var url = 'https://www.sinemalar.com/sinemasalonu/2012/yildiztepe-hava-lojmanlari';

exports.yildiztepe = function (req, res, next) {
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
                var tds2 = $(e).find('div.grid6.fr');
                return {
                    name: $(tds[0]).find('img').attr('alt'),
                    picUrl: $(tds[0]).find('img').attr('src'),
                    seance: $(tds2[0]).find('div.select-seans.selected-seans').text().match(/([01]?[0-9]|2[0-3]):[0-5][0-9]/g),
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
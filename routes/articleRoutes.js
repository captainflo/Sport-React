const axios = require('axios');
const cheerio = require('cheerio');

module.exports = app => {
  //  GET Article NFL
  app.get('/api/league/4391', function(req, res) {
    // Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
    axios
      .get('https://www.nytimes.com/section/sports/football')
      .then(function(response) {
        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        const results = [];

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $('.css-ye6x8s').each(function(i, element) {
          // Save the text of the element in a "title" variable
          const title = $(element)
            .find('h2')
            .text();

          // In the currently selected element, look at its child elements (i.e., its a-tags),
          // then save the values for any "href" attributes that the child elements may have
          const link = $(element)
            .find('a')
            .attr('href');

          const text = $(element)
            .find('p')
            .text();

          const image = $(element)
            .find('img')
            .attr('src');

          // Save these results in an object that we'll push into the results array we defined earlier
          results.push({
            title: title,
            link: link,
            text: text,
            image: image
          });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        res.json(results);
      });
  });

  // Get Article MLB
  app.get('/api/league/4424', function(req, res) {
    axios
      .get('https://www.nytimes.com/section/sports/baseball')
      .then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        $('.css-ye6x8s').each(function(i, element) {
          const title = $(element)
            .find('h2')
            .text();

          const link = $(element)
            .find('a')
            .attr('href');

          const text = $(element)
            .find('p')
            .text();

          const image = $(element)
            .find('img')
            .attr('src');

          results.push({
            title: title,
            link: link,
            text: text,
            image: image
          });
        });
        res.json(results);
      });
  });

  // Get Article MLB
  app.get('/api/league/4380', function(req, res) {
    axios
      .get('https://www.nytimes.com/section/sports/hockey')
      .then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        $('.css-ye6x8s').each(function(i, element) {
          const title = $(element)
            .find('h2')
            .text();

          const link = $(element)
            .find('a')
            .attr('href');

          const text = $(element)
            .find('p')
            .text();

          const image = $(element)
            .find('img')
            .attr('src');

          results.push({
            title: title,
            link: link,
            text: text,
            image: image
          });
        });
        res.json(results);
      });
  });

  // Get Article NBA
  app.get('/api/league/4387', function(req, res) {
    axios
      .get('https://www.nytimes.com/section/sports/basketball')
      .then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        $('.css-ye6x8s').each(function(i, element) {
          const title = $(element)
            .find('h2')
            .text();

          const link = $(element)
            .find('a')
            .attr('href');

          const text = $(element)
            .find('p')
            .text();

          const image = $(element)
            .find('img')
            .attr('src');

          results.push({
            title: title,
            link: link,
            text: text,
            image: image
          });
        });
        res.json(results);
      });
  });

  // Get Article NBA
  app.get('/api/league/:id', function(req, res) {
    axios
      .get('https://www.nytimes.com/section/sports/soccer')
      .then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        $('.css-ye6x8s').each(function(i, element) {
          const title = $(element)
            .find('h2')
            .text();

          const link = $(element)
            .find('a')
            .attr('href');

          const text = $(element)
            .find('p')
            .text();

          const image = $(element)
            .find('img')
            .attr('src');

          results.push({
            title: title,
            link: link,
            text: text,
            image: image
          });
        });
        res.json(results);
      });
  });
};

const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { routes } = require('./routes-list');

let sitemap = new SitemapStream({ hostname: 'https://podclipbot.com/' });

routes.forEach(route => {
  sitemap.write({ url: route });
});

sitemap.end();

// This will generate a sitemap.xml file in your project root
streamToPromise(sitemap).then((data) => {
  createWriteStream("./public/sitemap.xml").write(data.toString());
})
.catch((error) => console.error(error));

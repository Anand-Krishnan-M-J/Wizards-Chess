module.exports = {
  siteUrl: 'https://www.chess.anandkris.com', // Your site URL
  generateRobotsTxt: true, // Automatically generate robots.txt
  sitemapSize: 7000,
  outDir: './public', // Output folder for the sitemap
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, path) => {
    if (path === '/game') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.8,
      };
    }
    return {
      loc: path,
      changefreq: 'daily',
      priority: 1.0,
    };
  },
};

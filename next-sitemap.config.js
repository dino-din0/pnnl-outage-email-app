module.exports = {
  siteUrl: 'https://www.sirsuds.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml', '/design-credit'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.sirsuds.com/server-sitemap.xml', 
    ],
  },
};

export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "https://likedeeler-strapi-dev.s3.eu-central-1.amazonaws.com/",
            "https://d1v5z1j7v7z1j.cloudfront.net",
            "https://d2wplaacghaca4.cloudfront.net"
          ],
        },
      },
    },
  },
];

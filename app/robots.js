export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/Admin/',
      },
      sitemap: 'https://giresuni.com/sitemap.xml',
    }
  }
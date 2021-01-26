// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Abhimanyu Studios',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/pages/markdown/**/*.md',
        typeName: 'Post',
        remark: {

        }
      }
    },
    {
      use: '@gridsome/source-wordpress',
      options: {
        baseUrl: 'http://35.203.149.155/index.php',
        apiBase: 'wp-json',
        typeName: 'Wordpress',
        perPage: 100,
        concurrent: 10,
        routes: {
          post: '/:slug',
          post_tag: '/tag/:slug'
        }
      }
    }
  ]
}

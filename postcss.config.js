// postcss.config.js

// подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        autoprefixer,
        cssnano({ preset: 'default' })
    ]
};

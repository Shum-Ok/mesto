const autoprefixer = require('autoprefixer'); // добавляет прификсы для старый браузеров
const cssnano = require('cssnano'); // минифицирует наш css

module.exports = {
    plugins: [
        autoprefixer,
        cssnano({ preset: 'default' }),
    ]
};
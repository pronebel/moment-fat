const madge = require('madge');

madge('./fat/moment/moment.js')
    .then((res) => res.image('./fat/ast/moment.svg'))
    .then((writtenImagePath) => {
        console.log('Image written to ' + writtenImagePath);
    });

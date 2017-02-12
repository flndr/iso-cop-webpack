var header = require('../modules/common/header'),
    footer = require('../modules/common/footer');

module.exports = function( content ) {
    var html = '<div>' + [
        header(),
        content,
        footer()
    ].join('</div><div>') + '</div>';
    document.body.insertAdjacentHTML('afterbegin', html);
};

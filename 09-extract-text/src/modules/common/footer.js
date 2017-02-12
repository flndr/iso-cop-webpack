module.exports = function() {

    var html = '<p>footer</p>';
    if( DEVELOPMENT ) {
        html += '<div style="background-color:red; color:white;">' +
                'Special output for dev only - the version: ' + VERSION +
                ' and the FOO ' + FOO + '</div>';
    }
    return html;
}

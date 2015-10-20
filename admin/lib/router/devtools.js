/**
 * /devtools - special server side route to open a frameset running all meteor
 * apps on one page.
 */
Router.route('devtools', {
    path: '/devtools',
    where: 'server',
    action: function() {

        // build a frameset
        var html = '<html><head>';
        html += '<title>waslchiraa | devtools</title>';
        html += '<style type="text/css">* { margin: 0; padding: 0; border: 0}</style>';
        html += '</head>';
        html += '<frameset cols="25%,25%,*">';
        html += '<frame src="http://localhost:3000/" />';
        html += '<frame src="http://localhost:3001/" />';
        html += '<frame src="http://localhost:3002/" />';
        html += '</frameset>';
        html += '</html>';

        // send to client
        this.response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        this.response.end(html);
    }
});

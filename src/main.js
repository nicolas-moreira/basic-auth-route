const express = require('express');
const app = express();

// basic auth route
app.post('/auth', (req,res) => {
    
    // Auth credentials
    const Usercredentials = {
        username: 'nicolas',
        password: '165454d534df54.Fd54'
    }

    // verify auth header is set
    if (!req.headers.authorization) {
        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Authentication required');
    }

    // get auth credentials
     const base64Credentials =  req.headers.authorization.split(' ')[1];
     const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
     const [username, password] = credentials.split(':');
     
    // Verify username and password are set and correct
    if (username && password && username === Usercredentials.username && password === Usercredentials.password) {
        res.status(200).send('Access granted');
    } else return res.status(401).send('Authentication failed');

})


// start server
const port = 3003;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
'use strict';

var express = require('express');
var path = require('path');

const setup = (app) => {
    app.get('/pay-methods/internal-api/config/providers', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        if (req.query.type === 'DEPOSITS') {
            res.send(JSON.stringify({
                providers: [
                    {
                        methodKey: 'myresjöhus1',
                        methodName: 'Hudson'
                    },
                    {
                        methodKey: 'myresjöhus2',
                        methodName: 'Frösön'
                    },
                    {
                        methodKey: 'myresjöhus3',
                        methodName: 'Grönskär'
                    },
                    {
                        methodKey: 'trivselhus1',
                        methodName: 'Villa Norrtälje'
                    },
                    {
                        methodKey: 'trivselhus2',
                        methodName: 'Villa Värmdö'
                    },
                    {
                        methodKey: 'ekesjöhus1',
                        methodName: 'Mellangården'
                    },
                    {
                        methodKey: 'ekesjöhus2',
                        methodName: 'Kaptensgården'
                    },
                    {
                        methodKey: 'ekesjöhus3',
                        methodName: 'Rosenhill'
                    }
                ]
            }, null, 3))
        } else {
            res.send(JSON.stringify({
                providers: [
                    {
                        methodKey: 'myresjöhus4',
                        methodName: 'Kärngården'
                    },
                    {
                        methodKey: 'trivselhus3',
                        methodName: 'Villa Simrishamn'
                    },
                    {
                        methodKey: 'trivselhus3',
                        methodName: 'Villa Falsterbo'
                    },
                    {
                        methodKey: 'ekesjöhus3',
                        methodName: 'Skanör'
                    },
                    {
                        methodKey: 'ekesjöhus4',
                        methodName: 'Prio 165'
                    }
                ]
            }, null, 3))
        }
    })

    app.post('/pay-methods/internal-api/config/updateProvider', (req, res) => {
        console.log('in addprovider...')
        const payload = {
            rc: 'ok'
        }
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(payload))
    })
}


const setupExternalMocks = function() {
    /*
    var express = require('express');
    var path = require('path');
    var mockApp = express();

    mockApp.listen(8081, function() {
        console.log('MockApp listening on port 8081');
    });
    */
};

module.exports = {
    setup,
    setupExternalMocks
};

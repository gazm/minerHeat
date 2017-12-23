[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependency Status][daviddm-image]][daviddm-url]

nest-api
=========
Main Nest API for node (also see: nest-api-thermostat-api and nest-api-protect-api)
Adapted from:
* https://github.com/wiredprairie/unofficial_nodejs_nest
* https://github.com/devoncrouse/nest-nodejs

Installation
============
`npm install nest-api`

Usage
=====


Configuration
=============
In order to instantiate and use the main Nest API should use the following:
```javascript
var NestApi = require('nest-api');
var nestApi = new NestApi('YOUR_EMAIL', 'YOUR_PASSWORD');
// Login (must be called first to establish a session)
nestApi.login(function(data) {
    // A callback for something you would want to do on login
});

nestApi.get(function(data) {
  // Get a property from the Nest API.  See the Appendix for a list of properties.
});
```
Examples
========
```javascript
var NestApi = require('nest-api');
var nestApi = new NestApi('YOUR_EMAIL', 'YOUR_PASSWORD');

nestApi.login(function(data) {
  nestApi.get(function(data) {
    var shared = data.shared[Object.keys(data.schedule)[0]];
    console.log('Currently ' + shared.current_temperature + ' degrees celcius');
    console.log('Target is ' + shared.target_temperature + ' degrees celcius');
  });
});
```

Contributing
============
Please feel free to modify and contribute to this code:
* GitHub: [node-nest-api](https://github.com/johnwyles/node-nest-api.git)
* Author: John Wyles <john@johnwyles.com> (http://johnwyles.com)
* Inspiration: Aaron Cornelius (https://github.com/wiredprairie/unofficial_nodejs_nest)
* Inspiration: Devon Crouse (https://github.com/devoncrouse/nest-nodejs)

License
=======
See LICENSE

TODO
====
* Implement Nock for testing
* Write generic getter for information
* Research POST operations for Nest API and write setters

Appendix
========
Below is an example data structure / JSON object returned from the Nest API:

    {
      user_alert_dialog: { '###':  { /* ... */ } },
      track:  { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      message_center: { '###': { /* ... */ } },
      utility: { /* ... */ },
      where: { '### uuid ###': { /* ... */ },
      structure: { '### uuid ###': { /* ... */ },
      message: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      tuneups: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      device: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      demand_response: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      user: { '###': { /* ... */ },
      link: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      device_alert_dialog: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      metadata: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      user_settings: { '###': { /* ... */ },
      schedule: { '0123456789ABCDEF': { /* ... */ }, /* ... */ },
      shared: { '0123456789ABCDEF': { /* ... */ }, /* ... */ }
     }

[npm-url]: https://www.npmjs.org/package/nest-api
[npm-image]: https://badge.fury.io/js/nest-api.svg
[travis-url]: https://travis-ci.org/johnwyles/node-nest-api
[travis-image]: https://travis-ci.org/johnwyles/node-nest-api.png?branch=master
[coveralls-url]: https://coveralls.io/r/johnwyles/node-nest-api
[coveralls-image]: https://coveralls.io/repos/johnwyles/node-nest-api/badge.png
[daviddm-url]: https://david-dm.org/johnwyles/node-nest-api
[daviddm-image]: https://david-dm.org/johnwyles/node-nest-api.png?theme=shields.io

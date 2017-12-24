//const express = require('express');
//const app = express();

const config = require('./config.json');
const timer = require('schedule').every;
const NestApi = require('nest-api');
const fs = require('fs');

//const nestApi = new NestApi('gorgazm@gmail.com', 'Jordan@2010');

const nestApi = new NestApi(config.login.username, config.login.password);

const spawn = require('child_process').spawn;
const minerProcess = require('child_process').spawn('powershell.exe', ['cd $ENV:UserProfile/Desktop/MultipoolMiner/; & .\\StartGAZM-AMD.bat']);
const minerProcessXXX = require('child_process').spawn('powershell.exe', ['cd $ENV:UserProfile/Desktop/MultipoolMiner/; & .\\StartCPUGAZM-AMD.bat']);

function getTemp() {
  nestApi.login(function(data) {
    nestApi.get(function(data) {
      let shared = data.shared[Object.keys(data.schedule)[0]];
      var curTemp = shared.current_temperature;
      console.log('Currently ' + curTemp + ' degrees celcius')
    });
  });
}


//start mining script using child-child_process
function startMiner() {
	console.log('Starting Miner');
  minerProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  minerProcess.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  minerProcess.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
}

function startMinerStrong() {
	console.log('Starting Miner STRONG');
  minerProcessXXX.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  minerProcessXXX.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  minerProcessXXX.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
}

	function kill() {
	  spawn("taskkill", ["/pid", minerProcess.pid, '/t', '/f'])
    spawn("taskkill", ["/pid", minerProcessXXX.pid, '/t', '/f'])
    console.log('Killed Miner')
	}


  //Start Miner
  timer('5m').do(function() {
    nestApi.login(function(data) {
      nestApi.get(function(data, err) {
        if (err) throw err;
        let status = 0;
        let shared = data.shared[Object.keys(data.schedule)[0]];
        let curTemp = shared.current_temperature;
        if (curTemp > config.temps.shut_off) {
          console.log('Still too hot, Waiting...')
          if (status = 1 || 2){
            kill();
            console.log('Miner was stopped, Hot enough '+ curTemp + ' Celsius');
            let status = 0
            console.log(status)
          }
        }
        else if (curTemp > config.temps.low_overdrive){
          kill();
          console.log('MANS NOT HOT'+ curTemp + ' Celsius');
          startMiner();
          let status = 1
        }
        else if (curTemp < config.temps.low_overdrive){
          kill();
          console.log('FEEL THE BURN')
          startMinerStrong();
          let status = 2
        }
      });
    });
  });

// app.get('/nest', function(req, res) {
// nestApi.login(function(data) {
//   nestApi.get(function(data) {
//     let shared = data.shared[Object.keys(data.schedule)[0]];
//     let zoneDown = _.pick(data.shared, '15AA01AC3217065S')
//     res.json(zoneDown)
//   });
// });
// });
// app.listen(3001, () => console.log('Example app listening on port 3001!'))

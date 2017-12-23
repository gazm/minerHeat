//const express = require('express');
//const app = express();

const timer = require('schedule').every;

const NestApi = require('nest-api');
const nestApi = new NestApi('gorgazm@gmail.com', 'Jordan@2010');

const spawn = require('child_process').spawn;
const minerProcess = require('child_process').spawn('powershell.exe', ['cd $ENV:UserProfile/Desktop/MultipoolMiner/; & .\\startGAZM.bat']);

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

	function kill() {
	  spawn("taskkill", ["/pid", minerProcess.pid, '/t'])
	}

//Start Miner
startMiner();

timer('5m').do(function() {
  nestApi.login(function(data) {
    nestApi.get(function(data, err) {
      if (err) throw err;
      let shared = data.shared[Object.keys(data.schedule)[0]];
      let curTemp = shared.current_temperature;
      if (curTemp > 22.75) {
        kill();
        console.log('Miner was stopped, Hot enough '+ curTemp + ' Celsius');
        let status = 0
      } else if (status = 0){
        console.log('mans not hot')
        startMiner();
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

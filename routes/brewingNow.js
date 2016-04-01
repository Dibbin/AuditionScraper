var express = require('express');
var http = require('http');
var cheerio = require('cheerio');
var router = express.Router();


var states = {
  AL:'Alabama',
  AK:'Alaska',
  AZ:'Arizona',
  AR:'Arkansas',
  CA:'California',
  CO:'Colorado',
  CT:'Connecticut',
  DE:'Delaware',
  DC:'District of Columbia',
  FL:'Florida',
  GA:'Georgia',
  HI:'Hawaii',
  ID:'Idaho',
  IL:'Illinois',
  IN:'Indiana',
  IA:'Iowa',
  KS:'Kansas',
  KY:'Kentucky',
  LA:'Louisiana',
  ME:'Maine',
  MD:'Maryland',
  MA:'Massachusetts',
  MI:'Michigan',
  MN:'Minnesota',
  MS:'Mississippi',
  MO:'Missouri',
  MT:'Montana',
  NE:'Nebraska',
  NV:'Nevada',
  NH:'New Hampshire',
  NJ:'New Jersey',
  NM:'New Mexico',
  NY:'New York',
  NC:'North Carolina',
  ND:'North Dakota',
  OH:'Ohio',
  OK:'Oklahoma',
  OR:'Oregon',
  PA:'Pennsylvania',
  RI:'Rhode Island',
  SC:'South Carolina',
  SD:'South Dakota',
  TN:'Tennessee',
  TX:'Texas',
  UT:'Utah',
  VT:'Vermont',
  VA:'Virginia',
  WA:'Washington',
  WV:'West Virginia',
  WI:'Wisconsin',
  WY:'Wyoming',
  AS:'America Samoa',
  FM:'Federated States of Micronesia',
  GU:'Guam',
  MH:'Marshall Islands',
  MP:'Northern Mariana Islands',
  PW:'Palau',
  PR:'Puerto Rico',
  UM:'U.S. Minor Outlying Islands',
  VI:'Virgin Islands',
};


/* GET users listing. */
router.get('/', function(req, res, next) {


  console.log("requesting beerbug data");

  return http.get({
    host: 'thebeerbug.com',
    path: '/community/'
  }, function(response) {
    // Continuously update stream with data
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {

      $ = cheerio.load(body);

      console.log("response received");
      var response = {};

      $(".profiles li").each(function(i, element) {

        var li = $(element);
        var name = li.find(".visible-xs .name").text();
        var abv = li.find(".container>*:nth-child(3) .datalabel-small").text();
        var location = li.find(">div>#brewInfo label:nth-child(2)").text();

        var usaPattern = /usa|united states|unites states of america/i;

        var isUSA = usaPattern.test(location);
        var state, abrev;
        if(isUSA) {
          for (abrev in states){
            state = states[abrev];
            if(location.indexOf(abrev) != -1 ||
              location.toLowerCase().indexOf(state.toLowerCase()) != -1) {

              if(state == "Virginia"){
                if(location.toLocaleString().indexOf("west virginia") != -1) {
                  continue; //don't count west virginia as part of virgina
                }
              }
              break;
            }
          }
        }else {
          return;
        }

        if(!response[state]) {
          response[state] = {};
          response[state].brews = [];
        }

        response[state].brews.push({
          name: name,
          abv: abv,
          loc: location
          // isUSA: isUSA,
          // state: state
        });

      });

      for(var state in response) {
        var stateData = response[state];
        var abvSum = 0;
        for (var i in stateData.brews) {
          var brew = stateData.brews[i];
          abvSum += parseFloat(brew.abv);
        }


        stateData.averageABV = (abvSum / stateData.brews.length).toFixed(2);
      }

      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(response));
      res.end();

    });
  });


  // res.send('respond with a resource');
});

module.exports = router;

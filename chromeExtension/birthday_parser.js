const fs = require('fs');

/***************************/
/****Variables & Objects****/
/***************************/

var dataString;

read();

function read() {

  fs.readFile('/Users/jamal/Development/facebook_birthday_export/facebook_html.txt', (err, data) => { 
    
    if (err) throw err;

    dataString = data.toString();

    var myRegexp = /data-tooltip-content="(?<name>[a-z0-9- ]+)\((?<month>\d{1,2})\/(?<day>\d{1,2})\)"/gi;
    var matched_data = dataString.match(myRegexp);

    var today = new Date();
    var current_month = today.getMonth()+1
    var current_day = today.getDate()
    var current_year = today.getFullYear()

    matched_data.forEach(function (element) {
      match = new RegExp(myRegexp).exec(element)
      try {
        if(match.groups){
          var group = match.groups
          var day = parseInt(group['day'])
          var month = parseInt(group['month'])
          //if(month < current_month || (month == current_month && day < current_day)) {
            //var year = current_year + 1
          //} else {
            var year = current_year
          //}
          var date = `${day}/${month}/${year}`
          console.log(group['name'].trim());
          //console.log([group['name'].trim(), date, 'True']);
          //csv.push([group['name'].trim() , date, 'True']);
        }
      } catch (error) {
        return false;
      }
    });
  })


}
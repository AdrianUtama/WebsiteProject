function DoSomethingWithData(data) {
  var counter = 0;
  var str = "<strong>" + full_team_name + " Schedule:</strong><br>";
  str += "<table> <tr> <th>Home team</th> <th>Away Team</th> <th>Date</th> <th>Time (ET)</th><th>Location</th> </tr>";
  for (i = 0; i < data.fullgameschedule.gameentry.length; ++i) {
    if ((data.fullgameschedule.gameentry[i].homeTeam.Name == team_name) ||
      (data.fullgameschedule.gameentry[i].awayTeam.Name == team_name)) {


      var today = new Date();
      var gameDay = new Date(data.fullgameschedule.gameentry[i].date );
      gameDay.setDate(gameDay.getDate() + 1);
      if (is_filter) {          /*use is_filter to turn on and  off the filter  */

        if (gameDay < today) { //game day is passed condition
            continue;
        } else {  //game day is in the future condition
          ++counter;
        }
      } else {    //used when filter is off 
        // console.log("future gameday = "+gameDay);

        ++counter;
      }

      if (counter == 16) {
        break;
      }

      //console.log("printing added gameday"+data.fullgameschedule.gameentry[i]);
      var temp =
        "<tr>" +
        "<td>" + data.fullgameschedule.gameentry[i].homeTeam.Name + "</td>" +
        "<td>" + data.fullgameschedule.gameentry[i].awayTeam.Name + "</td>" +
        "<td>" + data.fullgameschedule.gameentry[i].date + "</td>" +
        "<td>" + data.fullgameschedule.gameentry[i].time + "</td>" +
        "<td>" + data.fullgameschedule.gameentry[i].location + "</td>" +
        "</tr>";
      str += temp;
    }
  }
  str += "</table>";
  if (counter == 0) {
    str = "<strong>No Games Available</strong></font>";
  }
  document.getElementById("sport").innerHTML = str;

}

$.ajax({
  type: "GET",
  url: schedule_url,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa("twahl" + ":" + "CSCE315API")
  },
  success: function(data) {
    DoSomethingWithData(data);
  }
});

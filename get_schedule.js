function DoSomethingWithData(data) {
  var counter = 0;
  var A = [];
  var str = "<strong><font color = white>" + full_team_name + " Play Times:</font></strong><br>";
  str += "<table> <tr> <th>Home team</th> <th>Away Team</th> <th>Date</th> <th>Time</th><th>Location</th> </tr>";
  for (i = 0; i < data.fullgameschedule.gameentry.length; ++i) {
    if ((data.fullgameschedule.gameentry[i].homeTeam.Name == team_name) ||
      (data.fullgameschedule.gameentry[i].awayTeam.Name == team_name)) {

      var today = new Date();
      var gameDay = new Date(data.fullgameschedule.gameentry[i].date);
      console.log(gameDay);
      if (is_filter) {
        if (gameDay < today) { //filter the passed days
          continue;
        } else {
          ++counter;
        }
      } else {
        ++counter;
      }
      if (counter == 16) {
        break;
      }

      A.push(data.fullgameschedule.gameentry[i]);
      console.log(data.fullgameschedule.gameentry[i]);
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
    str = "<font color = white><strong>No Games Available</strong></font>";
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

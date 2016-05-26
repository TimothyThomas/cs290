var req = new XMLHttpRequest();
req.open('GET', 'http://localhost:3000/getall', true);
req.addEventListener('load', function(){
    if (req.status < 400){
        var data = JSON.parse(req.responseText);
        document.body.appendChild(buildTable(data));
        console.log(data);
    } else {
        console.log("Error in network request: " + request.statusText);
    }
});
req.send(null);

function buildTable(data) {
  var tbl = document.createElement('table');
  var header_row = document.createElement('tr');
  tbl.appendChild(header_row);
  headers = ["Name", "Reps", "Weight", "Date", "lbs"];
  for (var i = 0; i <  headers.length; i++) {
    var heading = document.createElement('th');
    //heading.textContent = "Header " + i;
    heading.textContent = headers[i];
    heading.style.border = "1px solid black";
    heading.style.padding = "3px";
    header_row.appendChild(heading);
  }

  for (var i = 0; i < data.length; i++) {
      var row = document.createElement('tr');
      fields = ['name', 'reps', 'weight', 'date', 'lbs'];
      for (var j = 0; j <= 4; j++) {
          var cell = document.createElement('td');
          cell.textContent = data[i][fields[j]];
          cell.style.textAlign = "center";
          cell.style.border = "1px solid black";
          row.appendChild(cell);
      }
    tbl.appendChild(row);
  }
  tbl.style.border = "2px solid black";
  tbl.style.borderCollapse = "collapse";
  return tbl;
}

//var tbl = document.body.appendChild(buildTable());

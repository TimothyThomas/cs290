function buildTable() {
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

  data = [{'name':'Bench','reps':10,'weight':225,'date':'2016-01-01','lbs':1},
          {'name':'Squat','reps':5,'weight':315,'date':'2016-01-02','lbs':1}];
  for (i = 0; i <= data.length; i++) {
    var row = document.createElement('tr');
    for (field in data[i]) {
        var cell = document.createElement('td');
        cell.textContent = data[i][field];
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

var tbl = document.body.appendChild(buildTable());

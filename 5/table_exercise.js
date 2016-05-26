var MOUNTAINS = [{
  name: "Kilimanjaro",
  height: 5895,
  country: "Tanzania"
}, {
  name: "Everest",
  height: 8848,
  country: "Nepal"
}, {
  name: "Mount Fuji",
  height: 3776,
  country: "Japan"
}, {
  name: "Mont Blanc",
  height: 4808,
  country: "Italy/France"
}, {
  name: "Vaalserberg",
  height: 323,
  country: "Netherlands"
}, {
  name: "Denali",
  height: 6168,
  country: "United States"
}, {
  name: "Popocatepetl",
  height: 5465,
  country: "Mexico"
}];

function buildTable(data) {
  var tbl = document.createElement('table');
  var header_row = document.createElement('tr');
  tbl.appendChild(header_row);
  for (i = 0; i < 3; i++) {
    var heading = document.createElement('th')
    heading.textContent = Object.keys(data[0])[i];
    header_row.appendChild(heading);
  }
  for (m = 0; m < data.length; m++) {
    var row = document.createElement('tr');
    for (i = 0; i < 3; i++) {
        var cell = document.createElement('td');
        param = Object.keys(data[m])[i];
        cell.textContent = data[m][param];
        if (typeof data[m][param] == 'number')
          cell.style.textAlign = 'right';
        row.appendChild(cell);
    }
    tbl.appendChild(row);
  }
  return tbl;
}
document.body.appendChild(buildTable(MOUNTAINS));

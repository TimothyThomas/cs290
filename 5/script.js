function buildTable() {
  var tbl = document.createElement('table');
  var header_row = document.createElement('tr');
  tbl.appendChild(header_row);
  for (var i = 1; i <= 4; i++) {
    var heading = document.createElement('th')
    heading.textContent = "Header " + i;
    heading.style.border = "1px solid black";
    heading.style.padding = "3px";
    header_row.appendChild(heading);
  }

  position = 0;
  for (i = 1; i <= 3; i++) {
    var row = document.createElement('tr');
    for (var j = 1; j <= 4; j++) {
        var cell = document.createElement('td');
        cell.pos = position;
        cell.row = i;
        cell.col = j;
        cell.textContent = j + ", " + i; 
        cell.style.textAlign = "center";
        cell.style.border = "1px solid black";
        row.appendChild(cell);
        position++;
    }
    tbl.appendChild(row);
  }
  tbl.style.border = "2px solid black";
  tbl.style.borderCollapse = "collapse";
  return tbl;
}

function addButton(label) {
    var button = document.createElement("button");
    button.textContent = label;
    if (label == "Mark Cell")
        button.addEventListener("click", markCell); 
    else
        button.addEventListener("click", function () { moveCell(label); }); 
    return button;
}

function selectCell(cell) {
    cell.style.border = "3px solid black";
    cell.id = "selected";
}

function clearCell(cell) {
    cell.style.border = "1px solid black";
    cell.id = "unselected";
}

function moveCell(direction) {
    cur_cell = document.getElementById("selected");

    if (direction == "right") {
        if (cur_cell.col < 4) {
            clearCell(cur_cell);
            selectCell(cur_cell.nextElementSibling);
        }
    }

    if (direction == "left") {
        if (cur_cell.col > 1) {
            clearCell(cur_cell);
            selectCell(cur_cell.previousElementSibling);
        }
    }

    if (direction == "down") {
        if (cur_cell.row < 3) {
            clearCell(cur_cell);
            next_pos = cur_cell.pos + 4;
            selectCell(document.querySelectorAll("td")[next_pos]);
        }
    }

    if (direction == "up") {
        if (cur_cell.row > 1) {
            clearCell(cur_cell);
            next_pos = cur_cell.pos - 4;
            selectCell(document.querySelectorAll("td")[next_pos]);
        }
    }
}

function markCell() {
    cur_cell = document.getElementById("selected");
    cur_cell.style.backgroundColor = "yellow";
}

var tbl = document.body.appendChild(buildTable());
document.body.appendChild(addButton("left"));
document.body.appendChild(addButton("right"));
document.body.appendChild(addButton("up"));
document.body.appendChild(addButton("down"));
document.body.appendChild(addButton("Mark Cell"));

first_cell = document.querySelectorAll("td")[0];
first_cell.id = "selected";
selectCell(first_cell);

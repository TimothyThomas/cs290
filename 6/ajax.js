document.addEventListener('DOMContentLoaded', bindButtons);
    function bindButtons(){
    document.getElementById('zipSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var zipcode = document.getElementById('zip').value;
        var url = "http://api.openweathermap.org/data/2.5/weather?";
        var appkey = "&appid=7fe335459939ebde6d702c5b47e0522a";
        req.open("GET", url + "zip=" + zipcode + appkey, true);
        req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var cityName = response.name;
            var tempF = (Number(response.main.temp) - 273) * 1.8 + 32.0;
            var hum = Number(response.main.humidity);
            document.getElementById('chosen_city').textContent = cityName;
            document.getElementById('temp').textContent = String(tempF.toFixed(0)) + " degrees F";
            document.getElementById('humidity').textContent = String(hum.toFixed(0)) + "%";
        } else {
            console.log("Error in network request: " + request.statusText);
        }});
        req.send(null);
        event.preventDefault();
    });


    document.getElementById('citySubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var city = document.getElementById('city').value;
        var url = "http://api.openweathermap.org/data/2.5/weather?"
        var appkey = "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
        req.open("GET", url + "q=" + city + appkey, true);
        req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var cityName = response.name;
            var tempF = (Number(response.main.temp) - 273) * 1.8 + 32.0;
            var hum = Number(response.main.humidity);
            document.getElementById('chosen_city').textContent = cityName;
            document.getElementById('temp').textContent = String(tempF.toFixed(0)) + " degrees F";
            document.getElementById('humidity').textContent = String(hum.toFixed(0)) + "%";
        } else {
            console.log("Error in network request: " + request.statusText);
        }});
        req.send(null);
        event.preventDefault();
    });


    document.getElementById('httpBinSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var sentName = document.getElementById('username').value;
        var sentColor = document.getElementById('color').value;
        var payload = {'name': sentName, 'color': sentColor};
        var url = "https://httpbin.org/post";
        req.open("POST", url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function(){
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var data = JSON.parse(response.data);
            document.getElementById('receivedName').textContent = data.name;
            document.getElementById('receivedColor').textContent = data.color;
        } else {
            console.log("Error in network request: " + request.statusText);
        }});
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
    }

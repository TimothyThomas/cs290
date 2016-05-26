function calc_sum(a){
    var result = 0
    a.forEach(sum);
        function sum(val) {
            result += val;
            return result;
        };
    return result;
};

var arr = [1, 2, 3, 4, 5, 6];
console.log("The sum of [" + arr + "] is " + calc_sum(arr));


function dialog(character) {
    return function(quote) {
        return character + " says \"" + quote + "\"";
    };
};

var Mater = {char_name: "Mater", line: "I never leak oil! Never!"};
Mater.speak = dialog(Mater.char_name);
console.log(Mater.speak(Mater.line));

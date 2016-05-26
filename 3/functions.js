hoisted()
function hoisted() {
    console.log("I've just been hoisted!")
}
not_hoisted()
var not_hoisted = function() {
    console.log("I will not get hoisted.  :(")
}

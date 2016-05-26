function deepEqual(val1, val2) {
    if ((typeof(val1) == "object" && val1 != null) && 
        (typeof(val2) == "object" && val2 != null))  {
        for (key in val1) {
                if (!(key in val2)) return false;
                else  return deepEqual(val1[key], val2[key]);
        }
        for (key in val2) {
            if (!(key in val1)) return false;   
        } 
    }
    else return (val1 === val2);
    return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));

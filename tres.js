function createStats() {
    this.odd=0;
    this.even=0;
    this.maximuns=[];
    this.minimuns=[];

    //create numbers object and intializes to 0 ocurrences
    this.numbers = {};
    for (var i = 1; i < 11; i++) numbers[i] = 0;

    this.computeStats =computeStats;
    function computeStats(arrayOfRandoms) {

        for (var i = 0; i < arrayOfRandoms.length; i++) {

            numbers[arrayOfRandoms[i]]++;

            if (arrayOfRandoms[i] % 2)
                this.odd++;
            else
                this.even++;

            //console.log("elemento"+arrayOfRandoms[i].toString());
        }

        this.maximuns = calculateMaxMin(numbers, true);
        this.minimuns = calculateMaxMin(numbers, false);

        //console.log(maximuns.join(",") + "--" + minimuns.join(","));

    }

    /**
    Calculate the max or min properties of an object, object must contain only numeric properties.
    object: the object that contains the properties
    op: If op is thruly calcula the maximums otherwise compute the minimum
    returns an array with the names of the properties calculated
    **/

    this.calculateMaxMin = calculateMaxMin;
    function calculateMaxMin(object, op) {
        var properties = [];
        var value = null;

        for (var key in object) {
            if (value == null || object[key] == value) {
                properties.push(key);
                value = object[key]
            } else if (op == true && object[key] > value) {
                properties = [key];
                value = object[key];
            } else if (op != true && object[key] < value) {
                properties = [key];
                value = object[key];
            }
        }

        return properties;
    }


    return this;
}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function generateRandomArray(nitems) {
    var elements = [];

    for (var i = 0; i < nitems; i++) {
        elements.push(Math.floor((Math.random() * 10) + 1));
        //console.log(elements[i]);
    }

    return elements;
}


function pretyPrintResults(stats) {
    var pretyPrinted = "\nSum of each numbers generated\n";
    for (var key in stats.numbers) pretyPrinted += (key + "\t " + stats.numbers[key] + "\n");

    pretyPrinted+="\nOthers interesting facts\n";

    pretyPrinted+="\Total even numbers generated \t"+stats.even+"\n";
    pretyPrinted+="\Total odd numbers generated \t"+stats.odd+"\n";

    pretyPrinted+="\Maximun number(s) generated \t"+stats.maximuns+"\n";
    pretyPrinted+="\Minimum number(s)  generated \t"+stats.minimuns+"\n";


    return pretyPrinted;
}


var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('How many numbers do you wish to generate and press intro? ');
rl.prompt();

rl.on('line', function (line) {

    if (!isNumber(line)) {
        rl.setPrompt("<" + line + "> is not a number\n");
        rl.prompt();
        rl.close();
    } else
    if (line < 0) {
        rl.setPrompt("<" + line + "> must be a positive number\n");
        rl.prompt();
        rl.close();
    } else {
        var arrayOfRandoms = generateRandomArray(line);
        console.log(arrayOfRandoms.length + " elements generated\n");
        var stats = createStats();
        stats.computeStats(arrayOfRandoms);

        console.log(pretyPrintResults(stats));
        rl.close();
    }

}).on('close', function () {
    process.exit(0);
});

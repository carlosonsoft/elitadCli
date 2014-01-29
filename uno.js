function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function generateRandomArray(nitems)
{
    var elements=[];

    for(var i=0; i<nitems;i++)
    {
        elements.push(Math.floor((Math.random()*10)+1));
        //console.log(elements[i]);

    }

    return elements;
}


var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('How many numbers do you wish to generate and press intro? ');
rl.prompt();

rl.on('line', function(line) {

    if(!isNumber(line))
        {
            rl.setPrompt("<"+line+"> is not a number\n");
            rl.prompt();
            rl.close();
        }
    else
    if(line<0)
        {
            rl.setPrompt("<"+line+"> must be a positive number\n");
            rl.prompt();
            rl.close();
        }
    else
    {
        var arrayOfRandoms=generateRandomArray(line);
        rl.setPrompt(arrayOfRandoms.length+" elements generated\n");
        rl.prompt();
        rl.close();
    }

}).on('close',function(){
    process.exit(0);
});

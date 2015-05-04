var program = require('commander'),
    ffmpeg = require('fluent-ffmpeg'),
    path = require('path'),
    inputFile = "",
    outputFile = "";

module.exports = function() {
program
  .version('0.0.1')
  .arguments('<inputFile> [outputFile]')
  .action(function (cmd, env) {
     inputFile = cmd;
     outputFile = env;
  })
  .parse(process.argv);

var nn = 0;

if (inputFile !="" && outputFile !="") {
	inMedia = path.resolve(""+inputFile+"");
	outMedia = path.resolve(""+outputFile+"");
	console.log("Transcoding:"+ inputFile +" > "+ outputFile);
	ffmpeg(inMedia).save(outMedia).audioFilters(
		{
			filter: 'silencedetect',
			options: { n: '-50dB', d: 5 }
		}
	);
} else {
	console.log("Try Using --help");
}
}
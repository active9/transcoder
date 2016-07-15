var program = require('commander');
var ffmpeg = require('fluent-ffmpeg');
var ProgressBar = require('progress');
var path = require('path');
var inputFile = "";
var outputFile = "";

module.exports = function() {
	program
	  .version('0.0.1')
	  .arguments('<inputFile> [outputFile]')
	  .option('-f, --format [format]', 'container format (mp4)')
	  .option('-c, --codec [codec]', 'video codec (libx264)')
	  .option('-a, --acodec [acodec]', 'audio codec (aac)')
	  .option('-s, --size [size]', 'video dimensions (320x240)')
	  .action(function (cmd, env) {
	     inputFile = cmd;
	     outputFile = env;
	  })
	  .parse(process.argv);

	var nn = 0;

	if (inputFile !="" && outputFile !="") {
		var xor = 0;
		var xan = 0;
		inMedia = path.resolve(""+inputFile+"");
		outMedia = path.resolve(""+outputFile+"");
		console.log("Transcoding: "+ inputFile +" > "+ outputFile);

		var bar = new ProgressBar('  Progress [:bar] :percent :etas', {
    		complete: '=',
    		incomplete: ' ',
    		width: 20,
    		total: 100
  		});
		var command = ffmpeg(inMedia).addOptions([
			'-preset veryslow'
		]);
		if (program.format) {
			command.format(program.format);
		}
		if (program.codec) {
			command.videoCodec(program.codec);
		}
		if (program.acodec) {
			command.audioCodec(program.acodec);
		}
		if (program.size) {
			command.size(program.size);
		}
		command.save(outMedia).audioFilters(
			{
				filter: 'silencedetect',
				options: { n: '-50dB', d: 5 }
			}
		).on('progress', function(progress) {
			if (xor>xan) {
				xor = parseInt(progress.percent);
				bar.tick(xor-xan);
				xan = xor;
			}
			xor++;
  		});
	} else {
		console.log("Try Using --help");
	}
}
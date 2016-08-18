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
	  .option('-p, --fps [fps]', 'output frames per second (29.7)')
	  .option('-i, --ifps [ifps]', 'input frames per second (29.7)')
	  .option('-n, --native [native]', 'read input at native frames per second')
	  .option('-x, --noaudio [noaudio]', 'disables the output audio track')
	  .option('-v, --novideo [novideo]', 'disables the output video track')
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
		if (program.fps) {
			command.fps(program.fps);
		}
		if (program.ifps) {
			command.inputFPS(program.ifps);
		}
		if (program.native) {
			command.native(program.native);
		}
		if (program.noaudio) {
			command.noaudio(program.noaudio);
		}
		if (program.novideo) {
			command.novideo(program.novideo);
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
#Transcoder
![Transcoder](https://raw.githubusercontent.com/active9/transcoder/master/transcoder.png)

Trancdoer the command line audio / video transcoder tool

##Introduction
Transcoder is a FFmpeg powered command line transcoding tool. It allows you to convert audio and video files between many formats.

##Installing
```bash
npm install transcoder -g
```

##USING

Transcoder is used as a stand-alone application. Now that you have Transcoder installed you can convert files using any of the following methods:

Convert an .avi to an .mp4
```bash
transcoder /path/to/video.avi /path/to/video.mp4
```

The above command will execute Transcoder and convert the video.avi file to a video.mp4 file using the appropriate encoder setup. 

Convert a .mp3 to an .ogg
```bash
transcoder /path/to/audio.mp3 /path/to/audio.ogg
```

This will create an ogg encoded version of the audio.mp3 file specified.


Convert a .wav to an .aiff
```bash
transcoder /path/to/audio.wav /path/to/audio.aiff
```

This will convert audio.wav to audio.aiff.

##CONTRIBUTING

We encourage forking. Feel free to fork & pull your new additions, or bug fixes.

##LICENSE

MIT

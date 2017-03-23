(function () {
    function SongPlayer(Fixtures) {
        /**
        * @desc SongPlayer object
        * @type {Object}
        */
        var SongPlayer = {};
        /**
        * @desc Current album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function (song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
        };
        /**
        * @function playSong
        * @desc Plays song
        * @param {Object} song
        */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        /**
        * @function stopSong
        * @desc Stops song
        * @param {Object} song
        */
        var stopSong = function () {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        /**
        * @function getSongIndex
        * @desc Get index of currently playing song
        * @param {Object} song
        */
        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);  
        };
        /**
        * @desc Current song object
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        /**
        * @function SongPlayer.play
        * @desc Plays song
        * @param {Object} song
        */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        /**
        * @function SongPlayer.pause
        * @desc Pauses currently playing song
        * @param {Object} song
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        * @function SongPlayer.previous
        * @desc Plays previous song
        */
        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function SongPlayer.next
        * @desc Plays next song
        */
        SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

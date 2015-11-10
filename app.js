var data;
var topTrack;
var relatedArtist;
var baseUrl = 'https://api.spotify.com/v1/'
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {};

  $scope.getArtist = function() {
    $http.get(baseUrl + 'search?type=artist&query=' + $scope.artist).success(function(response){
      data = $scope.artists = response.artists.items;
      /*console.log(data[0].album.images[0].url);*/
    })
  }

  $scope.getSongs = function(artistId) {
    $http.get(baseUrl + 'artists/' + artistId + '/top-tracks?country=US').success(function(response){
      $scope.topTracks = response.tracks;
    })
  }

  $scope.getRelatedArtists = function(artistId) {
    $http.get(baseUrl + 'artists/' + artistId + '/related-artists').success(function(response){
      relatedArtist = $scope.relatedArtists = response.artists;
    })
  }

  $scope.getInfo = function(artistId) {
    $http.get(baseUrl + 'artists/' + artistId).success(function(response){
      var imageUrl;
      var genre;
      var name; 
      imageUrl = response.images[0].url;
      genre = "" + response.genres;
      name = response.name;

      console.log(genre);
      $('.artist-info').empty();
      $(".artist-info").append('<img class = squareImage src = "' + imageUrl + '"> </img>');
      $('.artist-info').append('<h3>' + name + '</h3>');
      if(genre.length > 0) {
        $('.artist-info').append('<h4> genre : ' + genre + '<h4>');
      }
    })
  }

  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});

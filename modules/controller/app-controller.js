
angular.module("hbd").controller('appCtrl',function ($rootScope, $scope, $firebaseArray, $firebaseStorage, $timeout) {

    var self = this;

    self.wish = {
        "name":"",
        "msg":"",
        "pic":""
    };

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDsZeWj_4cji7lFuzS0XFzzD2-klh-dMZc",
        authDomain: "hbd2k18-548b3.firebaseapp.com",
        databaseURL: "https://hbd2k18-548b3.firebaseio.com",
        projectId: "hbd2k18-548b3",
        storageBucket: "hbd2k18-548b3.appspot.com",
        messagingSenderId: "719155851289"
    };
    firebase.initializeApp(config);

    $scope.strgUrl = "https://firebasestorage.googleapis.com/v0/b/hbd2k18-548b3.appspot.com/o/pics%2F";
    $scope.code = "?alt=media&token=0d14b835-a72a-4abf-af6b-cc08b41786a9";
    var ref = firebase.database().ref().child("messages");


    $scope.sendWish = function () {
        $scope.messages = $firebaseArray(ref);

        console.log(self.wish);
        $scope.messages.$add(self.wish)
            .then(function (data) {
                console.log(data);
                $scope.showSuccess("Wish sent successfully", 6000);
                $scope.addImage(document.getElementById("profilePic").files[0], data.key);
            })
            .catch(function (error) {
                console.log(error);
                $scope.showError("Try again", 6000);
            })


    }

    //onchange="angular.element(this).scope().addImage(this)"

    $scope.addImage = function (obj, key) {
        console.log(obj);
        var imgRef = firebase.storage().ref("pics/"+key);
        $scope.images = $firebaseStorage(imgRef);

        var progress = $scope.images.$put(obj);
        progress.$progress(function (snapshot) {

            var percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentUploaded);
        })
        // $scope.images.$getDownloadURL().then(function (url) {
        //     $scope.messages = $firebaseArray(ref);
        //     console.log($scope.messages);
        //     $scope.messages[key] = url;
        //
        //     $scope.messages.$save(key)
        //         .then(function (data) {
        //             console.log(data);
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         })
        //
        //
        // })
        // self.imageResponse = null;
        // var reader,fileV;
        // fileV = obj.files[0];
        // if(fileV) {
        //     reader = new FileReader();
        //     reader.onload = function(e){
        //         $scope.$apply(function() {
        //             self.wish.pic = e.target.result;
        //         });
        //     };
        //     reader.readAsDataURL(fileV);
        //     // reader.readAsDataURL(element.files[0]);
        // }
        // else {
        //     self.wish.pic = undefined;
        // }
        //
        // $scope.$evalAsync();

    }

    $scope.getWishes = function () {

        $scope.showLoader = true;

        $scope.messages = $firebaseArray(ref);

        $scope.messages.$loaded()
            .then(function (data) {
                console.log(data);
                $scope.showLoader = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.showLoader = false;
                $scope.showError("Something went wrong", 6000);
            })
    };

    $scope.showSuccess = function (msg, duration) {
        var time = duration != undefined ? duration : 4000;
        $rootScope.successMesssage = msg;
        $('#commonSucess').show();
        $timeout(function () {
            $('#commonSucess').fadeOut(800)
        }, time);
    }

    $scope.showError = function (msg, duration) {
        var time = duration != undefined ? duration : 4000;
        $rootScope.errorMesssage = msg;
        $('#commonError').show();
        $timeout(function () {
            $('#commonError').fadeOut(800)
        }, time);
    }
});
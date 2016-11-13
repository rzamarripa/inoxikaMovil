angular
  .module('FLOKsports')
  .controller('SignupCtrl', SignupCtrl);
 
function SignupCtrl($meteor,$scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);
  
  this.signup = {};
  
  this.sign = function(){
      var _user = { 
        username: this.signup.username,
        password: this.signup.password,
        profile: {
	        name: this.signup.name,
          email: this.signup.email,
          picture: 'images/unknown.jpg'
        }
      }
      console.log(this.singup,_user)
      $meteor.createUser(_user).then(
        function () {
            $state.go('app.home');        
        },
        function (error) {
          $ionicPopup.alert({
            title: error.reason,
            template: error.message,
            okType: 'button-positive button-clear'
          });
        }
      );
  }
}
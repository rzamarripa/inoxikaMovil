angular
  .module('FLOKsports')
  .controller('MaterialesCtrl', function MaterialesCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
	$reactive(this).attach($scope);
  	this.shouldShowDelete = false;
		this.shouldShowReorder = false;
		this.listCanSwipe = true;
		this.helpers({
			materiales() {
				var materiales = Materiales.find({estatus : true}).fetch();
				if(materiales){
					_.each(materiales, function(material){
						if(material.unidad_id != undefined)
							material.unidad = Unidades.findOne(material.unidad_id);
					})
				}
				return materiales;
			}
		});
		
		var deviceInformation = ionic.Platform.device();

	  var isWebView = ionic.Platform.isWebView();
	  var isIPad = ionic.Platform.isIPad();
	  var isIOS = ionic.Platform.isIOS();
	  var isAndroid = ionic.Platform.isAndroid();
	  var isWindowsPhone = ionic.Platform.isWindowsPhone();
	
	  var currentPlatform = ionic.Platform.platform();
	  var currentPlatformVersion = ionic.Platform.version();
	  
	  console.log("deviceInformation",deviceInformation);
	  console.log("isWebView",isWebView);
	  console.log("isIPad",isIPad);
	  console.log("isIOS",isIOS);
	  console.log("isAndroid",isAndroid);
	  console.log("isWindowsPhone",isWindowsPhone);
	  
	  console.log("currentPlatform",currentPlatform);
	  console.log("currentPlatformVersion",currentPlatformVersion);
	 	this.eliminar = function(material){
			var confirmPopup = $ionicPopup.confirm({
				title: material.nombre,
				template: 'Estás seguro que quiere eliminar el material?' 
			});
			
			confirmPopup.then(function(res) {
				if(res) {
					Materiales.update(material._id, { $set : {estatus : false}});		
				}
			});
			
		}
});
angular
  .module('FLOKsports')
  .controller('ProductoCtrl', function ProductoCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.verProducto = "";
		this.helpers({
			producto : function() {
				return Productos.findOne($stateParams.productoId);;
			}
		});
});
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
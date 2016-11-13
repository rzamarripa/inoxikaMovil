angular
  .module('FLOKsports')
  .controller('ProductosCtrl', function ProductosCtrl($scope, $reactive, $state, $stateParams, $ionicPopup) {
		let rc = $reactive(this).attach($scope);
		this.listCanSwipe = true;
		this.helpers({
			productos() {
				var productos = Productos.find({estatus : true}).fetch();
				if(productos){
					_.each(productos, function(producto){
						if(producto.unidad_id != undefined)
							producto.unidad = Unidades.findOne(producto.unidad_id);
					})
				}
				return productos;
			}
		});
		
		this.eliminar = function(producto){
			var confirmPopup = $ionicPopup.confirm({
				title: producto.nombre,
				template: 'Estás seguro que quiere eliminar el producto?' 
			});
			
			confirmPopup.then(function(res) {
				if(res) {
					Productos.update(producto._id, { $set : {estatus : false}});		
				}
			});
			
		}
});
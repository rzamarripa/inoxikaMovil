angular
	.module('FLOKsports')
	.controller('NuevoProductoCtrl', function NuevoProductoCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory, $ionicModal) {
		let rc = $reactive(this).attach($scope);
		window.rc = rc;
		this.producto = {};
		this.buscar = "";
		this.opcion = {};
		this.opcion.materiales = [];
		this.registrados = "";
		this.quitarhk=function(obj){
			if(Array.isArray(obj)){
				for (var i = 0; i < obj.length; i++) {
					obj[i] =this.quitarhk(obj[i]);
				}
			}
			else if(obj !== null && typeof obj === 'object'){
				delete obj.$$hashKey;
				for (var name in obj) {
						obj[name] = this.quitarhk(obj[name]);
				}	
			}
			return obj;
		}
		
		this.helpers({
			materiales : function() {
				var materiales = Materiales.find({estatus : true},{},{ sort : { "nombre" : 1 }}).fetch();
				if(materiales){
					_.each(materiales, function(material){
						if(material.unidad_id != undefined)
							material.unidad = Unidades.findOne(material.unidad_id);
					})
				}
				return materiales;
			},
			producto : function() {
				if($stateParams.productoId != undefined){
					var producto = Productos.findOne($stateParams.productoId);
				}else{
					producto={detalleProducto:[]};
					producto.fechaCreacion = new Date();
					producto.owner = (Meteor.userId() != undefined) ? Meteor.userId() : "";
					producto.estatus = true;
				}
				return producto;
			},
			unidades : function() {
				return Unidades.find({estatus : true});
			}
		});
		
		this.calcularTotal = function(detalleProducto){
			var total = 0;
			_.each(detalleProducto, function(detalle){
				total += detalle.cantidad * detalle.precio;
			})
			this.producto.precio = total;
		}

		this.agregarMaterial = function(material, $index){
			material.agregado = true;
			this.producto.detalleProducto.push(material);
			material.estatus = !material.estatus;
			this.calcularTotal(this.producto.detalleProducto);
			console.log(this.producto);
		}
		
		this.quitarMaterial = function(material, $index){
			delete material.agregado;
			delete material.cantidad;
			_.each(rc.producto.detalleProducto, function(detalle, index){
				if(material._id == detalle._id){
					rc.producto.detalleProducto.splice(index, 1);
				}
			})
			material.estatus = !material.estatus;
			this.calcularTotal(this.producto.detalleProducto);
			console.log(this.producto);
		}
		
		this.editarMaterial = function(material, $index){
			_.each(rc.producto.detalleProducto, function(detalle, index){
				if(material._id == detalle._id){
					detalle = material;
				}
			})
			material.estatus = !material.estatus;
			this.calcularTotal(this.producto.detalleProducto);
			console.log(this.producto);
		}
		
		this.save	= function(){
			this.quitarhk(this.producto);
			
			_.each(this.producto.detalleProducto, function(material){
				delete material.unidad;
			})
	
			if($stateParams.productoId){
				delete rc.producto._id
				Productos.update({_id:$stateParams.productoId},{$set:rc.producto});
			}
			else{
				Productos.insert(rc.producto);
			}
			
			$ionicHistory.goBack();
		}
		
		$ionicModal.fromTemplateUrl('client/templates/participantes/modalSelMateriales.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		
		this.selMateriales = function() {
			$scope.modal.show();
		};
		
		this.cerrarModalMateriales = function() {
			$scope.modal.hide();
		};
			  
	  this.cambiarEstatus = function(producto, estatus){
			var idTemp = producto._id;
			delete producto._id;
			if(estatus == 3){
				
			}else if(estatus == 5){
				
			}
			console.log(idTemp, estatus, producto);
			Productos.update(idTemp, { $set : { estatus : estatus }});
			
		}
		
		this.mostrarDetalle = function(material) {
	    material.estatus = !material.estatus;
	  };
	  this.esMostrable = function(material) {
	    return material.estatus;
	  };
});



/*
	
	Siendo el creador (owner)
	
	Agendada = 1
		Se puede reprogramar = 4 -> esto es sólo modificando la fecha y ubicación
		Se puede cancelar = 5
	Confirmada = 2
		Se puede iniciar = 3
		Se puede cancelar = 5
		Se puede reprogramar = 4
	Iniciada = 3
		Se puede finalizar = 6 -> se genera la minuta
	Reprogramada = 4
		Se puede cancelar = 5
		Se manda correo
	Cancelada = 5
		Se manda correo
	
	
	
	
	
	Siendo el participante o invitado
	
	Agendada = 1
		Se puede confirmar = 2 -> esto es cuando un participante acepta la reunión
		Se puede rechazar = 7
		
		
		1 Agendada
		2 Confirmada
		3 Iniciada
		4 Reprogramada
		5 Cancelada
		6 Finalizada cuando se registra la minuta de reunión (iPad)
		7 Rechazada
		
		
		
		
		
		
*/
		

angular
  .module('FLOKsports')
  .controller('NuevoMaterialCtrl', function NuevoMaterialCtrl($scope, $reactive, $state, $stateParams, $ionicPopup, $ionicHistory) {
		$reactive(this).attach($scope);
		
		this.materialId = $stateParams.materialId
		this.material = Materiales.findOne(this.materialId)
		this.$ionicHistory = $ionicHistory;
		this.helpers({
			unidades() {
				return Unidades.find({estatus : true});
			}
		});

		this.save = function(){
			if(this.materialId){
				delete this.material._id
				Materiales.update({_id:this.materialId},{$set:this.material});
			}
			else{
				this.material.estatus = true;
				Materiales.insert(this.material);
			}
				
			this.$ionicHistory.goBack();
			
		}
});

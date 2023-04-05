sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library,JSONModel) {
        "use strict";

        var urlobject = library.urlHelper 
        return Controller.extend("consultaproduto.controller.Main", {
            onInit: function () {
               let produto ={};
               let productModel = new JSONModel(produto);
               let viw = this.getViw();
               viw.setModel(productModel, "ModeloProduto");  
            },
            onClickImage: function (oEvent){
               urlobject.redirect(oEvent.getSourse().getSrc(),true );   
            },
            onpressBuscar: function(){
                let input;
                input = this.byid("inpBuscar");
                let valor = input.getValue();
                //alert(valor);

                let paramiters = {
                   url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                   method : "GET",
                   async : true,
                   crossDomain : true,  

                };
           
                $.ajax(paramiters).done(function(response){
                   let oProdutoModel = this.getViw().getModel("ModeloProduto");
                   oProdutoModel.setData({});
                   oProdutoModel.refresh();
                   oProdutoModel.setData(response);
                   oProdutoModel.refresh();
                }.bind(this) )
                .fail(function(){

                }.bind(this) );
                

               

                
            }
           
        });
    });

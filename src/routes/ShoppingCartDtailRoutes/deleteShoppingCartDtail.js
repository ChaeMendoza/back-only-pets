const {Router} = require("express");
const {ShoppingCartDetail} = require("../../db");
const {findCartDtailToDelete} = require("../../controllers/controllerShoppingCartDtail/controllerDelete");
const router = Router();

router.delete("/unsubscribe/:idCartDtail/:productId", async (req, res) => {
    const {idCartDtail,productId} = req.params;
    try{
        if(!idCartDtail) res.status(200).json({
            ok: false, 
            msg: "Se Necesita El Id Del Detalle De Carrito.",
            detail: "idCartDtail No Se Ha Enviado."
        })  
        else{
            const info = await findCartDtailToDelete(idCartDtail,productId);

            if(!info) res.status(200).json({
                ok: false, 
                msg: "No Se Encontro El Producto En El Carrito.",
                detail: "El Detalle De Carrito No Existe O Se Elimino Previamente."
            })  
            else {
                //ELIMINO LOS DETALLES DE CARRITOS ASI NO SE GUARDA INFORMACION INUTIL EN LA DB
                const deletedCartDetail = await ShoppingCartDetail.destroy({
                    where: {
                        cod_CartDetail: idCartDtail,
                        productCodProduct: productId 
                    }
                })  
                deletedCartDetail ? res.status(200).json({
                    ok: true,
                    value: "Se Ha Borrado El Producto Del Carrito."
                }) 
                :
                res.status(200).json({
                    ok: false,
                    msg: "No Se Ha Podido Dar De Baja El Producto Del Carrito.",
                    detail: "Hubo Problemas Para Eliminar El Producto En DeleteShoppingCartDtail.js."
                })
            }
        }

    }catch(err){
        res.status(404).send({
            ok: false, 
            msg: "Lo Lamentamos, Ha Ocurrido Un Error.",
            detail: err.message 
        })
    }
});

module.exports = router;
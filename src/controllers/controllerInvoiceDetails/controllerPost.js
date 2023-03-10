const {InvoiceDetail} = require("../../db.js");


exports.createDetails = async (params) => {

    const newDate = new Date();
    const { cod_invoice, cod_product, unit_price, amount } = params

   try {
        const test = await InvoiceDetail.findAll({where:{cod_invoice:cod_invoice}})
        
        if(test){
            
            return {msg:"Este código de Factura ya se encuentra en uso"}
        }
        else {
            try {
        
                const newDetail = await InvoiceDetail.create({
                    cod_invoice:cod_invoice, 
                    cod_product:cod_product, 
                    unit_price:unit_price, 
                    amount:amount})
                return {msg:"Detalle de Factura Configurado"}
        
            } catch (error) {
                throw new Error(error.message)
            };
        };
   } catch (error) {
    throw new Error(error.message)
   };
};
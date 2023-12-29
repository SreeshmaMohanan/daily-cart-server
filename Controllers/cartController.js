const carts=require('../Models/cartModel')
//add to cart
exports.addToCartController=async(req,res)=>{
    const userId=req.payload
    const {id,title,price,description,category,image,rating,quantity}=req.body
    try {
        const existingProduct = await carts.findOne({id,userId})
        if (existingProduct) {
            //if the product is already in the cart then we just increment the quantity by one
            existingProduct.quantity+=1
            existingProduct.grandTotal=existingProduct.quantity*existingProduct.price
            await existingProduct.save()
            res.status(200).json("items added to your cart")
        }else{
            //if the product is not present in the cart then create a new document for it
            const newProduct= new carts({
                id,title,price,description,category,image,rating,quantity,grandTotal:price,userId
            })
            await newProduct.save()
            res.status(200).json("item added to your cart")
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
        
    }


}
///get cart
exports.getCartItemsController= async(req,res)=> {
    const userId= req.payload
    try {
        const allProducts= await carts.find({userId})
        res.status(200).json(allProducts)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}

//increment quantity
exports.incQuantityController=async(req,res)=>{
    const {id}=req.params
    try {
        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity+=1
            selectedProduct.grandTotal=selectedProduct.quantity*selectedProduct.price
            await selectedProduct.save()
            res.status(200).json('Item Quantity Incremented')

        }else{
            res.status(404).json("product not found")
        }
        
    } catch (error) {
        res.status(401).json(error)
        
    }

}
//decrement quantity
exports.decQuantityController=async(req,res)=>{
    const {id}=req.params
    try {
        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity-=1
            if(selectedProduct.quantity==0){
                await carts.deleteOne({_id:id})
                res.status(200).json("quantity decremented")
                }else{
                    selectedProduct.grandTotal=selectedProduct.quantity*selectedProduct.price
                    await selectedProduct.save()
                    res.status(200).json('Item Quantity decremented')

            }
           

        }else{
            res.status(404).json("product not found")
        }
        
    } catch (error) {
        res.status(401).json(error)
        
    }

}
//remove single item from cart
exports.removeCartItemController=async(req,res)=>{
    const {id}=req.params
    try {
        await carts.deleteOne({_id:id})
        res.status(200).json("item removed from the cart")
    } catch (error) {
        res.status(401).json(error)
    }
}
//empty cart
exports.emptyCartController=async(req,res)=>{
    const userId = req.payload
    try {
        await carts.deleteMany({userId})
        res.status(200).json("cart is empty now")
    } catch (error) {
        res.status(401).json("an error found")
    }
}

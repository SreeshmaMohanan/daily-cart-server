const wishlists=require('../Models/wishlistModel')
// add to wishlist
exports.addToWishlistCotroller =async (req,res)=>{
    
    const userId=req.payload
    const {id,title,price,description,category,image,rating}=req.body
    try {
        const existingUser =await wishlists.findOne({id,userId})
        if(existingUser){
            res.status(406).json("product already avaliable on wishlist")

        }else{
            const newProduct= new wishlists({
               id,title,price,description,category,image,rating,userId
               
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(401).json(error)
        
    }
}
//get wishlist
exports.getWishlistController=async(req,res)=> {
    const userId =req.payload
    try {
        const allProducts= await wishlists.find({userId})
        res.status(200).json(allProducts)
        
    } catch (error) {
        res.status(401).json(error)
        
    }


}

//elete item from wishlist
exports.removeWishlistItemController=async(req,res)=>{
    const {id}=req.params
    try {
        const removeItem= await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
        
    }
}
export const authValidate = (req,res,next) =>{
    try {
         if(!req.session.user){
        return res.json({
            message : "Unauthorized",
            success : false
        })
    }
    next();
    } catch (error) {
        res.json({
            message : "Error in authentication",
            success : false
        })
    }
}
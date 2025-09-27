


export const dashboardController = (req,res) =>{
    res.json({
        success : true,
        message : "Welcome to Dashboard",
        data : req.user
    })
}
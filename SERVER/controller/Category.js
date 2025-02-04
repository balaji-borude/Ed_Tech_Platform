const Category  = require("../models/Category ")

exports.createCategory  = async (req,res) => {
    try {
        // fetch data
        const{name , description} =req.body;

        // validation
        if(!name|| !description){
            return res.status(400).json({
                success:false,
                message:"All field is required"
            })
        }; 

        // create Entry in Db 
        const categoryDetail = await Category.create({
            name:name,
            description:description
        })
        console.log("create a category --> categoryDetail---> ", categoryDetail);

        //response
        return res.status(200).json({
            success:true,
            message:"category created succesfully"
        });
        
    } catch (error) {
        console.log("error in category creation ",error);

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }    
};

// get All tags 
exports.showAllCategory = async(req,res)=>{
    try {
        // get all tags
        // aplayla specic kahi nahi je fetch karayche ahe mhanun {} --> empty pass kela ahe andi tyapudhe jo syntax lihila to purn DB madhe Shodhto (find karto)
        // DB madhe Ji entry jyat name and description asel tr all entry gheun yee  
        const showAllCategory = await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"category are created Succesfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
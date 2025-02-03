const Tag = require("../models/tags")

exports.createTag = async (req,res) => {
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
        const tagDetail = await Tag.create({
            name:name,
            description:description
        })
        console.log("create a Tag --> tagDetail---> ", tagDetail);

        //response
        return res.status(200).json({
            success:true,
            message:"tag created succesfully"
        });
        
    } catch (error) {
        console.log("error in tag creation ",error);

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }    
};

// get All tags 
exports.showAllTags = async(req,res)=>{
    try {
        // get all tags
        // aplayla specic kahi nahi je fetch karayche ahe mhanun {} --> empty pass kela ahe andi tyapudhe jo syntax lihila to purn DB madhe Shodhto (find karto)
        // DB madhe Ji entry jyat name and description asel tr all entry gheun yee  
        const allTags = await Tag.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"Tag are created Succesfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
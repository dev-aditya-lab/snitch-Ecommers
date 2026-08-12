import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            enum:["USD","EUR","GBP","INR","JPY"],
            default:"INR"
        }
    },
    images:[{
        url:{
            type:String,
            required:true,
            default:"https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113"
        },
        altText:{
            type:String,
            default:"Default Product Image"
        },
        fileId:{
            type:String,
            required:true
        }
    }]
},{timestamps:true});

const productModel = mongoose.model("Product",productSchema);
export default productModel;
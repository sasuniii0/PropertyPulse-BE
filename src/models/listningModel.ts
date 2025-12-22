import mongoose, {Schema, Document } from "mongoose";

export enum ListingStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum PropertyType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  LAND = "LAND",
  COMMERCIAL = "COMMERCIAL",
  VILLA = "VILLA",
}

export enum ListingType {
  SALE = "SALE",
  RENT = "RENT",
}

export interface IListning extends Document {
    _id:mongoose.Types.ObjectId;
    title: string;
    description : string;
    price: string;
    size?: number;
    propertyType : PropertyType;
    listingType: ListingType;   
    location: {
        address : string;
        lat: number;
        lng: number;
    };
    images : string[];
    agent : mongoose.Types.ObjectId
    status : ListingStatus
}

const ListningSchema = new Schema (
    {
        title : {type: String, required: true},
        description : {type: String, required: true},
        price : {type: Number, required: true},
        size : {type: Number, required: false},
        propertyType:{
            type: String,
            enum: Object.values(PropertyType),
            required: true,
        },

        listingType: { 
            type: String, 
            enum: Object.values(ListingType), 
            required: true 
        },

        location: {
            address: {type:String , required: true},
            lat: {type: Number , required: true},
            lng: { type: Number, required: true},
        },

        images: [{type: String}],

        agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true,
        },

        status: {
            type : String,
            enum: Object.values(ListingStatus),
            default: ListingStatus.PENDING,
        },
        isActive: { type: Boolean, default: true },

    },
    {timestamps: true}
)

export const Listning = mongoose.model<IListning>("Listning" , ListningSchema)
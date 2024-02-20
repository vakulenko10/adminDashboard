import mongoose, {Schema} from "mongoose";

const helloItemSchema = new Schema(
    {
        enWelcome: String,
        enDescription: String,
        uaWelcome: String,
        uaDescription: String,
        imageURL: String,
    },
    {
        timestamps: true,
    }
);
const aboutMeItemSchema = new Schema(
    {
        enTitle: String,
        enDescription: String,
        uaTitle: String,
        uaDescription: String,
        imageURL: String,
        imageDate: String
    },
    {
        timestamps: true,
    }
);

const myPortfolioItemSchema = new Schema(
    {
        enDescription: String,
        uaDescription: String,
        imageURL: String
    },
    {
        timestamps: true,
    }
);
const myBlogItemSchema = new Schema(
    {
        enTitle: String,
        enDescription: String,
        uaTitle: String,
        uaDescription: String,
        imageURL: String
    },
    {
        timestamps: true,
    }
);
const FAQSItemSchema = new Schema(
    {
        enQuestion: String,
        enAnswer: String,
        uaQuestion: String,
        uaAnswer: String
    },
    {
        timestamps: true,
    }
);


const HelloItem = mongoose.models.HelloItem || mongoose.model('HelloItem', helloItemSchema);
const AboutMeItem = mongoose.models.AboutMeItem || mongoose.model('AboutMeItem', aboutMeItemSchema);
const MyPortfolioItem = mongoose.models.MyPortfolioItem || mongoose.model('MyPortfolioItem', myPortfolioItemSchema);
const MyBlogItem = mongoose.models.MyBlogItem || mongoose.model('MyBlogItem', myBlogItemSchema);
const FAQSItem = mongoose.models.FAQSItem || mongoose.model('FAQSItem', FAQSItemSchema);



export { HelloItem, AboutMeItem, MyPortfolioItem, MyBlogItem, FAQSItem };
//here I have to define some more schemas of content and then use them in my code
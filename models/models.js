import mongoose, {Schema} from "mongoose";

const helloItemSchema = new Schema(
    {
        welcome: String,
        description: String,
        uaWelcome: String,
        uaDescription: String,
        imageID: String,
    },
    {
        timestamps: true,
    }
);
const aboutMeItemSchema = new Schema(
    {
        title: String,
        description: String,
        uaTitle: String,
        uaDescription: String,
        imageID: String,
        imageDate: String
    },
    {
        timestamps: true,
    }
);

const myPortfolioItemSchema = new Schema(
    {
        description: String,
        uaDescription: String,
        imageID: String
    },
    {
        timestamps: true,
    }
);
const myBlogItemSchema = new Schema(
    {
        title: String,
        description: String,
        uaTitle: String,
        uaDescription: String,
        imageID: String
    },
    {
        timestamps: true,
    }
);
const FAQSItemSchema = new Schema(
    {
        question: String,
        answer: String,
        uaQuestion: String,
        uaAnswer: String
    },
    {
        timestamps: true,
    }
);
const HelloItem = mongoose.models.HelloItem;

const AboutMeItem = mongoose.models.AboutMeItem;

const MyPortfolioItem =  mongoose.models.MyPortfolioItem;

const MyBlogItem = mongoose.models.MyBlogItem;

const FAQSItem =  mongoose.models.FAQSItem;

export { HelloItem, AboutMeItem, MyPortfolioItem, MyBlogItem, FAQSItem };
//here I have to define some more schemas of content and then use them in my code
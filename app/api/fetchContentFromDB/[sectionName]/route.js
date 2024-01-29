
import { NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import { HelloItem, AboutMeItem, MyPortfolioItem, MyBlogItem, FAQSItem } from '@/models/models';
export const sectionToModelMap = {
      'welcome': HelloItem,
      'aboutMe': AboutMeItem,
      'myPortfolio': MyPortfolioItem,
      'myBlog': MyBlogItem,
      'FAQS': FAQSItem
    };
export async function GET(req, { params }) {


  try {
    
    console.log("params.sectionName: ", params.sectionName)
    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');
    
    console.log("Keys in sectionToModelMap:", Object.keys(sectionToModelMap));
    console.log("params:", params)
    const model = sectionToModelMap[params.sectionName];
    console.log("sectionToModelMap[params.sectionName]", sectionToModelMap[params.sectionName])
    console.log("model:", model)
    if (!model) {
      return NextResponse.error({ message: 'Invalid sectionName' }, { status: 400 });
    }
    const contentItems = await model.find();
    console.log('Content items:', contentItems);

    return NextResponse.json({ contentItems }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
  }
}
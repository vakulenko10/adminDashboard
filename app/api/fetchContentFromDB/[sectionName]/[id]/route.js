
// import connectMongoDB from '@/libs/mongo_db';
// import { HelloItem, AboutMeItem, MyPortfolioItem, MyBlogItem, FAQSItem } from '@/models/models';


// export async function GET(request, {params}){

//     const {id, sectionName} = params;
//     await connectMongoDB();
//     const specificContentItem = await ContentItem.findOne({_id: id});
//     return NextResponse.json({specificContentItem}, {status: 200})
// } 
import { NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongo_db';
import { HelloItem, AboutMeItem, MyPortfolioItem, MyBlogItem, FAQSItem } from '@/models/models';
import { sectionToModelMap } from "../route";
export async function GET(req, { params }) {
  try {
    const { sectionName, id } = params;

    console.log("sectionName:", sectionName);
    console.log("id:", id);

    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const model = sectionToModelMap[sectionName];

    if (!model) {
      return NextResponse.error({ message: 'Invalid sectionName' }, { status: 400 });
    }

    const contentItem = await model.findOne({_id: id});

    if (!contentItem) {
      return NextResponse.error({ message: 'Item not found' }, { status: 404 });
    }

    console.log('Content item:', contentItem);

    return NextResponse.json({ contentItem }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.error({ message: 'Internal Server Error' }, { status: 500 });
  }
}
export async function PUT(request, {params}){
    const {id} = params;
    
    const {newTitle: title, newDescription: description} = await request.json();
    await connectMongoDB();
    await ContentItem.findByIdAndUpdate(id, {title, description});
    return NextResponse.json({message: "Item updated"}, {status: 200})
}
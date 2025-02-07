import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY_URL!,
});

type UploadResponse = {
	id: string;
	name: string;
	cid: string;
	size: number;
	number_of_files: number;
	mime_type: string;
	user_id: string;
};

type GetCIDResponse = {
    data?: JSON | string | Blob | null;
    contentType: ContentType | null;
  };
  
  type ContentType =
    | "application/json"
    | "application/xml"
    | "text/plain"
    | "text/html"
    | "text/css"
    | "text/javascript"
    | "application/javascript"
    | "image/jpeg"
    | "image/png"
    | "image/gif"
    | "image/svg+xml"
    | "audio/mpeg"
    | "audio/ogg"
    | "video/mp4"
    | "application/pdf"
    | "application/octet-stream"
    | string;
  
// Upload JSON Metadata to IPFS
export async function POST(req: NextRequest) {
  try {
    const { content, name, lang } = await req.json();

    const response:UploadResponse = await pinata.upload.json({
      content,
      name,
      lang,
    });

    return NextResponse.json({ success: true, cid: response.cid, url: `https://ipfs.io/ipfs/${response.cid}` });
  } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// Retrieve Data from Pinata Private Gateway
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cid = searchParams.get("cid");
    if (!cid) return NextResponse.json({ success: false, error: "CID required" }, { status: 400 });

    const data:GetCIDResponse = await pinata.gateways.get(cid);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
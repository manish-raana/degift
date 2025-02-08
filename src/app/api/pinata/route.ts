import { NextRequest, NextResponse } from 'next/server';
import { PinataSDK } from 'pinata';

type UploadResponse = {
  id: string;
  name: string;
  cid: string;
  size: number;
  number_of_files: number;
  mime_type: string;
  user_id: string;
};

// Upload JSON Metadata to IPFS
export async function POST(req: NextRequest) {
  try {
    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT!,
      pinataGateway: process.env.PINATA_GATEWAY_URL!,
    });
    const { content, name, lang } = await req.json();

    const response: UploadResponse = await pinata.upload.json({
      content,
      name,
      lang,
    });

    return NextResponse.json({
      success: true,
      cid: response.cid,
      url: `https://ipfs.io/ipfs/${response.cid}`,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

// Retrieve Data from Pinata Private Gateway
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cid = searchParams.get('cid');

    console.log('cid:', cid);
    if (!cid)
      return NextResponse.json(
        { success: false, error: 'CID required' },
        { status: 400 },
      );

    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT!,
      pinataGateway: 'amaranth-unexpected-antlion-337.mypinata.cloud',
    });
    const data = await pinata.gateways.get(cid);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

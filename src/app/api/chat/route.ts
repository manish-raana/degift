import { NextRequest, NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';
import { ethers, formatEther } from 'ethers';
import { graphqlClient } from '@/lib/graphql';
import { GET_USER_GIFTS } from '@/lib/queries';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const client = new AzureOpenAI({
  baseURL: process.env.OPENAI_API_URL!,
  apiKey: process.env.OPENAI_API_KEY!,
  deployment: 'gpt-4',
  apiVersion: '2024-05-01-preview',
});

async function fetchUserData(address: string) {
  try {
    const giftData = await graphqlClient.request<any>(GET_USER_GIFTS, {
      address: address.toLowerCase(),
    });

    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL,
    );
    const balance = await provider.getBalance(address);

    return {
      balance: formatEther(balance),
      sentGifts: giftData.sentGifts,
      receivedGifts: giftData.receivedGifts,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

const systemPrompt = `You are DeGift Assistant, an AI helper for the DeGift platform.
Always format your responses in JSON with the following structure:
{
  "message": "Your main message to the user",
  "data": {},
  "suggestions": []
}
Response format should include:
- id: string
- amount: string
- tokenAddress: string
- sender: string
- status: string
- createdAt: string
- redeemed: boolean
- redeemedAt: string
- metadataURI: string
- expiration: string
- recipient: string
Use the provided user data for personalized responses.`;

export async function POST(req: NextRequest) {
  try {
    const { messages: rawMessages, address } = await req.json();

    // Fetch user data if address is provided
    let userData = null;
    if (address) {
      userData = await fetchUserData(address);
    }

    // Clean and prepare messages for OpenAI
    const cleanMessages: any[] = [{ role: 'system', content: systemPrompt }];

    // Add user data as system message if available
    if (userData) {
      cleanMessages.push({
        role: 'system',
        content: `Current user data: ${JSON.stringify(userData)}`,
      });
    }

    // Add user messages, cleaning them to only include role and content
    rawMessages.forEach((msg: any) => {
      if (msg.role && msg.content) {
        cleanMessages.push({
          role: msg.role as any,
          content: msg.content,
        });
      }
    });

    const chat = await client.chat.completions.create({
      model: 'gpt-4',
      messages: cleanMessages,
      response_format: { type: 'json_object' },
    });

    const result = chat.choices[0].message.content;

    // Validate JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(result || '{}');
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      parsedResult = {
        message:
          'I apologize, but I encountered an error processing your request.',
        data: {},
        suggestions: [],
      };
    }

    return NextResponse.json({ success: true, result: parsedResult });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

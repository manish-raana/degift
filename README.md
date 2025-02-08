# DeGift - AI-Powered Crypto Gift Cards

DeGift is a decentralized application (dApp) that allows users to send cryptocurrency gifts with personalized AI-generated messages. Built with Next.js and blockchain technology, it provides a secure and user-friendly platform for creating and managing crypto gift cards.

## Features

- 🎁 **Create Crypto Gift Cards**: Send cryptocurrency gifts with personalized messages
- 🤖 **AI-Powered Messages**: Generate custom messages using AI for any occasion
- 💳 **Multiple Currencies**: Support for ETH, USDC, and USDT
- 🎨 **Customizable Themes**: Various themes for different occasions
- 📊 **Gift Dashboard**: Track sent and received gifts
- 🤝 **Smart Contract Integration**: Secure and transparent gift management
- 💬 **AI Chatbot Assistant**: Get help and information about the platform

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Blockchain**: Ethereum (Base Sepolia TestNet)
- **Web3 Integration**: Wagmi, Viem
- **AI Integration**: Azure OpenAI
- **Storage**: IPFS (Pinata)
- **Authentication**: Coinbase Wallet
- **Data Fetching**: GraphQL

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Coinbase Wallet
- Environment variables (see below)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=
NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS=
NEXT_PUBLIC_GATEWAY_URL=
PINATA_API_KEY=
PINATA_SECRET_API_KEY=
PINATA_JWT=
PINATA_GATEWAY_URL=
NEXT_PUBLIC_SUBGRAPH_URL=
SUBGRAPH_API_KEY=
OPENAI_API_URL=
OPENAI_API_KEY=
NEXT_PUBLIC_RPC_URL=
NETWORK_ID=
CDP_API_KEY_NAME=
CDP_API_KEY_PRIVATE_KEY=

```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/degift.git
```

2. Install dependencies:
```bash
cd degift
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features Explained

### Gift Creation Process
1. **Gift Details**: Set amount, currency, and recipient
2. **Message Creation**: Write custom message or generate with AI
3. **Preview**: Review gift card before sending
4. **Blockchain Transaction**: Secure gift creation on-chain

### Gift Management
- Track sent and received gifts
- View gift status (available, redeemed, refunded)
- Access gift details and metadata

### AI Integration
- AI-powered message generation
- Chatbot assistant for platform help
- Context-aware responses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Manish Rana - [@yourtwitter](https://x.com/ManishRaanaa)
Project Link: [https://github.com/yourusername/degift](https://github.com/yourusername/degift)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Wagmi](https://wagmi.sh/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)
- [Pinata](https://www.pinata.cloud/)

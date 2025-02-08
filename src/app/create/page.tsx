'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GiftTheme, getThemesByOccasion } from '@/lib/themes';
import { ThemePreviewModal } from '@/components/ThemePreviewModal';
import GiftCardDetails from '@/components/create/GiftDetails';
import GiftMessage from '@/components/create/GiftMessage';
import GiftPreview from '@/components/create/GiftPreview';
import { DeGift_ABI } from '@/abi/DeGiftContract';
import { parseUnits, ZeroAddress } from 'ethers';
import { parseEther } from 'viem';

export default function CreateGift() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('birthday');
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [currency, setCurrency] = useState('eth');
  const [isAmountTouched, setIsAmountTouched] = useState(false);
  const [isMessageTouched, setIsMessageTouched] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [messageScore, setMessageScore] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<GiftTheme | null>(null);
  const [availableThemes, setAvailableThemes] = useState<GiftTheme[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<GiftTheme | null>(null);
  const [recipient, setRecipient] = useState('');
  const [recipientAddress, setRecipientAddress] = useState<string | null>(null);
  const [isRecipientTouched, setIsRecipientTouched] = useState(false);
  const [recipientError, setRecipientError] = useState<string>();

  useEffect(() => {
    const themes = getThemesByOccasion(occasion);
    setAvailableThemes(themes);
    setSelectedTheme(themes[0]);
  }, [occasion]);

  const isDetailsValid =
    amount !== '' &&
    parseFloat(amount) > 0 &&
    selectedTheme !== null &&
    recipientAddress !== null;

  const isMessageValid = message.length >= 10;
  const canProceed = isDetailsValid && isMessageValid;

  useEffect(() => {
    let newProgress = 0;
    if (isDetailsValid) newProgress += 33;
    if (isMessageValid) newProgress += 33;
    if (canProceed) newProgress += 34;
    setProgress(newProgress);
  }, [isDetailsValid, isMessageValid, canProceed]);

  const generateMessage = async () => {
    setGenerating(true);
    setIsMessageTouched(true);

    const finalMessage =
      "🎉 Happy birthday! I'm sending you some crypto to celebrate your special day. May this digital gift bring you joy and prosperity. Enjoy!";
    let currentMessage = '';

    for (let i = 0; i < finalMessage.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      currentMessage += finalMessage[i];
      setMessage(currentMessage);
    }

    setGenerating(false);
    setMessageScore(95);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleNext = () => {
    if (activeTab === 'details' && isDetailsValid) {
      setActiveTab('message');
    } else if (activeTab === 'message' && isMessageValid) {
      setActiveTab('preview');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleCreateCard = async () => {
    if (!recipientAddress) return;
    const giftMetadata = {
      amount,
      currency,
      message,
      occasion,
      theme: selectedTheme,
      recipient: recipientAddress,
    };

    console.log('giftMetadata: ', giftMetadata);

    try {
      const response = await fetch('/api/pinata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: giftMetadata,
          name: `gift-${Date.now()}`,
          lang: 'en',
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('pinata-response-data: ', data);
        const degiftContractAddress =
          process.env.NEXT_PUBLIC_DEGIFT_CONTRACT_ADDRESS!;
        const expiration = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 1 week from now

        // Token addresses (replace with actual addresses for your network)
        const tokenAddresses = {
          eth: ZeroAddress,
          usdc: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23', // Replace with actual USDC address
          usdt: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06', // Replace with actual USDT address
        };

        // Token decimals
        const tokenDecimals = {
          eth: 18,
          usdc: 6,
          usdt: 6,
        };

        const tokenAddress =
          tokenAddresses[currency as keyof typeof tokenAddresses];
        const decimals = tokenDecimals[currency as keyof typeof tokenDecimals];

        // Calculate value based on currency
        const value =
          currency === 'eth'
            ? parseEther(amount)
            : parseUnits(amount, decimals);

        const calls = [
          {
            address: degiftContractAddress,
            abi: DeGift_ABI,
            functionName: 'createGift',
            args: [
              recipientAddress, // Recipient address
              value, // Gift amount (in wei or token units)
              tokenAddress, // Token address (ZeroAddress for ETH)
              data.cid, // Metadata CID from Pinata
              expiration, // Expiration timestamp
            ],
            // Only include value for ETH transfers
            ...(currency === 'eth'
              ? {
                  value: value,
                }
              : {}),
          },
        ];
        console.log('call:', calls);
        console.log('Gift metadata stored with CID:', data.cid);
        return calls;
      }
    } catch (error) {
      console.error('Error creating gift card:', error);
    }
  };

  const getStepStatus = (step: string) => {
    switch (step) {
      case 'details':
        return isDetailsValid
          ? 'complete'
          : isAmountTouched
            ? 'error'
            : 'pending';
      case 'message':
        return isMessageValid
          ? 'complete'
          : isMessageTouched
            ? 'error'
            : 'pending';
      case 'preview':
        return canProceed ? 'complete' : 'pending';
      default:
        return 'pending';
    }
  };

  return (
    <div className="w-full px-4 py-8">
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <PartyPopper className="h-24 w-24 animate-bounce text-primary" />
        </div>
      )}

      <Card className="max-w-8xl relative mx-auto w-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-1 bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />

        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create a Crypto Gift Card</CardTitle>
          <CardDescription className="text-lg">
            Send cryptocurrency with a personalized message
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="h-18 grid w-full grid-cols-3">
              {['details', 'message', 'preview'].map(step => (
                <TabsTrigger
                  key={step}
                  value={step}
                  className={cn(
                    'relative h-14 data-[state=active]:shadow-none',
                    getStepStatus(step) === 'complete' && 'text-primary',
                    getStepStatus(step) === 'error' && 'text-destructive',
                  )}
                  disabled={
                    (step === 'message' && !isDetailsValid) ||
                    (step === 'preview' && !isMessageValid)
                  }
                >
                  {getStepStatus(step) === 'complete' && (
                    <Check className="absolute right-2 h-4 w-4 text-primary" />
                  )}
                  {step === 'details' && '1. Gift Details'}
                  {step === 'message' && '2. Message'}
                  {step === 'preview' && '3. Preview'}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-h-[400px]">
              <TabsContent value="details">
                <GiftCardDetails
                  amount={amount}
                  setAmount={setAmount}
                  isAmountTouched={isAmountTouched}
                  setIsAmountTouched={setIsAmountTouched}
                  // Currency props
                  currency={currency}
                  setCurrency={setCurrency}
                  // Occasion props
                  occasion={occasion}
                  setOccasion={setOccasion}
                  // Theme props
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  availableThemes={availableThemes}
                  setPreviewTheme={setPreviewTheme}
                  setShowPreview={setShowPreview}
                  // Recipient props
                  recipient={recipient}
                  setRecipient={setRecipient}
                  recipientAddress={recipientAddress}
                  setRecipientAddress={setRecipientAddress}
                  isRecipientTouched={isRecipientTouched}
                  setIsRecipientTouched={setIsRecipientTouched}
                  isRecipientValid={!!recipientAddress}
                  recipientError={recipientError}
                  setRecipientError={setRecipientError}
                  // Form props
                  isValid={isDetailsValid}
                  onNext={handleNext}
                />
              </TabsContent>

              <TabsContent value="message">
                <GiftMessage
                  message={message}
                  setMessage={setMessage}
                  generating={generating}
                  messageScore={messageScore}
                  onGenerate={generateMessage}
                  onNext={handleNext}
                  isValid={isMessageValid}
                  isMessageTouched={isMessageTouched}
                  setIsMessageTouched={setIsMessageTouched}
                />
              </TabsContent>

              <TabsContent value="preview">
                <GiftPreview
                  amount={amount}
                  currency={currency}
                  message={message}
                  theme={selectedTheme}
                  onCreateCard={handleCreateCard}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {showPreview && selectedTheme && (
        <ThemePreviewModal
          theme={previewTheme!} // Use previewTheme instead of selectedTheme
          onClose={() => {
            setShowPreview(false);
            setPreviewTheme(null);
          }}
        />
      )}
    </div>
  );
}

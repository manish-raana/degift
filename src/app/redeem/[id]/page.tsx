"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { GiftTheme, defaultTheme } from "@/lib/themes";

export default function RedeemGift({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [giftTheme, setGiftTheme] = useState<GiftTheme>(defaultTheme);
  
  // Mock gift data - would be fetched from API/blockchain
  const gift = {
    amount: "0.1",
    currency: "ETH",
    sender: "0x1234...5678",
    message: "🎉 Happy birthday! Enjoy your crypto gift!",
    occasion: "birthday",
    theme: {
      id: "birthday-party",
      name: "Birthday Party",
      description: "Colorful and festive birthday theme",
      background: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
      borderColor: "border-purple-300",
      textColor: "text-white",
      accentColor: "bg-yellow-400",
      icon: "🎂"
    }
  };

  useEffect(() => {
    // In a real app, we would fetch the gift data and theme from the API
    setGiftTheme(gift.theme);
  }, []);

  const handleRedeem = async () => {
    setLoading(true);
    // TODO: Implement redemption logic with smart contract
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className={cn(
        "w-full max-w-md transition-all duration-500",
        giftTheme.background,
        giftTheme.borderColor,
        "border-2"
      )}>
        <CardHeader className={cn("text-center", giftTheme.textColor)}>
          <CardTitle>Redeem Your Gift</CardTitle>
          <CardDescription className={cn("opacity-80")}>
            Connect your wallet to claim your crypto gift
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={cn(
            "rounded-lg border p-6",
            giftTheme.borderColor,
            "bg-black/10"
          )}>
            <div className={cn(
              "flex items-center justify-center gap-2 mb-4",
              giftTheme.textColor
            )}>
              <span className="text-2xl">{giftTheme.icon}</span>
              <span className="font-semibold">Crypto Gift Card</span>
            </div>
            <div className={cn("space-y-4", giftTheme.textColor)}>
              <div className="text-center">
                <div className="text-sm opacity-80">Amount</div>
                <div className="text-3xl font-bold">{gift.amount} {gift.currency}</div>
              </div>
              <div>
                <div className="text-sm opacity-80 text-center">From</div>
                <div className="text-sm text-center">{gift.sender}</div>
              </div>
              <div>
                <div className="text-sm opacity-80 text-center">Message</div>
                <div className="text-lg text-center leading-relaxed">{gift.message}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              className={cn(
                "w-full",
                giftTheme.accentColor,
                giftTheme.textColor,
                "hover:opacity-90 transition-opacity"
              )} 
              size="lg"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
            <Button 
              className="w-full" 
              size="lg" 
              variant="secondary"
              disabled={loading}
              onClick={handleRedeem}
            >
              <Gift className="mr-2 h-5 w-5" />
              {loading ? "Redeeming..." : "Redeem Gift"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Gift, Sparkles, ArrowRight, Loader2, Check, PartyPopper, Star, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { GiftTheme, getThemesByOccasion } from "@/lib/themes";

export default function CreateGift() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [occasion, setOccasion] = useState("birthday");
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [currency, setCurrency] = useState("eth");
  const [isAmountTouched, setIsAmountTouched] = useState(false);
  const [isMessageTouched, setIsMessageTouched] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [messageScore, setMessageScore] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<GiftTheme | null>(null);
  const [availableThemes, setAvailableThemes] = useState<GiftTheme[]>([]);

  useEffect(() => {
    const themes = getThemesByOccasion(occasion);
    setAvailableThemes(themes);
    setSelectedTheme(themes[0]);
  }, [occasion]);

  const calculateProgress = () => {
    let newProgress = 0;
    if (isDetailsValid) newProgress += 33;
    if (isMessageValid) newProgress += 33;
    if (canProceed) newProgress += 34;
    setProgress(newProgress);
  };

  useEffect(() => {
    const timeoutId = setTimeout(calculateProgress, 100);
    return () => clearTimeout(timeoutId);
  }, [amount, message]);

  const generateMessage = async () => {
    setGenerating(true);
    setIsMessageTouched(true);
    
    const finalMessage = "🎉 Happy birthday! I'm sending you some crypto to celebrate your special day. May this digital gift bring you joy and prosperity. Enjoy!";
    let currentMessage = "";
    
    for (let i = 0; i < finalMessage.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      currentMessage += finalMessage[i];
      if (i % 3 === 0 || i === finalMessage.length - 1) {
        setMessage(currentMessage);
      }
    }
    
    setGenerating(false);
    setMessageScore(95);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const isDetailsValid = amount !== "" && parseFloat(amount) > 0 && selectedTheme !== null;
  const isMessageValid = message.length >= 10;
  const canProceed = isDetailsValid && isMessageValid;

  const handleNext = () => {
    if (activeTab === "details" && isDetailsValid) {
      setActiveTab("message");
    } else if (activeTab === "message" && isMessageValid) {
      setActiveTab("preview");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getStepStatus = (step: string) => {
    switch (step) {
      case "details":
        return isDetailsValid ? "complete" : isAmountTouched ? "error" : "pending";
      case "message":
        return isMessageValid ? "complete" : isMessageTouched ? "error" : "pending";
      case "preview":
        return canProceed ? "complete" : "pending";
      default:
        return "pending";
    }
  };

  const getMessageFeedback = () => {
    if (!message) return null;
    if (message.length < 10) return "Keep going! Add more personal touch";
    if (message.length < 50) return "Good! Your message is clear and concise";
    return "Excellent! Your message is thoughtful and personal";
  };

  return (
    <div className="py-8 px-4 w-full border border-blue-500">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <PartyPopper className="w-24 h-24 text-primary animate-bounce" />
          </div>
        </div>
      )}
      
      <Card className="w-full max-w-8xl mx-auto relative overflow-hidden border border-red-500">
        <div 
          className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create a Crypto Gift Card</CardTitle>
          <CardDescription className="text-lg">
            Send cryptocurrency with a personalized message
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-14">
              {["details", "message", "preview"].map((step) => (
                <TabsTrigger
                  key={step}
                  value={step}
                  className={cn(
                    "relative h-14 data-[state=active]:shadow-none",
                    getStepStatus(step) === "complete" && "text-primary",
                    getStepStatus(step) === "error" && "text-destructive"
                  )}
                  disabled={
                    (step === "message" && !isDetailsValid) ||
                    (step === "preview" && !isMessageValid)
                  }
                >
                  {getStepStatus(step) === "complete" && (
                    <Check className="absolute right-2 h-4 w-4 text-primary" />
                  )}
                  {step === "details" && "1. Gift Details"}
                  {step === "message" && "2. Message"}
                  {step === "preview" && "3. Preview"}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-h-[400px]">
              <TabsContent value="details" className="space-y-6 mt-0">
                <div className="grid gap-6 max-w-3xl mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="amount"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onBlur={() => setIsAmountTouched(true)}
                        type="number"
                        step="0.01"
                        min="0"
                        className={cn(
                          "text-lg",
                          isAmountTouched && !isDetailsValid && "border-destructive",
                          isDetailsValid && "border-primary"
                        )}
                      />
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-32 rounded-md border bg-background px-3"
                      >
                        <option value="eth">ETH</option>
                        <option value="usdc">USDC</option>
                        <option value="usdt">USDT</option>
                      </select>
                    </div>
                    {isAmountTouched && !isDetailsValid && (
                      <p className="text-sm text-destructive mt-1">
                        Please enter a valid amount
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occasion">Occasion</Label>
                    <select
                      id="occasion"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full rounded-md border bg-background px-3 py-2"
                    >
                      <option value="birthday">🎂 Birthday</option>
                      <option value="valentine">❤️ Valentine&apos;s Day</option>
                      <option value="christmas">🎄 Christmas</option>
                      <option value="graduation">🎓 Graduation</option>
                      <option value="wedding">💒 Wedding</option>
                      <option value="other">🎁 Other</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 text-base font-medium text-muted-foreground">
                      <Palette className="h-4 w-4" />
                      Choose Your Perfect Theme
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableThemes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme)}
                          className={cn(
                            "group relative rounded-lg overflow-hidden transition-all duration-300",
                            "border hover:scale-102 hover:-translate-y-0.5",
                            selectedTheme?.id === theme.id 
                              ? "ring-2 ring-primary scale-102 -translate-y-0.5 shadow-lg" 
                              : "hover:ring-2 hover:ring-primary/50 hover:shadow-md",
                            "focus:outline-none focus:ring-2 focus:ring-primary"
                          )}
                        >
                          <div className={cn(
                            "aspect-[3/4] p-2",
                            theme.background,
                            "transition-transform duration-300 group-hover:scale-105"
                          )}>
                            <div className={cn(
                              "h-full rounded-md border backdrop-blur-sm",
                              theme.borderColor,
                              theme.textColor,
                              "bg-black/5 dark:bg-white/5",
                              "flex flex-col items-center justify-between p-3",
                              "transition-all duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/10"
                            )}>
                              <div className="space-y-2 text-center">
                                <span className="text-2xl transition-transform duration-300 group-hover:scale-110 inline-block">
                                  {theme.icon}
                                </span>
                                <div>
                                  <h3 className="font-medium text-sm leading-tight mb-0.5">
                                    {theme.name}
                                  </h3>
                                  <p className="text-xs opacity-80 leading-tight">
                                    {theme.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="w-full mt-2">
                                <div className={cn(
                                  "text-center py-1.5 px-2 rounded",
                                  "bg-black/10 dark:bg-white/10",
                                  "transition-colors duration-300",
                                  "group-hover:bg-black/20 dark:group-hover:bg-white/20"
                                )}>
                                  <div className="text-[10px] uppercase tracking-wider opacity-80 font-medium">Preview</div>
                                  <div className="text-xs font-medium truncate">Gift Card</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className={cn(
                      "w-full mt-4",
                      isDetailsValid && "animate-pulse"
                    )}
                    size="lg"
                    onClick={handleNext}
                    disabled={!isDetailsValid}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="message" className="space-y-6 mt-0">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex justify-center">
                    <Button 
                      onClick={generateMessage} 
                      disabled={generating}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {generating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      {generating ? "Generating..." : "Generate AI Message"}
                    </Button>
                  </div>
                  
                  {messageScore > 0 && (
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">
                        AI Message Quality Score: {messageScore}%
                      </span>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message or generate one with AI"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={() => setIsMessageTouched(true)}
                      rows={4}
                      className={cn(
                        "text-lg resize-none",
                        isMessageTouched && !isMessageValid && "border-destructive",
                        isMessageValid && "border-primary"
                      )}
                    />
                    <div className="flex justify-between items-center">
                      <p className={cn(
                        "text-sm",
                        message ? (isMessageValid ? "text-primary" : "text-destructive") : "text-muted-foreground"
                      )}>
                        {getMessageFeedback()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {message.length} characters
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    className={cn(
                      "w-full",
                      isMessageValid && "animate-pulse"
                    )}
                    size="lg"
                    onClick={handleNext}
                    disabled={!isMessageValid}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6 mt-0">
                <div className="max-w-3xl mx-auto">
                  <Card className={cn(
                    "border-2",
                    selectedTheme?.background,
                    selectedTheme?.borderColor,
                    "transition-all duration-500"
                  )}>
                    <CardContent className="p-6">
                      <div className={cn(
                        "rounded-lg border p-6",
                        selectedTheme?.borderColor,
                        selectedTheme?.textColor,
                        "bg-black/10"
                      )}>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-2xl">{selectedTheme?.icon}</span>
                          <span className="font-semibold">Crypto Gift Card</span>
                        </div>
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="text-sm opacity-80">Amount</div>
                            <div className="text-3xl font-bold">
                              {amount} {currency.toUpperCase()}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm opacity-80 text-center">Message</div>
                            <div className="text-lg text-center leading-relaxed">{message}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Button 
                    className={cn(
                      "w-full mt-6",
                      canProceed && "animate-pulse"
                    )}
                    size="lg" 
                    disabled={!canProceed}
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Create Gift Card
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
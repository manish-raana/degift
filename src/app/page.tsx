import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Wallet } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-full">
      <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
          <div className="flex items-center rounded-2xl bg-muted px-4 py-1 text-sm font-medium">
            <Sparkles className="mr-1 h-4 w-4" />
            AI-Powered Crypto Gift Cards
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Send Crypto Gifts with
            <br className="hidden sm:inline" />
            Personalized AI Messages
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Create beautiful crypto gift cards with AI-generated messages. Perfect for birthdays,
            holidays, or any special occasion. Secure, instant, and memorable.
          </p>
          <div className="space-x-4">
            <Link href="/create">
              <Button size="lg" className="px-8">
                <Gift className="mr-2 h-5 w-5" />
                Create Gift
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8">
                <Wallet className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Gift className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Easy Gifting</h3>
                <p className="text-sm text-muted-foreground">
                  Send crypto gifts in just a few clicks with a beautiful, personalized message.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Sparkles className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Let AI help you craft the perfect message for any occasion.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Wallet className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Secure & Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Built on blockchain technology for secure and instant transfers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
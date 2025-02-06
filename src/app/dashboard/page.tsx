"use client";

import { MagicCard } from "@/components/magic-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Send, Download } from "lucide-react";

export default function Dashboard() {
  const sentGifts = [
    { id: 1, amount: "0.1", currency: "ETH", recipient: "0x1234...5678", status: "claimed", date: "2024-03-20" },
    { id: 2, amount: "50", currency: "USDC", recipient: "0x8765...4321", status: "pending", date: "2024-03-19" },
  ];

  const receivedGifts = [
    { id: 3, amount: "0.05", currency: "ETH", sender: "0x9876...5432", status: "received", date: "2024-03-18" },
  ];

  return (
    <div className="container flex justify-center py-8">
      <div className="w-full max-w-8xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Gift Dashboard</CardTitle>
            <CardDescription>
              Manage your sent and received crypto gifts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sent" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sent">
                  <Send className="mr-2 h-4 w-4" />
                  Sent
                </TabsTrigger>
                <TabsTrigger value="received">
                  <Download className="mr-2 h-4 w-4" />
                  Received
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sent">
                <div className="space-y-4">
                  {sentGifts.map((gift) => (
                    <MagicCard key={gift.id} className="cursor-pointer">
                     
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <Gift className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-semibold">{gift.amount} {gift.currency}</p>
                            <p className="text-sm text-muted-foreground">To: {gift.recipient}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium capitalize">{gift.status}</p>
                          <p className="text-sm text-muted-foreground">{gift.date}</p>
                        </div>
                      </CardContent>
                    
                    </MagicCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="received">
                <div className="space-y-4">
                  {receivedGifts.map((gift) => (
                    <Card key={gift.id}>
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <Gift className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-semibold">{gift.amount} {gift.currency}</p>
                            <p className="text-sm text-muted-foreground">From: {gift.sender}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium capitalize">{gift.status}</p>
                          <p className="text-sm text-muted-foreground">{gift.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
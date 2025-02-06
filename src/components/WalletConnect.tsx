"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function WalletConnect() {
  // TODO: Implement actual wallet connection logic with wagmi
  return (
    <Button variant="outline" size="sm">
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
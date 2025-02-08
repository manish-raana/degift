import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Twitter,
  Facebook,
  Link as LinkIcon,
  Check,
  Share2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface ShareGiftCardProps {
  giftId: string;
  occasion: string;
}

export function ShareGiftCard({ giftId, occasion }: ShareGiftCardProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/gift/${giftId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: 'Link copied!',
        description: 'The gift card link has been copied to your clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err: any) {
      toast({
        title: 'Failed to copy',
        description: 'Please try copying the link manually.',
        variant: 'destructive',
      });
    }
  };

  const shareOnTwitter = () => {
    const text = `Check out this crypto gift card I created for ${occasion}! 🎁✨`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog key={'share-dialog'}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Gift Card</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input value={shareUrl} readOnly />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <LinkIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={shareOnTwitter}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={shareOnFacebook}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

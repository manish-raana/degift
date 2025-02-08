import { useState, useEffect } from 'react';
import { GiftMetadata } from '@/types/gift';

export function useGiftMetadata(metadataURI: string) {
  const [metadata, setMetadata] = useState<GiftMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/pinata?cid=${metadataURI}`);
        const data = await response.json();
        if (data.success) {
          setMetadata(data.data);
        } else {
          setError('Failed to fetch metadata');
        }
      } catch (err) {
        setError('Failed to fetch metadata');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (metadataURI) {
      fetchMetadata();
    }
  }, [metadataURI]);

  return { metadata, isLoading, error };
}

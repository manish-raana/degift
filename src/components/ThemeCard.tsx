import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GiftTheme } from '@/lib/themes';

interface ThemeCardProps {
  theme: GiftTheme;
  isSelected: boolean;
  onSelect: (theme: GiftTheme) => void;
  onPreview: (theme: GiftTheme) => void;
}

export function ThemeCard({
  theme,
  isSelected,
  onSelect,
  onPreview,
}: ThemeCardProps) {
  return (
    <div
      onClick={() => onSelect(theme)}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300',
        isSelected && 'ring-2 ring-primary',
      )}
    >
      <div
        style={{
          background: theme.background,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className={cn(
          'relative h-full w-full rounded-xl p-4',
          theme.borderColor,
          'border-2',
          'transition-transform duration-300 hover:scale-105',
          'before:absolute before:inset-0 before:rounded-xl before:bg-black/20',
        )}
      >
        <div
          className={cn(
            'relative z-10 space-y-2 text-center',
            theme.textColor,
            'drop-shadow-md',
          )}
        >
          <span className="inline-block text-2xl transition-transform duration-300 group-hover:scale-110">
            {theme.icon}
          </span>
          <div>
            <h3 className="mb-0.5 text-sm font-medium leading-tight">
              {theme.name}
            </h3>
            <p className="text-xs leading-tight opacity-90">
              {theme.description}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          className={cn(
            'relative z-10 mt-2 w-full',
            'bg-white/20 hover:bg-white/30',
            'font-medium text-white',
            'backdrop-blur-sm',
          )}
          onClick={e => {
            e.stopPropagation();
            onPreview(theme); // Pass the current theme, not the selected one
          }}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}

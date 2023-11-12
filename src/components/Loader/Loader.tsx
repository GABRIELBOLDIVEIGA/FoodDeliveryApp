import { Loader as LoaderIcon } from 'lucide-react';
import { cn } from 'src/lib/utils';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("flex justify-center", className)}>
      <LoaderIcon className="animate-spin" />
    </div>
  );
};

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Alert className="max-w-md bg-gradient-secondary border-destructive/20">
        <AlertCircle className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-center">
          {message}
        </AlertDescription>
      </Alert>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="hover:shadow-glow transition-shadow"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};
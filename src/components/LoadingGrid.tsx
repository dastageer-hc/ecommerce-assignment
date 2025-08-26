import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden border-0 bg-gradient-secondary shadow-card">
          {/* Image Skeleton */}
          <div className="aspect-square p-4">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          
          <CardContent className="p-4">
            {/* Title Skeleton */}
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-3" />
            
            {/* Rating Skeleton */}
            <div className="flex items-center space-x-1 mb-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
            
            {/* Price Skeleton */}
            <Skeleton className="h-6 w-20" />
          </CardContent>
          
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
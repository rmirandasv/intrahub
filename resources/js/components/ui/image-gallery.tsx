import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { Button } from './button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  className?: string;
  maxHeight?: string;
  showFullScreen?: boolean;
}

export function ImageGallery({ images, className, maxHeight = 'h-64', showFullScreen = true }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    if (showFullScreen) {
      setSelectedImageIndex(index);
      setIsFullScreenOpen(true);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const renderImageLayout = () => {
    const imageCount = images.length;

    if (imageCount === 1) {
      return (
        <div className={cn('relative overflow-hidden rounded-lg', maxHeight)}>
          <img
            src={images[0]}
            alt=""
            className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
            onClick={() => handleImageClick(0)}
          />
        </div>
      );
    }

    if (imageCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <div key={index} className={cn('relative overflow-hidden rounded-lg', maxHeight)}>
              <img
                src={image}
                alt=""
                className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </div>
      );
    }

    if (imageCount === 3) {
      return (
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 row-span-2">
            <div className={cn('relative overflow-hidden rounded-lg', maxHeight)}>
              <img
                src={images[0]}
                alt=""
                className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                onClick={() => handleImageClick(0)}
              />
            </div>
          </div>
          {images.slice(1).map((image, index) => (
            <div key={index + 1} className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt=""
                className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                onClick={() => handleImageClick(index + 1)}
              />
            </div>
          ))}
        </div>
      );
    }

    if (imageCount === 4) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt=""
                className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </div>
      );
    }

    // 5 or more images
    return (
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className={cn('relative overflow-hidden rounded-lg', index === 0 ? 'col-span-2 row-span-2' : '')}>
            <img
              src={image}
              alt=""
              className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
              onClick={() => handleImageClick(index)}
            />
            {index === 3 && images.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-white font-semibold text-lg">+{images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={cn('w-full', className)}>
        {renderImageLayout()}
      </div>

      {showFullScreen && (
        <Dialog open={isFullScreenOpen} onOpenChange={setIsFullScreenOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95 border-0">
            <div className="relative h-full">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setIsFullScreenOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="relative h-full flex items-center justify-center">
                <img
                  src={images[selectedImageIndex]}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 text-white hover:bg-white/20"
                      onClick={previousImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 text-white hover:bg-white/20"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex space-x-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            className={cn(
                              'w-2 h-2 rounded-full transition-colors',
                              index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                            )}
                            onClick={() => setSelectedImageIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
} 
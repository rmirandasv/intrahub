import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AlertCircle, Clock, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Announcement } from '@/types';

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={announcement.user.name || '/placeholder.svg'} />
              <AvatarFallback>
                {announcement.user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{announcement.user.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {announcement.user.is_staff ? 'Staff' : 'User'}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {announcement.created_at}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Category</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">{announcement.title}</h3>
          <p className="leading-relaxed text-muted-foreground">{announcement.content}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
            <Heart className="mr-1 h-4 w-4" />
            {1}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-1 h-4 w-4" />
            {2}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

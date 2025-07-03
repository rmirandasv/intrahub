import { AnnouncementCard } from '@/components/announcement-card';
import { BenefitCard } from '@/components/benefit-card';
import { EventCard } from '@/components/event-card';
import { Benefit, Event, Post } from '@/types';

interface PostCardProps {
  post: Post;
  onDelete?: (post: Post) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const handleBenefitDelete = (benefit: Benefit) => {
    if (onDelete) {
      onDelete(benefit.post);
    }
  };

  const handleEventDelete = (event: Event) => {
    if (onDelete) {
      onDelete(event.post);
    }
  };

  switch (post.post_type) {
    case 'announcement':
      return <AnnouncementCard announcement={post} onDelete={onDelete} />;
    case 'benefit':
      const benefit = (post as any).benefit;
      if (benefit) {
        return <BenefitCard benefit={benefit} onDelete={handleBenefitDelete} />;
      }
      return <div>Benefit data not available</div>;
    case 'event':
      const event = (post as any).event;
      if (event) {
        return <EventCard event={event} onDelete={handleEventDelete} />;
      }
      return <div>Event data not available</div>;
    default:
      return <div>Unknown post type</div>;
  }
}

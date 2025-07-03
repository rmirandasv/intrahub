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
      if (post.benefit) {
        return <BenefitCard benefit={post.benefit} onDelete={handleBenefitDelete} />;
      }
      return <div>Benefit data not available</div>;
    case 'event':
      if (post.event) {
        return <EventCard event={post.event} onDelete={handleEventDelete} />;
      }
      return <div>Event data not available</div>;
    default:
      return <div>Unknown post type</div>;
  }
}

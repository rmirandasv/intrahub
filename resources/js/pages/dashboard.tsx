import Heading from '@/components/heading';
import { PostCard } from '@/components/post-card';
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Paginated, Post, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard({ posts }: { posts: Paginated<Post> }) {
  // Group posts by type for better organization
  const announcements = posts.data.filter((post) => post.post_type === 'announcement');
  const benefits = posts.data.filter((post) => post.post_type === 'benefit');
  const events = posts.data.filter((post) => post.post_type === 'event');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <Container>
        <Heading title="Dashboard" description="Overview of all posts and activities"></Heading>

        {/* Recent Posts Section */}
        <div className="mt-8 space-y-8">
          {/* Announcements */}
          {announcements.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Recent Announcements</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {announcements.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {events.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Upcoming Events</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Available Benefits</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {posts.data.length === 0 && (
            <div className="py-12 text-center">
              <h3 className="mb-2 text-lg font-medium text-muted-foreground">No posts yet</h3>
              <p className="text-sm text-muted-foreground">Create your first announcement, event, or benefit to get started.</p>
            </div>
          )}
        </div>
      </Container>
    </AppLayout>
  );
}

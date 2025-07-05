import Heading from '@/components/heading';
import SendInvitationModal from "@/components/send-invitation-modal";
import Container from '@/components/ui/container';
import AppLayout from '@/layouts/app-layout';
import { Paginated, User } from '@/types';

export default function UsersIndex({ users }: { users: Paginated<User> }) {
  return (
    <AppLayout breadcrumbs={[{ title: 'Users', href: route('users.index') }]}>
      <Container>
        <Heading title="Users" description="Manage registered users and invite new ones">
          <SendInvitationModal /> 
        </Heading>
      </Container>
    </AppLayout>
  );
}

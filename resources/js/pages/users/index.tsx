import ChangeUserRoleModal from '@/components/change-user-role-modal';
import Heading from '@/components/heading';
import SendInvitationModal from '@/components/send-invitation-modal';
import Container from '@/components/ui/container';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { UserCard } from '@/components/user-card';
import { UserDeleteModal } from '@/components/user-delete-modal';
import { UserTable } from '@/components/user-table';
import AppLayout from '@/layouts/app-layout';
import { Paginated, User } from '@/types';
import { Grid3X3, List, Users } from 'lucide-react';
import { useState } from 'react';

export default function UsersIndex({ users }: { users: Paginated<User> }) {
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToChangeRole, setUserToChangeRole] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleRoleChangeClick = (user: User) => {
    setUserToChangeRole(user);
    setIsRoleModalOpen(true);
  };

  const handleCloseRoleModal = () => {
    setIsRoleModalOpen(false);
    setUserToChangeRole(null);
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Users', href: route('users.index') }]}>
      <Container>
        <Heading title="Users" description="Manage registered users and invite new ones">
          <div className="flex items-center gap-4">
            <SendInvitationModal />
            {users.data.length > 0 && (
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'cards' | 'table')}>
                <ToggleGroupItem value="cards" aria-label="Toggle cards view">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Toggle table view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>
        </Heading>

        {users.data.length === 0 ? (
          <div className="mt-8 text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground/50">
              <Users className="h-12 w-12" />
            </div>
            <h3 className="font-semibol mt-2 text-sm">No users</h3>
            <p className="mt-1 text-sm text-foreground">Get started by inviting new users to the platform.</p>
            <div className="mt-6">
              <SendInvitationModal triggerText="Invite First User" />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            {viewMode === 'cards' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.data.map((user) => (
                  <UserCard key={user.id} user={user} onDelete={handleDeleteClick} onRoleChange={handleRoleChangeClick} />
                ))}
              </div>
            ) : (
              <UserTable users={users.data} onDelete={handleDeleteClick} onRoleChange={handleRoleChangeClick} />
            )}
          </div>
        )}
      </Container>

      <UserDeleteModal user={userToDelete} isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />

      {userToChangeRole && <ChangeUserRoleModal user={userToChangeRole} isOpen={isRoleModalOpen} onOpenChange={handleCloseRoleModal} />}
    </AppLayout>
  );
}

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  is_staff: z.boolean(),
});

export type ChangeUserRoleFormValues = z.infer<typeof schema>;

interface ChangeUserRoleModalProps {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangeUserRoleModal({ user, isOpen, onOpenChange }: ChangeUserRoleModalProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ChangeUserRoleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      is_staff: false,
    },
  });

  useEffect(() => {
    form.reset({
      is_staff: user.is_staff,
    });
  }, [user]);

  const handleSubmit = useCallback(async (data: ChangeUserRoleFormValues) => {
    setLoading(true);

    try {
      await router.patch(`/users/${user.id}`, data, {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: (errors) => {
          // Handle validation errors
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof ChangeUserRoleFormValues, {
              type: 'server',
              message: errors[key],
            });
          });
        },
        onFinish: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      setLoading(false);
    }
  }, [form, user.id]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Modify the role for <strong>{user.name}</strong>. Staff members have additional privileges and access to administrative features.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="is_staff"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Staff Privileges</FormLabel>
                    <div className="text-sm text-muted-foreground">Grant administrative privileges to this user</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Role'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

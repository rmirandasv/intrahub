import { Head, router, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthLayout from '@/layouts/auth-layout';
import { Invitation } from '@/types';

const schema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    password_confirmation: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match',
  });

type AcceptInvitationFormValues = z.infer<typeof schema>;

interface AcceptInvitationProps {
  invitation: Invitation;
  errors?: Record<string, string>;
}

export default function AcceptInvitation({ invitation, errors }: AcceptInvitationProps) {
    const { url } = usePage();
  const [loading, setLoading] = useState(false);

  const form = useForm<AcceptInvitationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      password: '',
      password_confirmation: '',
    },
  });

  const handleSubmit = async (data: AcceptInvitationFormValues) => {
    setLoading(true);
    
    try {
      await router.post(url, data, {
        onError: (errors) => {
          // Handle validation errors
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof AcceptInvitationFormValues, {
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
  };

  return (
    <AuthLayout 
      title="Accept Invitation" 
      description="Complete your account setup to join the platform"
    >
      <Head title="Accept Invitation" />

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome!</CardTitle>
          <CardDescription>
            You've been invited to join the platform. Please complete your account setup below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        autoFocus
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Creating Account...' : 'Accept Invitation'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

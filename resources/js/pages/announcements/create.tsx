import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, usePage } from "@inertiajs/react";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  expiration_date: z.date().nullable(),
  is_featured: z.boolean(),
});

export default function AnnouncementCreate() {
  const { errors } = usePage().props;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content: '',
      expiration_date: null,
      is_featured: false,
    },
  });
  const onSubmit = (data: z.infer<typeof schema>) => {
    router.post('/announcements', data);
  };
  useEffect(() => console.log(errors), [errors]);
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Announcements', href: '/announcements' },
        { title: 'Create Announcement', href: '/announcements/create' },
      ]}
    >
      <div className="m-4 min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Announcement</h1>
            <p className="text-muted-foreground">Add a new announcement to share important information with your team and stakeholders.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiration_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expiration Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Featured</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
}

import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type Paginated<T> = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
  to: number;
  total: number;
  links: PaginationLinks[];
  data: T[];
};

export type PaginationLinks = {
  active: boolean;
  label: string;
  url: string | null;
};

export type Auth = {
  user: User;
};

export type BreadcrumbItem = {
  title: string;
  href: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
};

export type SharedData = {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
};

export type PostType = 'announcement' | 'benefit' | 'event';

export type PostComment = {
  id: number;
  content: string;
  post_id: number;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: number;
  title: string;
  post_type: PostType;
  user: User;
  published_at: string | null;
  expiration_date: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  content: string;
  category?: Category | null;
  likes_count: number;
  is_liked: boolean;
  comments: PostComment[];
  comments_count: number;
};

export type Announcement = Post;

export type Category = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  post_count?: number;
};

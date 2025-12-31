import { createClient } from 'microcms-js-sdk';
import type { Blog, BlogListResponse } from '@/types/blog';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ一覧を取得
export const getBlogs = async (limit: number = 10): Promise<BlogListResponse> => {
  const response = await client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: { limit },
  });
  return response;
};

// ブログ詳細を取得
export const getBlogDetail = async (contentId: string): Promise<Blog> => {
  const response = await client.get<Blog>({
    endpoint: 'blogs',
    contentId,
  });
  return response;
};

// 全ブログのIDを取得（静的生成用）
export const getAllBlogIds = async (): Promise<string[]> => {
  const response = await client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: { fields: 'id', limit: 100 },
  });
  return response.contents.map((blog) => blog.id);
};

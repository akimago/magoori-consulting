import type { MetadataRoute } from 'next';
import { client } from '@/lib/microcms';
import type { BlogListResponse } from '@/types/blog';

const BASE_URL = 'https://www.magoori-consulting.jp';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog/category/case`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/category/news`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/category/column`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // ブログ記事を取得
  const response = await client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: { fields: 'id,updatedAt', limit: 100 },
  });

  const blogPages: MetadataRoute.Sitemap = response.contents.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.id}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}

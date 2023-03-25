import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IPost } from './posts.interface';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  // Mock db with entries
  private posts: Array<IPost> = [
    {
      id: 1,
      date: new Date('2023-03-21'),
      title: 'Intro to NestJS',
      body: 'This blog post is about NestJS',
      category: 'NestJS',
    },
    {
      id: 2,
      date: new Date('2023-03-22'),
      title: 'Master NestJS',
      body: 'The JavaScript Node.js Framework',
      category: 'NestJS',
    },
    {
      id: 3,
      date: new Date('2023-03-23'),
      title: 'Understanding TypeScript',
      body: 'This blog post is about TypeScript',
      category: 'TypeScript',
    },
    {
      id: 4,
      date: new Date('2023-03-24'),
      title: 'NodeJS',
      body: 'The complete guide (MVC, Rest APIs, GraphQL, Deno)',
      category: 'NodeJS',
    },
  ];

  public findAll(): Array<IPost> {
    this.logger.log('Returning all posts');
    return this.posts;
  }

  public findOne(id: number): IPost {
    const post: IPost = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    this.logger.log(`Returning post with id: ${id}`);

    return post;
  }

  public create(post: IPost): IPost {
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );

    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const maxId = Math.max(...this.posts.map((post) => post.id), 0);
    const id = maxId + 1;

    const blogPost: IPost = {
      ...post,
      id,
      date: new Date(post.date),
    };

    this.posts.push(blogPost);

    this.logger.log(`Creating new post with id: ${id}`);

    return blogPost;
  }

  public delete(id: number): void {
    const index: number = this.posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    this.logger.log(`Deleting post with id: ${id}`);

    this.posts.splice(index, 1);
  }

  public update(id: number, post: IPost): IPost {
    const index: number = this.posts.findIndex((post) => post.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    // if the title is already in use by another post
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title && item.id !== id,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const blogPost: IPost = {
      ...post,
      id,
    };

    this.posts[index] = blogPost;

    this.logger.log(`Updating post with id: ${id}`);

    return blogPost;
  }
}

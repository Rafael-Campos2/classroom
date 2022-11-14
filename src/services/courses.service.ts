import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
}

interface FindOrCreateCourseParams {
  slug: string;
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  findById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error('Course already exists');
    }

    return this.prisma.course.create({ data: { title, slug } });
  }

  async findOrCreateCourse({ slug, title }: FindOrCreateCourseParams) {
    let course = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (!course) {
      course = await this.prisma.course.create({ data: { slug, title } });
    }

    return course;
  }
}

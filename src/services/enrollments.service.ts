import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface FindByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  findByCourseAndStudentId({
    courseId,
    studentId,
  }: FindByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: { studentId, courseId, canceledAt: null },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: { canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  listAllByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId, canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  createEnrollment({ studentId, courseId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: { studentId, courseId },
    });
  }
}

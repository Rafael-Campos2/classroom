import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  findByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: { authUserId },
    });
  }

  findById(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async findOrCreateStudent(authUserId: string) {
    let student = await this.prisma.student.findUnique({
      where: { authUserId },
    });

    if (!student) {
      student = await this.prisma.student.create({ data: { authUserId } });
    }

    return student;
  }
}

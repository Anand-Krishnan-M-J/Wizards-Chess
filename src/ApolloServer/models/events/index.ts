import { Status } from '@/constants/api';
import { handleDBError } from '@/helpers/dbErrorHandler';
import { prisma } from '..';

export async function getUserEvents(userId: string) {
  try {
    if (!userId) {
      return {
        status: Status.NOK,
        error: { code: 1, description: 'UserId missing' },
      };
    }
    const userEvents = await prisma.event.findMany({
      where: {
        eventUserRole: {
          some: {
            userId: Number(userId),
          },
        },
      },
      select: {
        id: true,
        isPublicEvent: true,
        eventName: true,
        eventDescription: true,
        gameType: true,
        startDate: true,
        endDate: true,
      },
    });

    return { status: Status.OK, data: userEvents };
  } catch (error) {
    handleDBError(error);
    return {
      status: Status.NOK,
      error: { code: 0, description: 'DB error' },
    };
  } finally {
    await prisma.$disconnect();
  }
}

import { handleDBError } from '@/helpers/dbErrorHandler'
import { prisma } from '..'
import { Status } from '@/constants/api'

export async function getUserEvents(userId: number) {
    try {
        const userEvents = await prisma.event.findMany({
            where: {
                eventTeamUserRole: {
                    some: {
                        userId: userId,
                    },
                },
            },
            select: {
                id: true,
                eventName: true,
                eventDescription: true,
                gameType: true,
                startDate: true,
                endDate: true,
            },
        })
        return { status: Status.OK, data: userEvents }
    } catch (error) {
        handleDBError(error)
        return { status: Status.NOK, data: [] }
    } finally {
        await prisma.$disconnect()
    }
}

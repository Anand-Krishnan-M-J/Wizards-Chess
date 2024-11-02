const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Insert mock data into the puzzles table
  await prisma.puzzle.createMany({
    data: [
      { puzzleState: { level: 1, status: 'incomplete', time_elapsed: '00:05:30' } },
      { puzzleState: { level: 2, status: 'complete', time_elapsed: '00:07:45' } },
      { puzzleState: { level: 3, status: 'incomplete', time_elapsed: '00:03:15' } },
      { puzzleState: { level: 4, status: 'complete', time_elapsed: '00:10:22' } },
      { puzzleState: { level: 5, status: 'incomplete', time_elapsed: '00:08:12' } },
      { puzzleState: { level: 6, status: 'incomplete', time_elapsed: '00:06:18' } },
      { puzzleState: { level: 7, status: 'complete', time_elapsed: '00:04:50' } },
      { puzzleState: { level: 8, status: 'incomplete', time_elapsed: '00:07:40' } },
      { puzzleState: { level: 9, status: 'complete', time_elapsed: '00:09:30' } },
      { puzzleState: { level: 10, status: 'incomplete', time_elapsed: '00:12:05' } },
    ],
  });

  // Insert mock data into the users table
  await prisma.user.createMany({
    data: [
      { userName: 'Alice Johnson', emailId: 'alice@example.com', password: 'hashed_password_1', puzzleLevel: 1, matchesWon: 3, eventsWon: 1, score: 150 },
      { userName: 'Bob Smith', emailId: 'bob@example.com', password: 'hashed_password_2', puzzleLevel: 2, matchesWon: 5, eventsWon: 2, score: 250 },
      { userName: 'Carol King', emailId: 'carol@example.com', password: 'hashed_password_3', puzzleLevel: 3, matchesWon: 2, eventsWon: 0, score: 100 },
      { userName: 'David Brown', emailId: 'david@example.com', password: 'hashed_password_4', puzzleLevel: 4, matchesWon: 6, eventsWon: 3, score: 300 },
      { userName: 'Eve White', emailId: 'eve@example.com', password: 'hashed_password_5', puzzleLevel: 5, matchesWon: 7, eventsWon: 4, score: 350 },
      { userName: 'Frank Black', emailId: 'frank@example.com', password: 'hashed_password_6', puzzleLevel: 6, matchesWon: 8, eventsWon: 2, score: 400 },
      { userName: 'Grace Lee', emailId: 'grace@example.com', password: 'hashed_password_7', puzzleLevel: 7, matchesWon: 4, eventsWon: 1, score: 200 },
      { userName: 'Henry Adams', emailId: 'henry@example.com', password: 'hashed_password_8', puzzleLevel: 8, matchesWon: 9, eventsWon: 3, score: 450 },
      { userName: 'Ivy Green', emailId: 'ivy@example.com', password: 'hashed_password_9', puzzleLevel: 9, matchesWon: 3, eventsWon: 2, score: 180 },
      { userName: 'Jack Hill', emailId: 'jack@example.com', password: 'hashed_password_10', puzzleLevel: 10, matchesWon: 10, eventsWon: 5, score: 500 },
    ],
  });

  // Insert mock data into the events table
  await prisma.event.createMany({
    data: [
      { eventName: 'Puzzle Championship', eventDescription: 'Annual puzzle-solving championship event', gameType:'swiss' },
      { eventName: 'Speed Puzzle Challenge', eventDescription: 'Challenge to solve puzzles in the least amount of time',gameType:'swiss' },
      { eventName: 'Team Puzzle Battle', eventDescription: 'Battle of puzzle-solving skills among teams',gameType:'swiss' },
      { eventName: 'Global Puzzle Day', eventDescription: 'A day dedicated to solving puzzles across the globe',gameType:'swiss' },
      { eventName: 'Puzzle Marathon', eventDescription: 'Endurance puzzle-solving event spanning multiple hours',gameType:'swiss' },
    ],
  });

  // Insert mock data into the teams table
  await prisma.team.createMany({
    data: [
      { teamName: 'Team Alpha', eventId: 1 },
      { teamName: 'Team Beta', eventId: 1 },
      { teamName: 'Team Gamma', eventId: 2 },
      { teamName: 'Team Delta', eventId: 2 },
      { teamName: 'Team Epsilon', eventId: 3 },
      { teamName: 'Team Zeta', eventId: 3 },
      { teamName: 'Team Eta', eventId: 4 },
      { teamName: 'Team Theta', eventId: 4 },
      { teamName: 'Team Iota', eventId: 5 },
      { teamName: 'Team Kappa', eventId: 5 },
    ],
  });

  // Insert mock data into the roles table
  await prisma.role.createMany({
    data: [
      { roleName: 'organizer' },
      { roleName: 'player' },
    ],
  });

  // Insert mock data into the event_team_user_role table
  await prisma.eventTeamUserRole.createMany({
    data: [
      { eventId: 1, userId: 1, roleId: 1, teamId: 1 },  // Alice as organizer in Team Alpha for event 1
      { eventId: 1, userId: 2, roleId: 2, teamId: 1 },  // Bob as player in Team Alpha for event 1
      { eventId: 2, userId: 3, roleId: 1, teamId: 3 },  // Carol as organizer in Team Gamma for event 2
      { eventId: 2, userId: 4, roleId: 2, teamId: 3 },  // David as player in Team Gamma for event 2
      { eventId: 3, userId: 5, roleId: 1, teamId: 5 },  // Eve as organizer in Team Epsilon for event 3
      { eventId: 3, userId: 6, roleId: 2, teamId: 5 },  // Frank as player in Team Epsilon for event 3
      { eventId: 4, userId: 7, roleId: 1, teamId: 7 },  // Grace as organizer in Team Eta for event 4
      { eventId: 4, userId: 8, roleId: 2, teamId: 7 },  // Henry as player in Team Eta for event 4
      { eventId: 5, userId: 9, roleId: 1, teamId: 9 },  // Ivy as organizer in Team Iota for event 5
      { eventId: 5, userId: 10, roleId: 2, teamId: 9 }, // Jack as player in Team Iota for event 5
    ],
  });

  console.log('Data seeded successfully.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

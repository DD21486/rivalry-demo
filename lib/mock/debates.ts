import type { Debate } from "../types";

const daysAgo = (d: number, h = 12) => {
  const date = new Date();
  date.setDate(date.getDate() - d);
  date.setHours(h, 0, 0, 0);
  return date.toISOString();
};

const hoursFromNow = (h: number) => {
  const date = new Date();
  date.setHours(date.getHours() + h);
  return date.toISOString();
};

export const debates: Debate[] = [
  {
    id: "ky-vs-bama-guards",
    status: "LIVE",
    participantIds: ["u_derek", "u_mike"],
    topic: "Kentucky's backcourt is better than Alabama's",
    communityIds: ["kentucky", "alabama", "sec"],
    sourceChallengeId: "ch_derek_mike",
    spectatorCount: 1247,
    rounds: [
      {
        roundType: "OPENING",
        arguments: [
          {
            participantId: "u_derek",
            body: "Kentucky's guard room is the deepest in the SEC. Reed Sheppard is the best shooter in college basketball, and Rob Dillingham's creation ability gives Calipari two elite guards who complement each other. Alabama has Sears, but after that the drop-off is steep.",
            submittedAt: daysAgo(0, 10),
          },
          {
            participantId: "u_mike",
            body: "Mark Sears is the best guard in the SEC and it's not close. He's averaging 18 PPG in conference play with 45/40/90 splits and he's automatic in the clutch. Kentucky's guards haven't proven they can win when it matters against top-25 teams.",
            submittedAt: daysAgo(0, 10),
          },
        ],
      },
      {
        roundType: "REBUTTAL",
        arguments: [
          {
            participantId: "u_derek",
            body: "Sears is a great scorer but Kentucky's guards affect winning in more ways. Sheppard's gravity opens the floor, Dillingham's assist rate is elite, and Kentucky is 8-2 in Q1 games. Sears had one big game against Arkansas — that's not a season.",
            submittedAt: daysAgo(0, 8),
          },
          {
            participantId: "u_mike",
            body: "One game? Sears has been consistent all season. And Alabama's guard defense is top 10 nationally since January. Kentucky's backcourt gets hunted on the perimeter in big games. The Tennessee loss exposed them.",
            submittedAt: daysAgo(0, 8),
          },
        ],
      },
      {
        roundType: "CLOSING",
        arguments: [
          {
            participantId: "u_derek",
            body: "Bottom line: Kentucky has two elite guards who make everyone better. Alabama has one star and role players. Depth wins in March and Kentucky's backcourt is built for tournament basketball.",
            submittedAt: daysAgo(0, 6),
          },
        ],
      },
    ],
    bleacherComments: [
      { id: "b_ky_1", authorId: "u_bbn", body: "Sheppard is HIM. BBN knows ball.", reactionCount: 89, createdAt: daysAgo(0, 9) },
      { id: "b_ky_2", authorId: "u_tide", body: "Sears in the clutch >>> your entire backcourt", reactionCount: 67, createdAt: daysAgo(0, 9) },
      { id: "b_ky_3", authorId: "u_sarah", body: "Both of y'all wrong. Zeigler clears both.", reactionCount: 112, createdAt: daysAgo(0, 8) },
      { id: "b_ky_4", authorId: "u_cards", body: "ACC guards > SEC guards. Just saying.", reactionCount: 45, createdAt: daysAgo(0, 8) },
      { id: "b_ky_5", authorId: "u_analyst", body: "Derek's depth argument is stronger on paper. Mike needs a clutch gene counter.", reactionCount: 78, createdAt: daysAgo(0, 7) },
      { id: "b_ky_6", authorId: "u_neutral", body: "This is the best debate on Rivalry right now.", reactionCount: 56, createdAt: daysAgo(0, 7) },
      { id: "b_ky_7", authorId: "u_jake", body: "Florida's backcourt next year >>> both of these", reactionCount: 23, createdAt: daysAgo(0, 6) },
      { id: "b_ky_8", authorId: "u_orange", body: "Tennessee erasure in the bleachers too. Wild.", reactionCount: 34, createdAt: daysAgo(0, 6) },
      { id: "b_ky_9", authorId: "u_coach", body: "Auburn's guards are slept on btw", reactionCount: 19, createdAt: daysAgo(0, 5) },
      { id: "b_ky_10", authorId: "u_hog", body: "Arkansas game wasn't just Sears. Team effort.", reactionCount: 28, createdAt: daysAgo(0, 5) },
      { id: "b_ky_11", authorId: "u_fresh", body: "Dillon Mitchell > everyone here", reactionCount: 12, createdAt: daysAgo(0, 4) },
      { id: "b_ky_12", authorId: "u_vandy", body: "Nobody mentioning shooting percentages. Vandy knows.", reactionCount: 8, createdAt: daysAgo(0, 4) },
      { id: "b_ky_13", authorId: "u_dawg", body: "Georgia will have something to say next year", reactionCount: 6, createdAt: daysAgo(0, 3) },
      { id: "b_ky_14", authorId: "u_mizzou", body: "Mizzou guards underrated. That's the tweet.", reactionCount: 15, createdAt: daysAgo(0, 2) },
    ],
  },
  {
    id: "tn-vs-fl-depth",
    status: "VOTING",
    participantIds: ["u_sarah", "u_jake"],
    topic: "Tennessee has more NCAA tournament depth than Florida",
    communityIds: ["tennessee", "florida", "sec"],
    spectatorCount: 892,
    votingEndsAt: hoursFromNow(4),
    voteTotals: { u_sarah: 512, u_jake: 380 },
    rounds: [
      {
        roundType: "OPENING",
        arguments: [
          {
            participantId: "u_sarah",
            body: "Tennessee's rotation goes 10 deep with proven tournament experience. Zeigler, Knecht's role replacement, and a defense that travels. Florida relies on freshmen who haven't played a March game.",
            submittedAt: daysAgo(1, 14),
          },
          {
            participantId: "u_jake",
            body: "Florida's frontcourt is deeper than anything Tennessee has. And our freshmen are ahead of schedule — by next year this roster is a Final Four contender. Depth isn't just about this year.",
            submittedAt: daysAgo(1, 14),
          },
        ],
      },
      {
        roundType: "REBUTTAL",
        arguments: [
          {
            participantId: "u_sarah",
            body: "March is about this year. Tennessee has been to the Elite Eight twice in three years. Florida hasn't won an NCAA tournament game since 2019. Experience matters when the pressure hits.",
            submittedAt: daysAgo(1, 12),
          },
          {
            participantId: "u_jake",
            body: "Experience loses to talent. Florida's ceiling is higher and our bench production has improved every month. Tennessee's depth is role players. Ours are future stars.",
            submittedAt: daysAgo(1, 12),
          },
        ],
      },
      {
        roundType: "CLOSING",
        arguments: [
          {
            participantId: "u_sarah",
            body: "Tennessee's depth is proven in March. Florida's is projected. I'll take the team that's actually won when it matters.",
            submittedAt: daysAgo(1, 10),
          },
          {
            participantId: "u_jake",
            body: "Florida's roster is younger, more talented, and trending up. Tennessee peaked. Depth wins next year and we're building it now.",
            submittedAt: daysAgo(1, 10),
          },
        ],
      },
    ],
    bleacherComments: [
      { id: "b_tn_1", authorId: "u_orange", body: "Sarah W. Rocky Top.", reactionCount: 67, createdAt: daysAgo(1, 11) },
      { id: "b_tn_2", authorId: "u_gator", body: "Jake made good points on the frontcourt.", reactionCount: 34, createdAt: daysAgo(1, 11) },
      { id: "b_tn_3", authorId: "u_analyst", body: "Sarah's experience argument is the difference. 58-42 feels right.", reactionCount: 45, createdAt: daysAgo(1, 10) },
      { id: "b_tn_4", authorId: "u_mike", body: "Both would lose to Bama. Next.", reactionCount: 56, createdAt: daysAgo(1, 9) },
      { id: "b_tn_5", authorId: "u_derek", body: "Tennessee depth is real. Florida is a year away.", reactionCount: 28, createdAt: daysAgo(1, 9) },
      { id: "b_tn_6", authorId: "u_neutral", body: "Quality debate. Vote is close.", reactionCount: 23, createdAt: daysAgo(1, 8) },
      { id: "b_tn_7", authorId: "u_fresh", body: "58-42 to Florida is generous", reactionCount: 12, createdAt: daysAgo(1, 7) },
      { id: "b_tn_8", authorId: "u_jake", body: "Frontcourt argument was ignored. Biased crowd.", reactionCount: 19, createdAt: daysAgo(1, 6) },
      { id: "b_tn_9", authorId: "u_coach", body: "Auburn has more depth than both. Fight me.", reactionCount: 15, createdAt: daysAgo(1, 5) },
      { id: "b_tn_10", authorId: "u_hog", body: "SEC depth debate. Love to see it.", reactionCount: 8, createdAt: daysAgo(1, 4) },
      { id: "b_tn_11", authorId: "u_vandy", body: "Neutral observer: Sarah wins this.", reactionCount: 12, createdAt: daysAgo(1, 3) },
    ],
  },
  {
    id: "auburn-vs-arkansas",
    status: "UPCOMING",
    participantIds: ["u_coach", "u_hog"],
    topic: "Auburn makes the Final Four this year",
    communityIds: ["auburn", "arkansas", "sec"],
    sourceChallengeId: "ch_hog_coach",
    spectatorCount: 234,
    scheduledAt: hoursFromNow(24),
    rounds: [],
    bleacherComments: [],
  },
  {
    id: "sec-analyst-vs-ky-homer",
    status: "COMPLETED",
    participantIds: ["u_analyst", "u_homer"],
    topic: "Kentucky is a 1-seed",
    communityIds: ["kentucky", "sec"],
    spectatorCount: 567,
    completedAt: daysAgo(2, 8),
    winnerId: "u_analyst",
    voteTotals: { u_analyst: 612, u_homer: 288 },
    rounds: [
      {
        roundType: "OPENING",
        arguments: [
          { participantId: "u_homer", body: "Kentucky is a lock for a 1-seed. Sheppard is the best player in the country and we have Q1 wins. The committee will reward us.", submittedAt: daysAgo(3, 10) },
          { participantId: "u_analyst", body: "Kentucky's resume doesn't support a 1-seed. NET ranking of 14, multiple Q1 losses, and a weak road record. 3-seed is the ceiling right now.", submittedAt: daysAgo(3, 10) },
        ],
      },
      {
        roundType: "REBUTTAL",
        arguments: [
          { participantId: "u_homer", body: "Eye test says top 10. Sheppard changes everything. The committee respects Kentucky's brand.", submittedAt: daysAgo(3, 8) },
          { participantId: "u_analyst", body: "Brand doesn't override resume. Data shows 3-seed at best. Q1 losses to Tennessee and Auburn hurt. Homers ignore metrics.", submittedAt: daysAgo(3, 8) },
        ],
      },
      {
        roundType: "CLOSING",
        arguments: [
          { participantId: "u_homer", body: "Kentucky runs the table and gets a 1. Watch.", submittedAt: daysAgo(3, 6) },
          { participantId: "u_analyst", body: "Resume is what it is. 3-seed, maybe 2 with a strong finish. 1-seed is copium.", submittedAt: daysAgo(3, 6) },
        ],
      },
    ],
    bleacherComments: [
      { id: "b_sa_1", authorId: "u_derek", body: "Analyst wins. Homer was cooked.", reactionCount: 45, createdAt: daysAgo(3, 5) },
      { id: "b_sa_2", authorId: "u_bbn", body: "Homer had heart. Analyst had facts.", reactionCount: 34, createdAt: daysAgo(3, 5) },
      { id: "b_sa_3", authorId: "u_mike", body: "Kentucky fans in shambles.", reactionCount: 56, createdAt: daysAgo(3, 4) },
      { id: "b_sa_4", authorId: "u_neutral", body: "Fair 68-32. Data won.", reactionCount: 23, createdAt: daysAgo(3, 4) },
      { id: "b_sa_5", authorId: "u_homer", body: "Rematch when Kentucky gets the 1-seed.", reactionCount: 12, createdAt: daysAgo(3, 3) },
      { id: "b_sa_6", authorId: "u_tide", body: "Bama is the actual 1-seed. Both of y'all wrong.", reactionCount: 67, createdAt: daysAgo(3, 3) },
      { id: "b_sa_7", authorId: "u_sarah", body: "Tennessee is the 2. Kentucky is the 3. Simple.", reactionCount: 28, createdAt: daysAgo(3, 2) },
      { id: "b_sa_8", authorId: "u_jake", body: "Florida will pass Kentucky by March.", reactionCount: 15, createdAt: daysAgo(3, 2) },
      { id: "b_sa_9", authorId: "u_coach", body: "Auburn is ahead of Kentucky. Just saying.", reactionCount: 19, createdAt: daysAgo(3, 1) },
      { id: "b_sa_10", authorId: "u_analyst", body: "Thanks for the votes. Data over emotion.", reactionCount: 34, createdAt: daysAgo(3, 1) },
      { id: "b_sa_11", authorId: "u_cards", body: "Neither of y'all mentioned Louisville.", reactionCount: 8, createdAt: daysAgo(3, 0) },
      { id: "b_sa_12", authorId: "u_fresh", body: "Homer got destroyed lol", reactionCount: 23, createdAt: daysAgo(2, 23) },
    ],
  },
  {
    id: "bama-vs-tn-rivalry",
    status: "COMPLETED",
    participantIds: ["u_mike", "u_sarah"],
    topic: "Alabama owns the SEC this decade",
    communityIds: ["alabama", "tennessee", "sec"],
    spectatorCount: 1023,
    completedAt: daysAgo(3, 6),
    winnerId: "u_mike",
    voteTotals: { u_mike: 623, u_sarah: 400 },
    rounds: [
      {
        roundType: "OPENING",
        arguments: [
          { participantId: "u_mike", body: "Alabama has more SEC regular season titles, NCAA tournament wins, and NBA draft picks this decade than Tennessee. Oats built a powerhouse. The numbers don't lie.", submittedAt: daysAgo(4, 10) },
          { participantId: "u_sarah", body: "Tennessee has been to two Elite Eights. Alabama's tournament success is recent. Historical dominance isn't the same as decade dominance. Vols have been consistent.", submittedAt: daysAgo(4, 10) },
        ],
      },
      {
        roundType: "REBUTTAL",
        arguments: [
          { participantId: "u_mike", body: "Consistent? Tennessee hasn't won the SEC. Alabama has. We've been to the Sweet 16 four times. Tennessee's 'consistency' is early exits.", submittedAt: daysAgo(4, 8) },
          { participantId: "u_sarah", body: "Alabama was irrelevant before Oats. Tennessee has decades of tradition. One coach doesn't erase history.", submittedAt: daysAgo(4, 8) },
        ],
      },
      {
        roundType: "CLOSING",
        arguments: [
          { participantId: "u_mike", body: "This decade. Alabama. Scoreboard. 61-39.", submittedAt: daysAgo(4, 6) },
          { participantId: "u_sarah", body: "Enjoy it while Oats is there. Tennessee isn't going anywhere.", submittedAt: daysAgo(4, 6) },
        ],
      },
    ],
    bleacherComments: [
      { id: "b_bt_1", authorId: "u_tide", body: "Roll Tide. Mike W.", reactionCount: 89, createdAt: daysAgo(4, 5) },
      { id: "b_bt_2", authorId: "u_orange", body: "Sarah put up a fight. Bama fans insufferable.", reactionCount: 67, createdAt: daysAgo(4, 5) },
      { id: "b_bt_3", authorId: "u_derek", body: "Kentucky owns both of y'all historically.", reactionCount: 78, createdAt: daysAgo(4, 4) },
      { id: "b_bt_4", authorId: "u_analyst", body: "Mike's decade argument was stronger. Fair result.", reactionCount: 45, createdAt: daysAgo(4, 4) },
      { id: "b_bt_5", authorId: "u_neutral", body: "Rivalry at its best. Great debate.", reactionCount: 34, createdAt: daysAgo(4, 3) },
      { id: "b_bt_6", authorId: "u_jake", body: "Florida will own the SEC next decade.", reactionCount: 23, createdAt: daysAgo(4, 3) },
      { id: "b_bt_7", authorId: "u_coach", body: "Auburn erasure in this debate. Wild.", reactionCount: 19, createdAt: daysAgo(4, 2) },
      { id: "b_bt_8", authorId: "u_hog", body: "Arkansas has something to say.", reactionCount: 15, createdAt: daysAgo(4, 2) },
      { id: "b_bt_9", authorId: "u_mizzou", body: "Mizzou coming for all of y'all.", reactionCount: 8, createdAt: daysAgo(4, 1) },
      { id: "b_bt_10", authorId: "u_vandy", body: "Smart basketball will prevail.", reactionCount: 6, createdAt: daysAgo(4, 1) },
      { id: "b_bt_11", authorId: "u_dawg", body: "Georgia will rise.", reactionCount: 5, createdAt: daysAgo(4, 0) },
      { id: "b_bt_12", authorId: "u_cards", body: "ACC > SEC. Fight me.", reactionCount: 34, createdAt: daysAgo(3, 23) },
      { id: "b_bt_13", authorId: "u_fresh", body: "61-39 is generous to Tennessee.", reactionCount: 12, createdAt: daysAgo(3, 22) },
      { id: "b_bt_14", authorId: "u_gator", body: "Florida vs Florida State is the real rivalry.", reactionCount: 8, createdAt: daysAgo(3, 21) },
      { id: "b_bt_15", authorId: "u_bbn", body: "Kentucky is still the standard.", reactionCount: 56, createdAt: daysAgo(3, 20) },
    ],
  },
  {
    id: "cards-vs-cats",
    status: "COMPLETED",
    participantIds: ["u_cards", "u_derek"],
    topic: "Louisville has better fan passion than Kentucky",
    communityIds: ["louisville", "kentucky"],
    spectatorCount: 734,
    completedAt: daysAgo(4, 6),
    winnerId: "u_derek",
    voteTotals: { u_derek: 498, u_cards: 236 },
    rounds: [
      {
        roundType: "OPENING",
        arguments: [
          { participantId: "u_cards", body: "Louisville fans show up win or lose. YUM Center atmosphere, travel support, and 40 years of passion. Kentucky fans only care when they're winning.", submittedAt: daysAgo(5, 10) },
          { participantId: "u_derek", body: "Kentucky has the most passionate fanbase in college basketball. Rupp Arena, Big Blue Nation worldwide, and a tradition of showing up. Louisville's passion is regional.", submittedAt: daysAgo(5, 10) },
        ],
      },
      {
        roundType: "REBUTTAL",
        arguments: [
          { participantId: "u_cards", body: "Regional? Louisville fans travel better per capita. Kentucky's passion is bandwagon when Calipari wins. We've been loyal through down years.", submittedAt: daysAgo(5, 8) },
          { participantId: "u_derek", body: "Kentucky sells out every game, every year, regardless of record. BBN travels to neutral sites and fills arenas. Passion is measured in consistency and scale.", submittedAt: daysAgo(5, 8) },
        ],
      },
      {
        roundType: "CLOSING",
        arguments: [
          { participantId: "u_cards", body: "Passion isn't about scale. It's about heart. Cards fans have it.", submittedAt: daysAgo(5, 6) },
          { participantId: "u_derek", body: "Passion wins debates when backed by facts. Kentucky's attendance, viewership, and fan engagement lead the nation. 68-32.", submittedAt: daysAgo(5, 6) },
        ],
      },
    ],
    bleacherComments: [
      { id: "b_cc_1", authorId: "u_bbn", body: "Derek W. BBN.", reactionCount: 67, createdAt: daysAgo(5, 5) },
      { id: "b_cc_2", authorId: "u_cards", body: "Rematch. Cards are coming.", reactionCount: 45, createdAt: daysAgo(5, 5) },
      { id: "b_cc_3", authorId: "u_mike", body: "Both would lose to Bama passion.", reactionCount: 34, createdAt: daysAgo(5, 4) },
      { id: "b_cc_4", authorId: "u_neutral", body: "Derek's scale argument won. Fair.", reactionCount: 23, createdAt: daysAgo(5, 4) },
      { id: "b_cc_5", authorId: "u_analyst", body: "Attendance data backs Derek. 68-32 fair.", reactionCount: 28, createdAt: daysAgo(5, 3) },
      { id: "b_cc_6", authorId: "u_sarah", body: "Tennessee fans > both.", reactionCount: 19, createdAt: daysAgo(5, 3) },
      { id: "b_cc_7", authorId: "u_tide", body: "Roll Tide.", reactionCount: 15, createdAt: daysAgo(5, 2) },
      { id: "b_cc_8", authorId: "u_jake", body: "Florida fans underrated.", reactionCount: 8, createdAt: daysAgo(5, 2) },
      { id: "b_cc_9", authorId: "u_coach", body: "Auburn fans travel.", reactionCount: 6, createdAt: daysAgo(5, 1) },
      { id: "b_cc_10", authorId: "u_hog", body: "Arkansas fans are loud.", reactionCount: 5, createdAt: daysAgo(5, 0) },
    ],
  },
  {
    id: "gator-chomp-vs-orange",
    status: "COMPLETED",
    participantIds: ["u_gator", "u_orange"],
    topic: "Florida is Florida's biggest rival",
    communityIds: ["florida", "tennessee"],
    spectatorCount: 412,
    completedAt: daysAgo(5, 10),
    winnerId: "u_gator",
    voteTotals: { u_gator: 267, u_orange: 145 },
    rounds: [
      {
        roundType: "OPENING",
        arguments: [
          { participantId: "u_gator", body: "Florida vs Florida State is the defining rivalry. In-state, historical, and emotional. Tennessee is just another SEC opponent.", submittedAt: daysAgo(6, 10) },
          { participantId: "u_orange", body: "Tennessee vs Florida has produced classic games and real hatred. FSU is football. Basketball rivalry is Tennessee.", submittedAt: daysAgo(6, 10) },
        ],
      },
      {
        roundType: "REBUTTAL",
        arguments: [
          { participantId: "u_gator", body: "FSU rivalry transcends sport. Tennessee is a conference game. In-state rivals hit different.", submittedAt: daysAgo(6, 8) },
          { participantId: "u_orange", body: "Tennessee-Florida has Elite Eight history. FSU basketball isn't on Florida's radar.", submittedAt: daysAgo(6, 8) },
        ],
      },
      {
        roundType: "CLOSING",
        arguments: [
          { participantId: "u_gator", body: "In-state. Always. FSU is the rival.", submittedAt: daysAgo(6, 6) },
          { participantId: "u_orange", body: "Basketball rivalry is Tennessee. Different sport, different answer.", submittedAt: daysAgo(6, 6) },
        ],
      },
    ],
    bleacherComments: [
      { id: "b_go_1", authorId: "u_jake", body: "Gator wins. FSU is the rival.", reactionCount: 23, createdAt: daysAgo(6, 5) },
      { id: "b_go_2", authorId: "u_sarah", body: "Tennessee-Florida is real. Orange had a point.", reactionCount: 19, createdAt: daysAgo(6, 5) },
      { id: "b_go_3", authorId: "u_neutral", body: "Depends on the sport. Both valid.", reactionCount: 15, createdAt: daysAgo(6, 4) },
      { id: "b_go_4", authorId: "u_mike", body: "Neither is Bama. Next.", reactionCount: 28, createdAt: daysAgo(6, 4) },
      { id: "b_go_5", authorId: "u_derek", body: "Kentucky owns all of y'all.", reactionCount: 34, createdAt: daysAgo(6, 3) },
      { id: "b_go_6", authorId: "u_analyst", body: "Gator's in-state argument won. 65-35.", reactionCount: 12, createdAt: daysAgo(6, 3) },
      { id: "b_go_7", authorId: "u_coach", body: "Auburn-Alabama is the real rivalry.", reactionCount: 19, createdAt: daysAgo(6, 2) },
      { id: "b_go_8", authorId: "u_dawg", body: "Georgia-Florida football >>>", reactionCount: 8, createdAt: daysAgo(6, 1) },
    ],
  },
  {
    id: "mizzou-relevance",
    status: "COMPLETED",
    participantIds: ["u_mizzou", "u_analyst"],
    topic: "Mizzou belongs in the SEC conversation",
    communityIds: ["mizzou", "sec"],
    spectatorCount: 289,
    completedAt: daysAgo(6, 8),
    winnerId: "u_analyst",
    voteTotals: { u_mizzou: 98, u_analyst: 191 },
    rounds: [
      {
        roundType: "OPENING",
        arguments: [
          { participantId: "u_mizzou", body: "Missouri is top 50 in KenPom, trending up, and competitive in SEC play. We belong in the NCAA tournament conversation.", submittedAt: daysAgo(7, 10) },
          { participantId: "u_analyst", body: "Mizzou hasn't beaten a top-25 team. 'Belonging in the conversation' requires results, not potential. Bubble at best.", submittedAt: daysAgo(7, 10) },
        ],
      },
      {
        roundType: "REBUTTAL",
        arguments: [
          { participantId: "u_mizzou", body: "Schedule strength has been brutal. We're improving every month. Give us a full SEC slate.", submittedAt: daysAgo(7, 8) },
          { participantId: "u_analyst", body: "Every SEC team has a brutal schedule. Mizzou's best win is over a team ranked 45. That's not conversation-worthy.", submittedAt: daysAgo(7, 8) },
        ],
      },
      {
        roundType: "CLOSING",
        arguments: [
          { participantId: "u_mizzou", body: "We're building. The conversation will include us soon.", submittedAt: daysAgo(7, 6) },
          { participantId: "u_analyst", body: "Conversation requires proof. Mizzou isn't there yet. Data wins.", submittedAt: daysAgo(7, 6) },
        ],
      },
    ],
    bleacherComments: [
      { id: "b_mr_1", authorId: "u_neutral", body: "Analyst wins. Mizzou needs a signature win.", reactionCount: 15, createdAt: daysAgo(7, 5) },
      { id: "b_mr_2", authorId: "u_mizzou", body: "Rematch when we make the tournament.", reactionCount: 8, createdAt: daysAgo(7, 5) },
      { id: "b_mr_3", authorId: "u_sarah", body: "Mizzou is mid. Sorry.", reactionCount: 12, createdAt: daysAgo(7, 4) },
      { id: "b_mr_4", authorId: "u_derek", body: "SEC is loaded. Mizzou is 8th best.", reactionCount: 19, createdAt: daysAgo(7, 4) },
      { id: "b_mr_5", authorId: "u_hog", body: "We'll see when they come to Fayetteville.", reactionCount: 6, createdAt: daysAgo(7, 3) },
      { id: "b_mr_6", authorId: "u_analyst", body: "Thanks. Data over hope.", reactionCount: 11, createdAt: daysAgo(7, 2) },
    ],
  },
];

const allRoles = {
  user: [
    'createQuestion',
    'voteAnswer',
    'searchQuestion',
    'getMyQuestions',
    'updateQuestion',
    'deleteQuestion',
    'getAllAnswersAndVotings',
  ],

  moderator: [],

  admin: ['setConfiguration',],
};

allRoles.moderator = [...allRoles.moderator, ...allRoles.user];
allRoles.admin = [...allRoles.admin, ...allRoles.moderator];

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};

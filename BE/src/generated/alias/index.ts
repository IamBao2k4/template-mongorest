// Auto-generated main routes registry
// Generated on: 2025-07-30T09:59:37.818Z
import { FastifyInstance } from 'fastify';

import { allEntitesRouter } from './all-entites';
import { areaRouter } from './area';
import { categoriesRouter } from './categories';
import { categoryRouter } from './category';
import { chapterRouter } from './chapter';
import { commentItemRouter } from './comment-item';
import { commentsRouter } from './comments';
import { couponRouter } from './coupon';
import { courseRouter } from './course';
import { courseAddMembersRouter } from './course-add-members';
import { courseCartRouter } from './course-cart';
import { courseCategoriesRouter } from './course-categories';
import { courseDepartmentRouter } from './course-department';
import { courseDetailRouter } from './course-detail';
import { courseJobPositionRouter } from './course-job-position';
import { courseManageRouter } from './course-manage';
import { courseMemberRouter } from './course-member';
import { courseStatisticRouter } from './course-statistic';
import { courseTeamRouter } from './course-team';
import { courseUserStatisticRouter } from './course-user-statistic';
import { courseUserTenantProfileRouter } from './course-user-tenant-profile';
import { discussionRouter } from './discussion';
import { discussionPinRouter } from './discussion-pin';
import { examRouter } from './exam';
import { followRouter } from './follow';
import { followersRouter } from './followers';
import { followingRouter } from './following';
import { groupRouter } from './group';
import { groupCategoriesRouter } from './group-categories';
import { groupFieldRouter } from './group-field';
import { groupMediaRouter } from './group-media';
import { groupMemberApprovedRouter } from './group-member-approved';
import { groupMembersRouter } from './group-members';
import { groupMenuItemRouter } from './group-menu-item';
import { groupOverviewRouter } from './group-overview';
import { groupReportsRouter } from './group-reports';
import { groupSettingRouter } from './group-setting';
import { groupsJoinedRouter } from './groups-joined';
import { groupsManagingRouter } from './groups-managing';
import { groupsPinRouter } from './groups-pin';
import { groupsPublicRouter } from './groups-public';
import { learningPathRouter } from './learning-path';
import { leaveGroupRouter } from './leave-group';
import { lessonRouter } from './lesson';
import { likeRouter } from './like';
import { listingContactRouter } from './listing-contact';
import { listingTagRouter } from './listing-tag';
import { listingTagGroupRouter } from './listing-tag-group';
import { listingTweetRouter } from './listing-tweet';
import { listingTweetReportRouter } from './listing-tweet-report';
import { listingTweetSavedRouter } from './listing-tweet-saved';
import { listingUserTweetRouter } from './listing-user-tweet';
import { noteRouter } from './note';
import { orderRouter } from './order';
import { pageAiRouter } from './page-ai';
import { paymentMethodsRouter } from './payment-methods';
import { priceRuleRouter } from './price-rule';
import { priceRulesRouter } from './price-rules';
import { projectRouter } from './project';
import { questionRouter } from './question';
import { reportReasonRouter } from './report-reason';
import { requestJoinGroupRouter } from './request-join-group';
import { searchRouter } from './search';
import { shippingMethodsRouter } from './shipping-methods';
import { socialAddMemberRouter } from './social-add-member';
import { socialGroupCategoriesRouter } from './social-group-categories';
import { socialNotificationRouter } from './social-notification';
import { socialRegisterEventRouter } from './social-register-event';
import { socialSearchRouter } from './social-search';
import { socialTagRouter } from './social-tag';
import { socialUserRouter } from './social-user';
import { tenantPublicRouter } from './tenant-public';
import { tenantSettingRouter } from './tenant-setting';
import { testApiRouter } from './test-api';
import { testApiApiRouter } from './test-api-api';
import { testtApiRouter } from './testt-api';
import { transferOwnerGroupRouter } from './transfer-owner-group';
import { tweetRouter } from './tweet';
import { tweetApprovedRouter } from './tweet-approved';
import { tweetPinRouter } from './tweet-pin';
import { tweetRelativeRouter } from './tweet-relative';
import { tweetSavedRouter } from './tweet-saved';
import { tweetTypeRouter } from './tweet-type';
import { tweetsRouter } from './tweets';
import { tweetsGroupRouter } from './tweets-group';
import { tweetsGroupActivitiesRouter } from './tweets-group-activities';
import { tweetsGroupDraftRouter } from './tweets-group-draft';
import { userRouter } from './user';
import { userCollectionRouter } from './user-collection';
import { userCollectionTweetRouter } from './user-collection-tweet';
import { userCountRouter } from './user-count';
import { userLearningPathRouter } from './user-learning-path';
import { userOverviewRouter } from './user-overview';
import { userProgressRouter } from './user-progress';
import { userQuestionRouter } from './user-question';
import { userTenantRouter } from './user-tenant';
import { userTenantProfileRouter } from './user-tenant-profile';
import { userTimeLearningRouter } from './user-time-learning';
import { userTweetCommentedRouter } from './user-tweet-commented';
import { userTweetLikedRouter } from './user-tweet-liked';
import { userTweetSavedRouter } from './user-tweet-saved';
import { userTweetsRouter } from './user-tweets';

export async function registerAllGeneratedRoutes(fastify: FastifyInstance): Promise<void> {
  console.log('🔗 Registering all generated routes...');
  
  try {
    await allEntitesRouter(fastify);
    await areaRouter(fastify);
    await categoriesRouter(fastify);
    await categoryRouter(fastify);
    await chapterRouter(fastify);
    await commentItemRouter(fastify);
    await commentsRouter(fastify);
    await couponRouter(fastify);
    await courseRouter(fastify);
    await courseAddMembersRouter(fastify);
    await courseCartRouter(fastify);
    await courseCategoriesRouter(fastify);
    await courseDepartmentRouter(fastify);
    await courseDetailRouter(fastify);
    await courseJobPositionRouter(fastify);
    await courseManageRouter(fastify);
    await courseMemberRouter(fastify);
    await courseStatisticRouter(fastify);
    await courseTeamRouter(fastify);
    await courseUserStatisticRouter(fastify);
    await courseUserTenantProfileRouter(fastify);
    await discussionRouter(fastify);
    await discussionPinRouter(fastify);
    await examRouter(fastify);
    await followRouter(fastify);
    await followersRouter(fastify);
    await followingRouter(fastify);
    await groupRouter(fastify);
    await groupCategoriesRouter(fastify);
    await groupFieldRouter(fastify);
    await groupMediaRouter(fastify);
    await groupMemberApprovedRouter(fastify);
    await groupMembersRouter(fastify);
    await groupMenuItemRouter(fastify);
    await groupOverviewRouter(fastify);
    await groupReportsRouter(fastify);
    await groupSettingRouter(fastify);
    await groupsJoinedRouter(fastify);
    await groupsManagingRouter(fastify);
    await groupsPinRouter(fastify);
    await groupsPublicRouter(fastify);
    await learningPathRouter(fastify);
    await leaveGroupRouter(fastify);
    await lessonRouter(fastify);
    await likeRouter(fastify);
    await listingContactRouter(fastify);
    await listingTagRouter(fastify);
    await listingTagGroupRouter(fastify);
    await listingTweetRouter(fastify);
    await listingTweetReportRouter(fastify);
    await listingTweetSavedRouter(fastify);
    await listingUserTweetRouter(fastify);
    await noteRouter(fastify);
    await orderRouter(fastify);
    await pageAiRouter(fastify);
    await paymentMethodsRouter(fastify);
    await priceRuleRouter(fastify);
    await priceRulesRouter(fastify);
    await projectRouter(fastify);
    await questionRouter(fastify);
    await reportReasonRouter(fastify);
    await requestJoinGroupRouter(fastify);
    await searchRouter(fastify);
    await shippingMethodsRouter(fastify);
    await socialAddMemberRouter(fastify);
    await socialGroupCategoriesRouter(fastify);
    await socialNotificationRouter(fastify);
    await socialRegisterEventRouter(fastify);
    await socialSearchRouter(fastify);
    await socialTagRouter(fastify);
    await socialUserRouter(fastify);
    await tenantPublicRouter(fastify);
    await tenantSettingRouter(fastify);
    await testApiRouter(fastify);
    await testApiApiRouter(fastify);
    await testtApiRouter(fastify);
    await transferOwnerGroupRouter(fastify);
    await tweetRouter(fastify);
    await tweetApprovedRouter(fastify);
    await tweetPinRouter(fastify);
    await tweetRelativeRouter(fastify);
    await tweetSavedRouter(fastify);
    await tweetTypeRouter(fastify);
    await tweetsRouter(fastify);
    await tweetsGroupRouter(fastify);
    await tweetsGroupActivitiesRouter(fastify);
    await tweetsGroupDraftRouter(fastify);
    await userRouter(fastify);
    await userCollectionRouter(fastify);
    await userCollectionTweetRouter(fastify);
    await userCountRouter(fastify);
    await userLearningPathRouter(fastify);
    await userOverviewRouter(fastify);
    await userProgressRouter(fastify);
    await userQuestionRouter(fastify);
    await userTenantRouter(fastify);
    await userTenantProfileRouter(fastify);
    await userTimeLearningRouter(fastify);
    await userTweetCommentedRouter(fastify);
    await userTweetLikedRouter(fastify);
    await userTweetSavedRouter(fastify);
    await userTweetsRouter(fastify);
    
    console.log('✅ All generated routes registered successfully');
  } catch (error) {
    console.error('❌ Error registering routes:', error);
    throw error;
  }
}

// Individual route registration functions
export const generatedRoutes = {
  allEntites: allEntitesRouter,
  area: areaRouter,
  categories: categoriesRouter,
  category: categoryRouter,
  chapter: chapterRouter,
  commentItem: commentItemRouter,
  comments: commentsRouter,
  coupon: couponRouter,
  course: courseRouter,
  courseAddMembers: courseAddMembersRouter,
  courseCart: courseCartRouter,
  courseCategories: courseCategoriesRouter,
  courseDepartment: courseDepartmentRouter,
  courseDetail: courseDetailRouter,
  courseJobPosition: courseJobPositionRouter,
  courseManage: courseManageRouter,
  courseMember: courseMemberRouter,
  courseStatistic: courseStatisticRouter,
  courseTeam: courseTeamRouter,
  courseUserStatistic: courseUserStatisticRouter,
  courseUserTenantProfile: courseUserTenantProfileRouter,
  discussion: discussionRouter,
  discussionPin: discussionPinRouter,
  exam: examRouter,
  follow: followRouter,
  followers: followersRouter,
  following: followingRouter,
  group: groupRouter,
  groupCategories: groupCategoriesRouter,
  groupField: groupFieldRouter,
  groupMedia: groupMediaRouter,
  groupMemberApproved: groupMemberApprovedRouter,
  groupMembers: groupMembersRouter,
  groupMenuItem: groupMenuItemRouter,
  groupOverview: groupOverviewRouter,
  groupReports: groupReportsRouter,
  groupSetting: groupSettingRouter,
  groupsJoined: groupsJoinedRouter,
  groupsManaging: groupsManagingRouter,
  groupsPin: groupsPinRouter,
  groupsPublic: groupsPublicRouter,
  learningPath: learningPathRouter,
  leaveGroup: leaveGroupRouter,
  lesson: lessonRouter,
  like: likeRouter,
  listingContact: listingContactRouter,
  listingTag: listingTagRouter,
  listingTagGroup: listingTagGroupRouter,
  listingTweet: listingTweetRouter,
  listingTweetReport: listingTweetReportRouter,
  listingTweetSaved: listingTweetSavedRouter,
  listingUserTweet: listingUserTweetRouter,
  note: noteRouter,
  order: orderRouter,
  pageAi: pageAiRouter,
  paymentMethods: paymentMethodsRouter,
  priceRule: priceRuleRouter,
  priceRules: priceRulesRouter,
  project: projectRouter,
  question: questionRouter,
  reportReason: reportReasonRouter,
  requestJoinGroup: requestJoinGroupRouter,
  search: searchRouter,
  shippingMethods: shippingMethodsRouter,
  socialAddMember: socialAddMemberRouter,
  socialGroupCategories: socialGroupCategoriesRouter,
  socialNotification: socialNotificationRouter,
  socialRegisterEvent: socialRegisterEventRouter,
  socialSearch: socialSearchRouter,
  socialTag: socialTagRouter,
  socialUser: socialUserRouter,
  tenantPublic: tenantPublicRouter,
  tenantSetting: tenantSettingRouter,
  testApi: testApiRouter,
  testApiApi: testApiApiRouter,
  testtApi: testtApiRouter,
  transferOwnerGroup: transferOwnerGroupRouter,
  tweet: tweetRouter,
  tweetApproved: tweetApprovedRouter,
  tweetPin: tweetPinRouter,
  tweetRelative: tweetRelativeRouter,
  tweetSaved: tweetSavedRouter,
  tweetType: tweetTypeRouter,
  tweets: tweetsRouter,
  tweetsGroup: tweetsGroupRouter,
  tweetsGroupActivities: tweetsGroupActivitiesRouter,
  tweetsGroupDraft: tweetsGroupDraftRouter,
  user: userRouter,
  userCollection: userCollectionRouter,
  userCollectionTweet: userCollectionTweetRouter,
  userCount: userCountRouter,
  userLearningPath: userLearningPathRouter,
  userOverview: userOverviewRouter,
  userProgress: userProgressRouter,
  userQuestion: userQuestionRouter,
  userTenant: userTenantRouter,
  userTenantProfile: userTenantProfileRouter,
  userTimeLearning: userTimeLearningRouter,
  userTweetCommented: userTweetCommentedRouter,
  userTweetLiked: userTweetLikedRouter,
  userTweetSaved: userTweetSavedRouter,
  userTweets: userTweetsRouter
};

// Module information
export const moduleInfo = [
  {
    "name": "all-entites",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/all-entites/all-entites.json",
    "hasJsonFile": true
  },
  {
    "name": "area",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/area/area.json",
    "hasJsonFile": true
  },
  {
    "name": "categories",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/categories/categories.json",
    "hasJsonFile": true
  },
  {
    "name": "category",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/category/category.json",
    "hasJsonFile": true
  },
  {
    "name": "chapter",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/chapter/chapter.json",
    "hasJsonFile": true
  },
  {
    "name": "comment-item",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/comment-item/comment-item.json",
    "hasJsonFile": true
  },
  {
    "name": "comments",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/comments/comments.json",
    "hasJsonFile": true
  },
  {
    "name": "coupon",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/coupon/coupon.json",
    "hasJsonFile": true
  },
  {
    "name": "course",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course/course.json",
    "hasJsonFile": true
  },
  {
    "name": "course-add-members",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-add-members/course-add-members.json",
    "hasJsonFile": true
  },
  {
    "name": "course-cart",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-cart/course-cart.json",
    "hasJsonFile": true
  },
  {
    "name": "course-categories",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-categories/course-categories.json",
    "hasJsonFile": true
  },
  {
    "name": "course-department",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-department/course-department.json",
    "hasJsonFile": true
  },
  {
    "name": "course-detail",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-detail/course-detail.json",
    "hasJsonFile": true
  },
  {
    "name": "course-job-position",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-job-position/course-job-position.json",
    "hasJsonFile": true
  },
  {
    "name": "course-manage",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-manage/course-manage.json",
    "hasJsonFile": true
  },
  {
    "name": "course-member",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-member/upgrade-role.json",
    "hasJsonFile": true
  },
  {
    "name": "course-statistic",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-statistic/course-statistic.json",
    "hasJsonFile": true
  },
  {
    "name": "course-team",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-team/course-team.json",
    "hasJsonFile": true
  },
  {
    "name": "course-user-statistic",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-user-statistic/course-user-statistic.json",
    "hasJsonFile": true
  },
  {
    "name": "course-user-tenant-profile",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/course-user-tenant-profile/course-user-tenant-profile.json",
    "hasJsonFile": true
  },
  {
    "name": "discussion",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/discussion/discussion.json",
    "hasJsonFile": true
  },
  {
    "name": "discussion-pin",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/discussion-pin/discussion-pin.json",
    "hasJsonFile": true
  },
  {
    "name": "exam",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/exam/exam.json",
    "hasJsonFile": true
  },
  {
    "name": "follow",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/follow/follow.json",
    "hasJsonFile": true
  },
  {
    "name": "followers",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/followers/followers.json",
    "hasJsonFile": true
  },
  {
    "name": "following",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/following/following.json",
    "hasJsonFile": true
  },
  {
    "name": "group",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group/group.json",
    "hasJsonFile": true
  },
  {
    "name": "group-categories",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-categories/group-categories.json",
    "hasJsonFile": true
  },
  {
    "name": "group-field",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-field/group-field.json",
    "hasJsonFile": true
  },
  {
    "name": "group-media",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-media/group-media.json",
    "hasJsonFile": true
  },
  {
    "name": "group-member-approved",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-member-approved/group-member-approved.json",
    "hasJsonFile": true
  },
  {
    "name": "group-members",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-members/group-members.json",
    "hasJsonFile": true
  },
  {
    "name": "group-menu-item",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-menu-item/group-menu-item.json",
    "hasJsonFile": true
  },
  {
    "name": "group-overview",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-overview/group-overview.json",
    "hasJsonFile": true
  },
  {
    "name": "group-reports",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-reports/group-reports.json",
    "hasJsonFile": true
  },
  {
    "name": "group-setting",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/group-setting/group-setting.json",
    "hasJsonFile": true
  },
  {
    "name": "groups-joined",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/groups-joined/groups-joined.json",
    "hasJsonFile": true
  },
  {
    "name": "groups-managing",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/groups-managing/groups-managing.json",
    "hasJsonFile": true
  },
  {
    "name": "groups-pin",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/groups-pin/groups-pin.json",
    "hasJsonFile": true
  },
  {
    "name": "groups-public",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/groups-public/groups-public.json",
    "hasJsonFile": true
  },
  {
    "name": "learning-path",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/learning-path/learning-path.json",
    "hasJsonFile": true
  },
  {
    "name": "leave-group",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/leave-group/leave-group.json",
    "hasJsonFile": true
  },
  {
    "name": "lesson",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/lesson/lesson.json",
    "hasJsonFile": true
  },
  {
    "name": "like",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/like/like.json",
    "hasJsonFile": true
  },
  {
    "name": "listing-contact",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/listing-contact/listing-contact.json",
    "hasJsonFile": true
  },
  {
    "name": "listing-tag",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/listing-tag/listing-tag.json",
    "hasJsonFile": true
  },
  {
    "name": "listing-tag-group",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/listing-tag-group/listing-tag-group.json",
    "hasJsonFile": true
  },
  {
    "name": "listing-tweet",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/listing-tweet/listing-tweet.json",
    "hasJsonFile": true
  },
  {
    "name": "listing-tweet-report",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/listing-tweet-report/listing-tweet-report.json",
    "hasJsonFile": true
  },
  {
    "name": "listing-tweet-saved",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/listing-tweet-saved/listing-tweet-saved.json",
    "hasJsonFile": true
  },
  {
    "name": "listing-user-tweet",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/listing-user-tweet/listing-user-tweet.json",
    "hasJsonFile": true
  },
  {
    "name": "note",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/note/note.json",
    "hasJsonFile": true
  },
  {
    "name": "order",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/order/order.json",
    "hasJsonFile": true
  },
  {
    "name": "page-ai",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/page-ai/page-ai.json",
    "hasJsonFile": true
  },
  {
    "name": "payment-methods",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/payment-methods/payment-methods.json",
    "hasJsonFile": true
  },
  {
    "name": "price-rule",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/price-rule/price-rule.json",
    "hasJsonFile": true
  },
  {
    "name": "price-rules",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/price-rules/{id}.json",
    "hasJsonFile": true
  },
  {
    "name": "project",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/project/project.json",
    "hasJsonFile": true
  },
  {
    "name": "question",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/question/question.json",
    "hasJsonFile": true
  },
  {
    "name": "report-reason",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/report-reason/report-reason.json",
    "hasJsonFile": true
  },
  {
    "name": "request-join-group",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/request-join-group/request-join-group.json",
    "hasJsonFile": true
  },
  {
    "name": "search",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/search/content-course.json",
    "hasJsonFile": true
  },
  {
    "name": "shipping-methods",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/shipping-methods/shipping-methods.json",
    "hasJsonFile": true
  },
  {
    "name": "social-add-member",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/social-add-member/social-add-member.json",
    "hasJsonFile": true
  },
  {
    "name": "social-group-categories",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/social-group-categories/social-group-categories.json",
    "hasJsonFile": true
  },
  {
    "name": "social-notification",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/social-notification/social-notification.json",
    "hasJsonFile": true
  },
  {
    "name": "social-register-event",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/social-register-event/social-register-event.json",
    "hasJsonFile": true
  },
  {
    "name": "social-search",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/social-search/social-search.json",
    "hasJsonFile": true
  },
  {
    "name": "social-tag",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/social-tag/social-tag.json",
    "hasJsonFile": true
  },
  {
    "name": "social-user",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/social-user/social-user.json",
    "hasJsonFile": true
  },
  {
    "name": "tenant-public",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tenant-public/tenant-public.json",
    "hasJsonFile": true
  },
  {
    "name": "tenant-setting",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tenant-setting/tenant-setting.json",
    "hasJsonFile": true
  },
  {
    "name": "test-api",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/test-api/test-api.json",
    "hasJsonFile": true
  },
  {
    "name": "test-api-api",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/test-api-api/test-api-api.json",
    "hasJsonFile": true
  },
  {
    "name": "testt-api",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/testt-api/testt-api.json",
    "hasJsonFile": true
  },
  {
    "name": "transfer-owner-group",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/transfer-owner-group/transfer-owner-group.json",
    "hasJsonFile": true
  },
  {
    "name": "tweet",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweet/tweet.json",
    "hasJsonFile": true
  },
  {
    "name": "tweet-approved",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweet-approved/tweet-approved.json",
    "hasJsonFile": true
  },
  {
    "name": "tweet-pin",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweet-pin/tweet-pin.json",
    "hasJsonFile": true
  },
  {
    "name": "tweet-relative",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweet-relative/tweet-relative.json",
    "hasJsonFile": true
  },
  {
    "name": "tweet-saved",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweet-saved/tweet-saved.json",
    "hasJsonFile": true
  },
  {
    "name": "tweet-type",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweet-type/tweet-type.json",
    "hasJsonFile": true
  },
  {
    "name": "tweets",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweets/tweets.json",
    "hasJsonFile": true
  },
  {
    "name": "tweets-group",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweets-group/tweets-group.json",
    "hasJsonFile": true
  },
  {
    "name": "tweets-group-activities",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweets-group-activities/tweets-group-activities.json",
    "hasJsonFile": true
  },
  {
    "name": "tweets-group-draft",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/tweets-group-draft/tweets-group-draft.json",
    "hasJsonFile": true
  },
  {
    "name": "user",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user/joined.json",
    "hasJsonFile": true
  },
  {
    "name": "user-collection",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-collection/user-collection.json",
    "hasJsonFile": true
  },
  {
    "name": "user-collection-tweet",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-collection-tweet/user-collection-tweet.json",
    "hasJsonFile": true
  },
  {
    "name": "user-count",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-count/user-count.json",
    "hasJsonFile": true
  },
  {
    "name": "user-learning-path",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-learning-path/user-learning-path.json",
    "hasJsonFile": true
  },
  {
    "name": "user-overview",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-overview/user-overview.json",
    "hasJsonFile": true
  },
  {
    "name": "user-progress",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-progress/user-progress.json",
    "hasJsonFile": true
  },
  {
    "name": "user-question",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-question/user-question.json",
    "hasJsonFile": true
  },
  {
    "name": "user-tenant",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-tenant/user-tenant.json",
    "hasJsonFile": true
  },
  {
    "name": "user-tenant-profile",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-tenant-profile/user-tenant-profile.json",
    "hasJsonFile": true
  },
  {
    "name": "user-time-learning",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-time-learning/user-time-learning.json",
    "hasJsonFile": true
  },
  {
    "name": "user-tweet-commented",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-tweet-commented/user-tweet-commented.json",
    "hasJsonFile": true
  },
  {
    "name": "user-tweet-liked",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-tweet-liked/user-tweet-liked.json",
    "hasJsonFile": true
  },
  {
    "name": "user-tweet-saved",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-tweet-saved/user-tweet-saved.json",
    "hasJsonFile": true
  },
  {
    "name": "user-tweets",
    "jsonPath": "/home/thaily/code/mge-v2-2025/mongorest/json/role-settings/_v2/user-tweets/user-tweets.json",
    "hasJsonFile": true
  }
];

export const generatedModuleNames = [
  'all-entites',
  'area',
  'categories',
  'category',
  'chapter',
  'comment-item',
  'comments',
  'coupon',
  'course',
  'course-add-members',
  'course-cart',
  'course-categories',
  'course-department',
  'course-detail',
  'course-job-position',
  'course-manage',
  'course-member',
  'course-statistic',
  'course-team',
  'course-user-statistic',
  'course-user-tenant-profile',
  'discussion',
  'discussion-pin',
  'exam',
  'follow',
  'followers',
  'following',
  'group',
  'group-categories',
  'group-field',
  'group-media',
  'group-member-approved',
  'group-members',
  'group-menu-item',
  'group-overview',
  'group-reports',
  'group-setting',
  'groups-joined',
  'groups-managing',
  'groups-pin',
  'groups-public',
  'learning-path',
  'leave-group',
  'lesson',
  'like',
  'listing-contact',
  'listing-tag',
  'listing-tag-group',
  'listing-tweet',
  'listing-tweet-report',
  'listing-tweet-saved',
  'listing-user-tweet',
  'note',
  'order',
  'page-ai',
  'payment-methods',
  'price-rule',
  'price-rules',
  'project',
  'question',
  'report-reason',
  'request-join-group',
  'search',
  'shipping-methods',
  'social-add-member',
  'social-group-categories',
  'social-notification',
  'social-register-event',
  'social-search',
  'social-tag',
  'social-user',
  'tenant-public',
  'tenant-setting',
  'test-api',
  'test-api-api',
  'testt-api',
  'transfer-owner-group',
  'tweet',
  'tweet-approved',
  'tweet-pin',
  'tweet-relative',
  'tweet-saved',
  'tweet-type',
  'tweets',
  'tweets-group',
  'tweets-group-activities',
  'tweets-group-draft',
  'user',
  'user-collection',
  'user-collection-tweet',
  'user-count',
  'user-learning-path',
  'user-overview',
  'user-progress',
  'user-question',
  'user-tenant',
  'user-tenant-profile',
  'user-time-learning',
  'user-tweet-commented',
  'user-tweet-liked',
  'user-tweet-saved',
  'user-tweets'
];

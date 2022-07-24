<template>
  <div class="article-container">
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <div class="main-wrap">
      <!-- 情况一 正在加载 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- 情况二 文章存在 -->
      <div v-else-if="articleData.aut_id" class="article-detail">
        <h1 class="article-title">{{ articleData.title }}</h1>
        <van-cell class="user-badge" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleData.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleData.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleData.pubdate | relativeTime }}
          </div>
          <!-- 关注按钮组件 -->
          <followButton
            v-model="articleData.is_followed"
            :user_id="articleData.aut_id"
          ></followButton>
        </van-cell>
        <div
          class="article-content markdown-body"
          v-html="articleData.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" badge="123" color="#777"></van-icon>
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 收藏组件 -->
          <collectArticle
            v-model="articleData.is_collected"
            :article_id="articleData.art_id"
          ></collectArticle>
          <!-- 点赞组件 -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <likeArticle
            v-model="articleData.attitude"
            :article_id="articleData.art_id"
          ></likeArticle>
          <!-- 分享面板组件 -->
          <shareSheet @click="clickfn"></shareSheet>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- 情况三 文章不存在 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- 情况四 数据库异常 -->
      <div v-else class="error-wrap" @click="loadArticle">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api'
import followButton from '@/components/followButton.vue'
import collectArticle from '@/components/collectArticle.vue'
import likeArticle from '@/components/likeArticle.vue'
import shareSheet from '@/components/shareSheet.vue'

export default {
  name: 'ArticleIndex',
  components: {
    followButton,
    collectArticle,
    likeArticle,
    shareSheet
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      articleData: {},
      isLoading: true,
      errStatus: 0
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    async loadArticle() {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await getArticleById(this.articleId)
        console.log(data)
        this.articleData = data
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-badge {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-badge {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="top-story-area pd-top-50 pd-bottom-30">
      <div class="container">
        <div class="section-title">
          <div class="row">
            <div class="col-sm-8">
              <h4 class="title">Top Voted Stories</h4>
              <span class="line"></span>
            </div>
            <div class="col-sm-4 text-sm-right align-self-center">
              <a class="see-all-btn float-sm-end"
                 href="#">View all</a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6"
               v-for="item in toparticles">
            <div class="single-post-wrap">
              <div class="thumb">
                <img :src="item.coverImg"
                     alt="img" />
                <a class="tag top-right tag-sky top_title"
                   href="#">{{
                  item.cate.title
                }}</a>
              </div>
              <div class="post-details">
                <div class="meta">
                  <div class="date">
                    <i class="fa fa-clock-o"></i>
                    {{ item.createdAt }}
                  </div>
                </div>
                <h6 class="top_title">
                  <a :href="'#/detail/' + item.id"
                     target="_blank">{{
                    item.title
                  }}</a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- news-area Start -->

    <div class="pd-top-50 pd-bottom-30"
         id="articlesFeed">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="section-title">
              <h4 class="title">Stories</h4>
              <span class="line"></span>
            </div>
            <div v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10"
                 class="list">
              <div class="media-post-wrap-2 media"
                   v-for="item in articles">
                <div class="thumb"
                     style="
                    width: 20em;
                    align-self: center;
                    justify-content: center;
                  ">
                  <img :src="item.coverImg"
                       alt="img" />
                </div>
                <div class="media-body"
                     style="margin-top: 2px">
                  <div class="meta d-block mt-3">
                    <div class="date">
                      <i class="fa fa-clock-o"></i>
                      {{ item.createdAt }}
                      <i class="fa author"></i>
                      {{ item.author }}
                    </div>
                  </div>
                  <a :href="'#/detail/' + item.id"
                     target="_blank">
                    <h6 class="story_title">{{ item.title }}</h6>
                    <p v-html="item.content"
                       class="story_content"></p>
                  </a>
                  <div class="news_botton">
                    <a class="tag tag-red"
                       href="#">{{ item.cate.title }}</a>
                    <div>
                      <img src="@/assets/img/vote.png"
                           alt="img"
                           style="width: 1.5em" />
                      {{ item.vote }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrap mt-5 mb-5 text-center">
                <a class="btn btn-main">{{ loadMsg }}</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="section-title">
              <h4 class="title">Categories</h4>
              <span class="line"></span>
            </div>
            <ul class="widget widget-categories">
              <li v-for="item in cateObjList">
                <div class="thumb"><img :src="item.memo.img"
                       alt="img" /></div>
                <a :href="'#/category/' + item.id"
                   target="_blank">{{
                  item.title
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- news-area End -->
  </div>
</template>
<script>
import { Spinner, InfiniteScroll, Toast } from "mint-ui";
import { cateList, articleList, articleTopVoteList } from "@/api/article.js";
import Header from "../header/header";
import Footer from "../footer/footer";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Spinner,
    InfiniteScroll,
    Toast,
  },
  async created () {
    let cateRes = await cateList();
    this.cateObjList = cateRes.data.data;
    let articleRes = await articleTopVoteList({ page: 1 });
    this.toparticles = articleRes.data.data.slice(0, 4);
    let articleRes2 = await articleList({ page: 1 });
    //this.articles = articleRes2.data.data; 
  },
  data () {
    return {
      toparticles: [],
      articles: [],
      cateObjList: [],
      loading: false,
      page: 1,
      loadMsg: "Load More",
    };
  },

  methods: {
    loadMore () {
      this.requestData();
    },
    async requestData () {
      try {
        console.log("load more", this.page);
        this.loading = true;
        let articleRes2 = await articleList({ page: this.page });
        if (articleRes2.data && articleRes2.data.code == 0) {
          let tmp = articleRes2.data.data;
          this.articles = this.articles.concat(articleRes2.data.data);
          this.page += 1;
          if (this.page == 2) {
            this.page += 1;
          }
          if (tmp.length < 10) {
            this.loading = true;
            this.loadMsg = "No Articles";
          } else {
            this.loading = false;
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
  },
};
</script> 
<style scoped>
.top_title {
  max-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.story_title {
  font-size: 1em !important;
  max-height: 2em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.story_content {
  max-height: 5em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.meta .date i {
  color: #7c7577;
}

.news_botton {
  margin-top: 1.5em;
}

.news_botton div {
  float: right;
  margin-right: 3em;
}

@media (min-width: 600px) {
  .news_botton a {
    float: left;
  }
}

* {
  padding: 0;
  margin: 0;
}
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.ball-clip-rotate > div {
  border-radius: 100%;
  border: 2px solid #333;
  border-bottom-color: transparent;
  height: 20px;
  width: 20px;
  background: 0 0 !important;
  display: inline-block;
  -webkit-animation: rotate 0.75s 0s linear infinite;
  animation: rotate 0.75s 0s linear infinite;
}
</style>
<style module>
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.item {
  display: flex;
  box-shadow: 0 0 4px #999 inset;
  height: 50px;
  line-height: 50px;
  padding: 10px;
}
.super-item {
  box-shadow: 0 0 10px red inset;
}
.item img {
  width: 50px;
  height: 50px;
}
.item h3 {
  font-size: 20px;
  margin-left: 20px;
}
.pull-down-dom {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.load-more-dom {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
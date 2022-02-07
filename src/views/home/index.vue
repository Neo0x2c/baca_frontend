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
                <img :src=item.coverImg
                     alt="img">
                <a class="tag top-right tag-sky top_title"
                   href="#">{{item.cate.title}}</a>
              </div>
              <div class="post-details">
                <div class="meta">
                  <div class="date">
                    <i class="fa fa-clock-o"></i>
                    {{item.createdAt}}
                  </div>
                </div>
                <h6 class="top_title"><a :href="'#/detail/' + item.id "
                     target="_blank">{{item.title}}</a></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- news-area Start -->
    <div class="pd-top-50 pd-bottom-30"
         id="articlesFeed"
         v-loading="loading"
         element-loading-text="loading">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="section-title">
              <h4 class="title">Stories</h4>
              <span class="line"></span>
            </div>
            <div class="media-post-wrap-2 media"
                 v-for="item in articles">
              <div class="thumb"
                   style="width: 20em;align-self: center;justify-content: center;">
                <img :src=item.coverImg
                     alt="img">
              </div>
              <div class="media-body"
                   style="margin-top:2px">
                <div class="meta d-block mt-3">
                  <div class="date">
                    <i class="fa fa-clock-o"></i>
                    {{item.createdAt}}
                    <i class="fa author"></i>
                    {{item.author}}
                  </div>
                </div>
                <a :href="'#/detail/' + item.id "
                   target="_blank">
                  <h6 class="story_title">{{item.title}}</h6>
                  <p v-html="item.content"
                     class="story_content"></p>
                </a>
                <div class="news_botton">
                  <a class="tag tag-red"
                     href="#">{{item.cate.title}}</a>
                  <div> <img src="@/assets/img/vote.png"
                         alt="img"
                         style="width:1.5em;" /> {{item.vote}}</div>
                </div>
              </div>
            </div>
            <div class="btn-wrap mt-5 mb-5 text-center">
              <a class="btn btn-main"
                 @click="showMore">Load More</a>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="section-title">
              <h4 class="title">Categories</h4>
              <span class="line"></span>
            </div>
            <ul class="widget widget-categories">
              <li v-for="item in cateObjList">
                <div class="thumb"><img :src=item.memo.img
                       alt="img"></div>
                <a :href="'#/category/' + item.id "
                   target="_blank">{{item.title}}</a>
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
import { cateList, articleList, articleTopVoteList } from "@/api/article.js";
import { Notification } from 'element-ui';
import Header from "../header/header"
import Footer from "../footer/footer"

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  async created () {
    // 页面一打开就去加载列表。
    let cateRes = await cateList();
    this.cateObjList = cateRes.data.data;
    let articleRes = await articleTopVoteList({ "page": 1 });
    this.toparticles = articleRes.data.data.slice(0, 4)
    let articleRes2 = await articleList({ "page": 1 });
    this.articles = articleRes2.data.data
    this.loading = false
  },
  data () {
    return {
      toparticles: {},
      articles: {},
      cateObjList: [],
      page: 1,
      loading: false
    }
  },
  methods: {
    async showMore () {
      this.loading = true
      let articleRes2 = await articleList({ "page": this.page + 1 });
      let res = articleRes2.data.data
      this.loading = false
      if (res.length < 1) {
        const h = this.$createElement;
        var mes = "There are no more articles"
        var options = {
          title: 'Aha ~',
          message: h('i', { style: 'color: teal;font-weight:700' }, mes)

        }
        Notification(options)
        return
      }
      this.articles = res
      var anchor = this.$el.querySelector('#articlesFeed'); //获取元素  
      document.getElementById("articlesFeed").scrollIntoView();
      this.page += 1
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
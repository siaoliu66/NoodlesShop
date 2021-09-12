<template>
    <div>
        <intro-swiper></intro-swiper>
        <div class="header">
            <menubar/>
        </div>
        <div class="wrap">
            <div class="container">
                <div class="about">
                    <h2 class="heading">
                        <div class="heading_num">01</div>
                        <div class="heading_title">About</div>
                    </h2>
                    <div class="content">
                        牛老大從食材出發，強調本真，<br>選用天然醬料，才能吃的安全放心。<br>
                        每天早起熬煮，遵循古法手工。<br>用心烹調，值得你的等待。</div>
                    <div class="img-bg"></div>
                </div>
                <div class="clearfix"></div>
                <div class="recommend">
                    <h2 class="heading right">
                        <div class="heading_num">02</div>
                        <div class="heading_title">recommend</div>
                    </h2>
                    <div class="content">
                        <swiper2/>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="news">
                    <h2 class="heading">
                        <div class="heading_num">03</div>
                        <div class="heading_title">News</div>
                    </h2>
                    <div class="newscontent">
                        <div class="newslist">
                            <div class="img"></div>
                            <div class="title">2021/4/18</div>
                            <div class="content">疫情期間不開放內用，外帶訂購自取85折。</div>
                        </div>
                        <div class="newslist">
                            <div class="img"></div>
                            <div class="title">2021/7/24</div>
                            <div class="content">高雄、台南開放餐飲內用！ 牛老大開放內用! </div>
                        </div>
                        <div class="newslist">
                            <div class="img"></div>
                            <div class="title">2021/8/7</div>
                            <div class="content">為慶祝父親節，明日8/8(日)公休一日，請大家不要撲空。</div>
                        </div>
                    </div>
                    <router-link class="btn btn-outline-dark more" to="/news"> More </router-link>
                </div>
                <div class="clearfix"></div>           
                            <div class="coupon">
                    <div class="title">
                        限時折扣
                    </div>
                    <h3>
                        歡慶開幕
                    </h3>
                    <p class="text">
                        即日起至 2021-09-30， 全館消費不限金額，即享 90% 折扣
                    </p>
                    <div class="code">
                        open90
                    </div>
                </div>
            </div>
            <Footer></Footer> 
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .wrap{
        background-color: #F1F2F5;
        .more{
            position: absolute;
            bottom: 8%;
            left: 50%;
            color: #A46843;
            border-color: #A46843;
            &:hover{
                color: #fff;
                background-color: #A46843;

            }
        }
    }
    
</style>

<script>
import menubar from "./topmenu";
import swiper2 from "../swiper2";
import Footer from "./footer";

// import $ from "jquery";
export default {
  components: {
    menubar,
    swiper2,
    Footer
  },
};
</script>

<template>
    <div>
        <intro-swiper></intro-swiper>
        <div class="header">
            <menubar/>
        </div>
        <div class="container">
            <div class="about">
                <h2 class="heading">
                    <div class="heading_num">01</div>
                    <div class="heading_title">About</div>
                </h2>
                <div class="content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero voluptatem totam incidunt voluptatibus corrupti ratione optio hic eveniet nesciunt, eius, repellendus placeat voluptates iste saepe debitis nulla eos commodi enim?
                </div>
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
                <!-- <div class="content">
                    <p class="content_title">品質為本，顧客為先。</p>
                    <div class="content_text">
                        <div class="inner">
                            <div class="inner-img">
                                <i class="fas fa-diagnoses"></i>
                            </div>
                            <div class="inner-text">
                                <h4 class="inner-text-title">食材新鮮</h4>
                                <p class="inner-text-content">採用天然食材,吃得健康大家安心。</p>
                            </div>
                        </div>
                        <div class="inner">
                            <div class="inner-img">
                                    <i class="fas fa-seedling"></i>
                            </div>
                            <div class="inner-text">
                                <h4 class="inner-text-title">天然醬料</h4>
                                <p class="inner-text-content">選用天然醬料，才能吃的安全放心。</p>
                            </div>
                        </div>
                        <div class="inner">
                            <div class="inner-img">
                                    <i class="fas fa-people-carry"></i>
                            </div>
                            <div class="inner-text">
                                <h4 class="inner-text-title">古法智慧</h4>
                                <p class="inner-text-content">每天早起熬煮，遵循古法手工。</p>
                            </div>
                        </div>
                        <div class="inner">
                            <div class="inner-img">
                                    <i class="fas fa-handshake"></i>
                            </div>
                            <div class="inner-text">
                                <h4 class="inner-text-title">用心製作</h4>
                                <p class="inner-text-content">用心烹調，值得你的等待。</p>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="clearfix"></div>
            <div class="news">
                <h2 class="heading">
                    <div class="heading_num">03</div>
                    <div class="heading_title">News</div>
                </h2>
                <div class="newscontent">
                    <div class="newslist">
                        <div class="title">2021/3/20</div>
                        <div class="content"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, nulla dolores architecto ad sapiente quibusdam tenetur possimus voluptatum. </div>
                    </div>
                    <div class="newslist">
                        <div class="title">2021/3/20</div>
                        <div class="content"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, nulla dolores architecto ad sapiente quibusdam tenetur possimus voluptatum. </div>
                    </div>
                    <div class="newslist">
                        <div class="title">2021/3/20</div>
                        <div class="content"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, nulla dolores architecto ad sapiente quibusdam tenetur possimus voluptatum. </div>
                    </div>
                    <div class="newslist">
                        <div class="title">2021/3/20</div>
                        <div class="content"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, nulla dolores architecto ad sapiente quibusdam tenetur possimus voluptatum. </div>
                    </div>
                    <div class="newslist">
                        <div class="title">2021/3/20</div>
                        <div class="content"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, nulla dolores architecto ad sapiente quibusdam tenetur possimus voluptatum. </div>
                    </div>
                    <button type="button" class="btn btn-primary more">more</button>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="contact">
                <h2 class="heading right">
                    <div class="heading_num">04</div>
                    <div class="heading_title">contact</div>
                </h2>
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
</template>
<style lang="scss">
    #app{
        background-color: #f9e9cd;
        .more{
            float: right;
            margin-top: 15px;
        }
    }
</style>
<script>
import menubar from './topmenu'
import swiper2 from '../swiper2'
export default {
  components:{
      menubar,swiper2
  }
}
</script>
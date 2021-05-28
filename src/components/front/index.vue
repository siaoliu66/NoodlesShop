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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9284202400704!2d120.39250181534818!3d22.506868641051348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3471e27f00000001%3A0x4c7b878e0c0a328a!2z54mb6ICB5aSn54mb6IKJ6bq1!5e0!3m2!1szh-TW!2stw!4v1621824013502!5m2!1szh-TW!2stw" width="100%" height="450" style="margin-top: 7%;margin-bottom: 5%;border-radius: 5px;" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="footer">
            <div class="footer-menu">
                <ul class="footerbar">
                    <li>聯絡我們:07-6468855</li>
                    <li>商家地址:832高雄市林園區忠孝西路13號</li>
                </ul>
                <div class="footer-link">
                    <a href="https://www.facebook.com/Niulauda/" target="_blank" title="牛老大facebook">
                        <img src="@/assets/img/iconfinder_facebook_386622.png" alt="">
                    </a>
                    <a href="javascript:;" target="_blank" title="牛老大line">
                        <img src="@/assets/img/iconfinder_line_1807543.png" alt="">
                    </a>
                    <a href="https://goo.gl/maps/fZXiRce4kMBCzJ8C9" target="_blank" title="牛老大google-map">
                        <img src="@/assets/img/iconfinder_google_4975305.png" alt="">
                    </a>
                </div>
            </div>
            <p class="copyright">Copyright © 2021 牛老大版權所有.</p>
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
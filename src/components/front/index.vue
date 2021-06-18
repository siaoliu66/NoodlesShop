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
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9284202400704!2d120.39250181534818!3d22.506868641051348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3471e27f00000001%3A0x4c7b878e0c0a328a!2z54mb6ICB5aSn54mb6IKJ6bq1!5e0!3m2!1szh-TW!2stw!4v1621824013502!5m2!1szh-TW!2stw" width="100%" height="450" style="margin-top: 7%;border-radius: 5px;" allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div class="clearfix"></div>
            </div>
        
        <div class="footer">
            <div class="footer-menu">
                <div class="downTitle">牛老大餐飲國際股份有限公司<br><em>Niulauda International CO., Ltd.</em></div>
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
                <ul class="footerbar">
                    <li><span class="title">ADD</span>832高雄市林園區忠孝九路13號</li>
                    <li><span class="title">TEL</span>07-6468855</li>
                </ul>
                <p class="copyright">Copyright © 2021 牛老大版權所有.</p>
            </div>
            
        </div>
            <div class="bonus">
                <a href="javascript:;" @click="opendiscount()">
                <i class="fas fa-tags"></i>
                優惠快取</a>
                
            </div>
            <!-- modal -->
            <div class="modal fade" id="opendiscount" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header border-0">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="body-title">Covid-19 期間折扣</div> 
                    <!-- 折扣碼區塊 -->
                    <div class="coupon">
                        <div class="coupon-title text-center">91% OFF</div>
                        <div class="coupon-text text-center">covid19</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .wrap{
        background-color: #F1F2F5;
        .more{
            float: right;
            margin-top: 15px;
        }
        .bonus{
            position: fixed;
            right: 30px;
            bottom: 30px;
            display: flex;
            writing-mode: vertical-lr;
            background-color: #F1F2F5;
            border: 1px solid #272728;
            border-radius: 5px;
            z-index: 100;
            cursor: pointer;
            box-shadow: 1px 2px 10px rgb(86,88,91);
            a{
                color: #272728;
                text-decoration: none;
                padding: 10px;
                i {
                    margin-bottom: 10px;
                }
            }
            
        }
    }
    .modal{
        .modal-content{
            background-image: url(https://images.unsplash.com/photo-1608539660949-16799e893a95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1005&q=80);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
        .modal-body{
            .body-title{
                font-size: 2rem;
                color: #fff;
                font-weight: bolder;
                top: -25px;
                right: 100px;
                position: absolute;
            }
            .coupon{
                width: 80%;
                float: right;
                background-color: #138A4A;
                border-radius: 20px;
                color: #fff;
                font-size: 32px;
                padding: 3%;
                margin: 4%;
                .coupon-text{
                    background-color: #fff;
                    color: #138A4A;
                    border-radius: 30px;
                    width: 88%;
                    margin: 0 auto;
                }
                .coupon-title{
                    margin: 5px 0;
                }
            }
        }
    }
</style>
<script>
import menubar from './topmenu'
import swiper2 from '../swiper2'
import $ from 'jquery'
export default {
  components:{
      menubar,swiper2
  },
  methods:{
      opendiscount(){
          $('#opendiscount').modal('show')
      }
  }
}
</script>
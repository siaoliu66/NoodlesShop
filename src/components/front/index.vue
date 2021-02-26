<template>
    <div>
        <intro-swiper></intro-swiper>
        <div class="header">
            <h1><a href="#" class="logo">牛老大</a></h1>
            <ul class="menubar">
                <li>
                    <router-link class="nav-link" to="/login">
                            關於牛老大
                    </router-link>
                </li>
                <li>                   
                    <router-link class="nav-link" to="/login">
                            最新消息
                    </router-link>
                </li>
                <li>                   
                    <router-link class="nav-link" to="/menu">
                            美味菜單
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-link" to="/login">
                            商品管理
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="container">
            <div class="about">
                <h2 class="heading">
                    <div class="heading_num">01</div>
                    <div class="heading_title">About</div>
                </h2>
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
                <div class="img-bg"></div>
            </div>
            <div class="news">
                
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
</template>

<script>

export default {
  
}
</script>
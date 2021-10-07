<template>
  <div>
    <intro-swiper></intro-swiper>
    <div class="header">
      <menubar />
    </div>
    <div class="wrap">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
            <li class="breadcrumb-item active" aria-current="page">關於我們</li>
          </ol>
        </nav>
        <h2>關於我們</h2>
        <div class="intro">
          <h3>牛老大的故事</h3>
          <div class="intro-1">
            <div class="introText">
              <p>
                牛老大從食材出發，強調本真，老師傅使用多種材料熬製的高湯，清爽卻不失濃郁，再融入香菇湯底，使湯汁香氣、深度更上一層樓。
              </p>
              <p>
                民以食為天，遵循古法手工，從和麵糰開始堅持手工製作麵條、水餃皮，堅持始終如一，煮出熟悉的味道，美味飄香千萬家。
              </p>
              <p>
                從1996年開始營業，一代傳承一代，守護美好古早味，並試圖創新新滋味，期待揚名高雄。
              </p>
            </div>
            <div class="img">
              <img
                src="@/assets/img/dumplings.jpg"
              />
            </div>
          </div>
        </div>
        <div class="contact">
          <h3>聯絡我們</h3>
          <div class="contact-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9284202400704!2d120.39250181534818!3d22.506868641051348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3471e27f00000001%3A0x4c7b878e0c0a328a!2z54mb6ICB5aSn54mb6IKJ6bq1!5e0!3m2!1szh-TW!2stw!4v1621824013502!5m2!1szh-TW!2stw"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
            <div class="contactText">
              <div class="contactTitle">商家店址</div>
              <p>高雄市林園區忠孝九路13號</p>
              <div class="contactTitle">訂餐電話</div>
              <p>07-6461235</p>
              <div class="contactTitle">營業時間</div>
              <p>10:30~21:00 周一店休</p>
              <div class="contactTitle">外送夥伴</div>
              <p><a class="icon-uber" href="https://www.ubereats.com/tw/store/%E7%89%9B%E8%80%81%E5%A4%A7%E7%89%9B%E8%82%89%E9%BA%B5/JRva7uMFQWmtNU-zFQhuzw?pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMiVFNSVBRCU5RiVFNSVBRCU5MCVFOCVCNyVBRjM1OCVFOCU5OSU5RiUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMkNoSUo5eWZwZGhJRmJqUVJqLWQ2UjJIU0NMayUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJnb29nbGVfcGxhY2VzJTIyJTJDJTIybGF0aXR1ZGUlMjIlM0EyMi42NzUyODE5JTJDJTIybG9uZ2l0dWRlJTIyJTNBMTIwLjMwOTIyNzglN0Q%3D&utm_campaign=place-action-link&utm_medium=organic&utm_source=google" target="_blank" title="Uber Eats">Uber Eats</a>
              <a class="icon-foodpanda" href="https://www.foodpanda.com.tw/restaurant/t5hz/niu-lao-da-niu-rou-mian?utm_source=google&utm_medium=organic&utm_campaign=google_reserve_place_order_action" target="_blank" title="foodpandas">foodpanda</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<style scoped src="@/assets/customcss/news.css"></style>
<script>
import menubar from "./topmenu";
import swiper2 from "../swiper2";
import Footer from "./footer";

// import $ from "jquery";
export default {
  components: {
    menubar,
    swiper2,
    Footer,
  },
};
</script>
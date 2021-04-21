<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="css/slick.css" />
    <link rel="stylesheet" href="css/slick-theme.css" />
    <link rel="stylesheet" href="css/demo.css" />
    <style>
      .phpButtonBar{
        display: flex;
        margin-left:auto;
        justify-content: flex-end;
      }
      .phpButtonBar .button{
        display: block;
        margin:0 5px;
      }
    </style>

    
  </head>
  <body>
    <!-- header -->
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="language_bar">
              <div class="lg_element">
                <i class="fas fa-globe-americas"></i>
                <a href="" style="color: white; text-decoration: underline"
                  >中文</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- navbar -->
    <div class="navbar">
      <div class="navbar_logo">
        <img src="img/logo.png" alt="" />
      </div>
      <div class="navbar_list">
        <div class="nav_li" href="">關於沃亞
          <div class="li_lg_g">
            <a href="" class="li_lg_item">女生在麵店太白目被打爆</a>
            <a href="" class="li_lg_item">福原愛一年前就在讀家事事件程序法？</a>
            <a href="" class="li_lg_item">SpaceX Starship SN10 降落成功！</a>
            <a href="" class="li_lg_item">拜登首份國安戰略指南 表態支持台灣</a>
          </div>
        </div>
        <div class="nav_li" href="">產品介紹
          <div class="li_lg_g">
            <a href="" class="li_lg_item">女生在麵店太白目被打爆</a>
            <a href="" class="li_lg_item">福原愛一年前就在讀家事事件程序法？</a>
            <a href="" class="li_lg_item">SpaceX Starship SN10 降落成功！</a>
            <a href="" class="li_lg_item">拜登首份國安戰略指南 表態支持台灣</a>
          </div>
        </div>
        <a class="nav_li" href="<?php echo base_url() ?>/Home/newsList">最新消息</a>
        <!-- <div class="nav_li" href="">最新消息
          <div class="li_lg_g">
            <a href="" class="li_lg_item">女生在麵店太白目被打爆</a>
            <a href="" class="li_lg_item">福原愛一年前就在讀家事事件程序法？</a>
            <a href="" class="li_lg_item">SpaceX Starship SN10 降落成功！</a>
            <a href="" class="li_lg_item">拜登首份國安戰略指南 表態支持台灣</a>
          </div>
        </div> -->
        <a class="nav_li" href="">技術交流平台</a>
        <a class="nav_li" href="">聯絡我們</a>
        <a class="nav_li" href="">校正實驗室</a>
        <a class="nav_li" href="">相關網站</a>
      </div>
      
      <div class="nav_button"></div>
      
    </div>
    <!-- navbar rwd -->
    <div class="navbox_g">
      <div class="navbox_logo"><img src="img/logo.png" alt="" /></div>
      <div class="navbox_li" href="">
        關於沃亞 <i class="fas fa-chevron-right"></i>
      </div>
      <div class="li_g">
        <a href="" class="li_item">女生在麵店太白目被打爆</a>
        <a href="" class="li_item">福原愛一年前就在讀家事事件程序法？</a>
        <a href="" class="li_item">SpaceX Starship SN10 降落成功！</a>
        <a href="" class="li_item">拜登首份國安戰略指南 表態支持台灣</a>
      </div>
      <div class="navbox_li" href="">
        產品介紹 <i class="fas fa-chevron-right"></i>
      </div>
      <div class="li_g">
        <a href="" class="li_item">女生在麵店太白目被打爆</a>
        <a href="" class="li_item">福原愛一年前就在讀家事事件程序法？</a>
        <a href="" class="li_item">SpaceX Starship SN10 降落成功！</a>
        <a href="" class="li_item">拜登首份國安戰略指南 表態支持台灣</a>
      </div>
      <div class="navbox_li" href=""
        >校正實驗室 <i class="fas fa-chevron-right"></i
      ></div>
      <div class="li_g">
        <a href="" class="li_item">女生在麵店太白目被打爆</a>
        <a href="" class="li_item">福原愛一年前就在讀家事事件程序法？</a>
        <a href="" class="li_item">SpaceX Starship SN10 降落成功！</a>
        <a href="" class="li_item">拜登首份國安戰略指南 表態支持台灣</a>
      </div>
      <div class="navbox_li" href="">最新消息 </div>
      <div class="navbox_li" href=""
        >技術交流平台 <i class="fas fa-chevron-right"></i
      ></div>
      <div class="li_g">
        <a href="" class="li_item">女生在麵店太白目被打爆</a>
        <a href="" class="li_item">福原愛一年前就在讀家事事件程序法？</a>
        <a href="" class="li_item">SpaceX Starship SN10 降落成功！</a>
        <a href="" class="li_item">拜登首份國安戰略指南 表態支持台灣</a>
      </div>
      <diva class="navbox_li" href=""
        >聯絡我們 <i class="fas fa-chevron-right"></i
      ></diva>
      <div class="li_g">
        <a href="" class="li_item">女生在麵店太白目被打爆</a>
        <a href="" class="li_item">福原愛一年前就在讀家事事件程序法？</a>
        <a href="" class="li_item">SpaceX Starship SN10 降落成功！</a>
        <a href="" class="li_item">拜登首份國安戰略指南 表態支持台灣</a>
      </div>
      <div class="navbox_li" href="">相關網站</div>
    </div>
    <!-- banner -->
    <div class="banner_g">
      <?php
        foreach ($banner_title as $row){
          echo "<div class=\"ba_item\">";
              echo "<div class=\"banner\">";
                echo "<div class=\"ba_lg\">";
                  echo "<div class=\"ba_img\">";
                    echo "<img src=".$row->img."/>";
                  echo "</div>";
                  echo "<div class=\"ba_content\">";
                    echo "<div class=\"title_bg ".$row->color."\"></div>";
                  echo "</div>";
                  echo "<div class=\"ba_title\">".$row->mainTitle."</div>";
                  echo "<div class=\"ba_title_sub\">".$row->subTitle."</div>";
                echo "</div>";

                echo "<div class=\"ba_sm\">";
                echo "</div>";

              echo "</div>";
          echo "</div>";
        }
      ?>
      <!-- <div class="ba_item">
        <div class="banner">
          <div class="ba_lg">
            <div class="ba_img">
              <img src="img/ph1.jpg" alt="" />
            </div>
            <div class="ba_content">
              <div class="title_bg"></div>
            </div>
            <div class="ba_title">國軍弟兄現在有多抖？</div>
            <div class="ba_title_sub">
              現在4萬噸鳳梨用屁眼想都知道是國軍弟兄吞了
            </div>
          </div>
          <div class="ba_sm">
            <div class="ba_sm_img">
              <img src="img/ph1.jpg" alt="" />
            </div>
            <div class="ba_sm_content">
              <h3>系統整合專業服務</h3>
              <p>ISO 9001:2015 ISO 9001:2015 ISO 9001:2015</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ba_item">
        <div class="banner">
          <div class="ba_lg">
            <div class="ba_img">
              <img src="img/ph2.jpg" alt="" />
            </div>
            <div class="ba_content">
              <div class="title_bgGreen"></div>
            </div>
            
            <div class="ba_title">便利商店推寄杯六百杯？</div>
            <div class="ba_title_sub">
              現在連叫人寄六百杯省一萬的促銷都出來了
            </div>
          </div>
          <div class="ba_sm">
            <div class="ba_sm_img">
              <img src="img/ph2.jpg" alt="" />
            </div>
            <div class="ba_sm_content">
              <h3>便利商店推寄杯六百杯？</h3>
              <p>現在連叫人寄六百杯省一萬的促銷都出來了</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ba_item">
        <div class="banner">
          <div class="ba_lg">
            <div class="ba_img">
              <img src="img/ph3.jpg" alt="" />
            </div>
            <div class="ba_content">
              <div class="title_bg"></div>
            </div>
            <div class="ba_title">黑嘉嘉交男朋友的八卦</div>
            <div class="ba_title_sub">應該是廣告拉大家可以回去了</div>
          </div>
          <div class="ba_sm">
            <div class="ba_sm_img">
              <img src="img/ph3.jpg" alt="" />
            </div>
            <div class="ba_sm_content">
              <h3>黑嘉嘉交男朋友的八卦</h3>
              <p>應該是廣告拉大家可以回去了</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="banner_footer">
      <marquee behavior="" direction=""
        >用心成為「氣體監測系統」及相關製程設備之領先者</marquee
      >
    </div>
    <!-- set1 -->
    <div class="set1">
      <div class="set_title">
        <h2>產品介紹</h2>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="project_g">
              <div class="slick_item">
                <div class="project_show">
                  <div class="pj_new">1</div>
                  <img class="ph_size" src="img/974971582.png" alt="" />
                  <div class="pj_introduction">
                    <h2>FOUP-AMC</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.....
                    </p>
                    <a href="" class="more_button1"
                      >more<i class="fas fa-angle-double-right"></i
                    ></a>
                  </div>
                </div>
              </div>
              <div class="slick_item">
                <div class="project_show">
                  <div class="pj_new">1</div>
                  <img class="ph_size" src="img/974971582.png" alt="" />
                  <div class="pj_introduction">
                    <h2>FOUP-AMC</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.....
                    </p>
                    <a href="" class="more_button1"
                      >more<i class="fas fa-angle-double-right"></i
                    ></a>
                  </div>
                </div>
              </div>
              <div class="slick_item">
                <div class="project_show">
                  <div class="pj_new">1</div>
                  <img class="ph_size" src="img/974971582.png" alt="" />
                  <div class="pj_introduction">
                    <h2>FOUP-AMC</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.....
                    </p>
                    <a href="" class="more_button1"
                      >more<i class="fas fa-angle-double-right"></i
                    ></a>
                  </div>
                </div>
              </div>
              <div class="slick_item">
                <div class="project_show">
                  <div class="pj_new">1</div>
                  <img class="ph_size" src="img/974971582.png" alt="" />
                  <div class="pj_introduction">
                    <h2>FOUP-AMC</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.....
                    </p>
                    <a href="" class="more_button1"
                      >more<i class="fas fa-angle-double-right"></i
                    ></a>
                  </div>
                </div>
              </div>
              <div class="slick_item">
                <div class="project_show">
                  <div class="pj_new">1</div>
                  <img class="ph_size" src="img/974971582.png" alt="" />
                  <div class="pj_introduction">
                    <h2>FOUP-AMC</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit.....
                    </p>
                    <a href="" class="more_button1"
                      >more<i class="fas fa-angle-double-right"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- set2 -->
    <div class="set2">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="product_title">
              <h3>服務項目</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="product_list">
              <div class="product">
                <div class="pr_img">
                  <i class="fab fa-google-plus-g"></i>
                </div>
                <div class="pr_title">Google</div>
              </div>
              <div class="product">
                <div class="pr_img">
                  <i class="fab fa-facebook"></i>
                </div>
                <div class="pr_title">Facebook</div>
              </div>
              <div class="product">
                <div class="pr_img">
                  <i class="fab fa-twitter-square"></i>
                </div>
                <div class="pr_title">Twitter</div>
              </div>
              <div class="product">
                <div class="pr_img">
                  <i class="fab fa-instagram"></i>
                </div>
                <div class="pr_title">Instagram</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- set3 -->
    <div class="set3">
      <div class="set_title_r">
        <h2>關於沃亞</h2>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="about_img">
              <img src="img/圖1-1.png" alt="" />
            </div>
          </div>
          <div class="col-md-12 col-lg-6">
            <div class="about_text">
              台南市原市區可能又將有新的夜市，位在南紡購物中心對面平實營區內，
              目前業者已在整地中，預計3月底前開設「大旺」夜市，市府市場處則表示，
              業者已經提出申請但是尚未核可，在核可之前不能夠經營。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
              但也有網友認為，有夜市也不錯，希望能夠經營出有別於其他夜市的特色。
            </div>
          </div>
        </div>
        <a href="" class="more_button"
          >更多資訊 <i class="fas fa-angle-double-right"></i
        ></a>
      </div>
    </div>

    <!-- set4 -->
    <div class="set4">
      <div class="set_title">
        <h2>最新消息</h2>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="new_team">
              <?php 
              foreach ($news as $row)
              {
                  echo "<a href=\"".base_url()."/home/newsIn/".$row->cID."\" class=\"new\">";
                      echo "<div class=\"new_time\">".$row->cDay."</div>";
                      echo $row->cTitle;
                      echo "<div class=\"phpButtonBar\">";
                      echo "</div>";
                  echo "</a>";
              }
              
              ?>
              <!-- <div class="new">
                <div class="new_time">2019.09.18</div>
                沃亞科技參與2019年「SEMICON Taiwan 國際半導體展」
              </div>
              <div class="new">
                <div class="new_time">2019.09.18</div>
                理科太太賣「太空人維他命」7天募資3千萬　號稱好到爆炸！食藥署要查
              </div>
              <div class="new">
                <div class="new_time">2019.09.18</div>
                沃亞科技參與2019年「SEMICON Taiwan 國際半導體展」
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footerbar">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-12">
            <div class="logo_box">
              <div class="top_img">
                <img src="img/logo.png" alt="" />
              </div>
              <div class="bottom_email">
                <i class="far fa-envelope"></i>
                weltall@woyo.com.tw
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="company">
              <h6>新竹總公司</h6>
              <div class="phone">
                <i class="fas fa-phone-alt"></i>
                +886-3-5729666
              </div>
              <div class="fax">
                <i class="fas fa-fax"></i>
                +886-3-5738777
              </div>
              <div class="address">
                <i class="fas fa-map-marker-alt"></i>
                300新竹市東區公道五路二段83號4樓之3
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="company">
              <h6>台中辦公室</h6>
              <div class="phone">
                <i class="fas fa-phone-alt"></i>
                +886-3-5729666
              </div>
              <div class="fax">
                <i class="fas fa-fax"></i>
                +886-3-5738777
              </div>
              <div class="address">
                <i class="fas fa-map-marker-alt"></i>
                300新竹市東區公道五路二段83號4樓之3
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="company">
              <h6>台南辦公室</h6>
              <div class="phone">
                <i class="fas fa-phone-alt"></i>
                +886-3-5729666
              </div>
              <div class="fax">
                <i class="fas fa-fax"></i>
                +886-3-5738777
              </div>
              <div class="address">
                <i class="fas fa-map-marker-alt"></i>
                300新竹市東區公道五路二段83號4樓之3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      Copyright＠2020沃亞科技有限公司 all rights reserved.<i
        class="fab fa-html5"
      ></i
      >網站設計-橘野數位設計
    </div>

    <!-- 遮罩 -->
    <div class="mask"></div>
    <!-- Top按鈕 -->
    <a href="#" class="top_button"></a>

    <script src="js/jquery-3.5.1.min.js"></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
      integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
      integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
      crossorigin="anonymous"
    ></script>

    <script src="js/slick.js"></script>
    <script src="js/demo.js"></script>
    <script>
      // <!-- slick.js -->
    $(document).ready(function () {
        $(".banner_g").slick({
          arrows: false,
          dots: true,
        });
        $(".project_g").slick({
          dots: true,
          infinite: false,
          arrows: false,

          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 3,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
              },
            },
          ],
        });
      });
    </script>
    

  </body>
</html>

<?php include_once("php/head_page.php");  ?>

<section>
  <!-- 產品介紹 -->
  <div class="product_description_block">
    <div class="container">
      <div class="row">
        <div class="page_title_block">
          <div class="product_english_title">
            <div class="line_decoration_left"></div>
            Product Description
            <div class="line_decoration_right"></div>
          </div>
          <div class="product_chinese_title">產品分類1</div>
        </div>
      </div>
      <div class="row">
        <div class="sort_bar">
          <a href="#" class="sort_item">產品</a>
          <a href="#" class="sort_item sort_item_active">產品</a>
          <a href="#" class="sort_item">產品</a>
          <a href="#" class="sort_item">產品</a>
          <a href="#" class="sort_item">產品</a>
        </div>
      </div>
      <div class="row">
        <div class="product_list_block">
          <a href="#" class="product_list_item">
            <div class="product_img">
              <img src="upload/test1.jpg" alt="" />
              <div class="product_img_mask">
                <div class="see_icon"></div>
              </div>
            </div>
            <div class="product_name_block">產品名稱</div>
          </a>
          <a href="#" class="product_list_item">
            <div class="product_img">
              <img src="upload/test1.jpg" alt="" />
              <div class="product_img_mask">
                <div class="see_icon"></div>
              </div>
            </div>
            <div class="product_name_block">產品名稱</div>
          </a>
          <a href="#" class="product_list_item">
            <div class="product_img">
              <img src="upload/test1.jpg" alt="" />
              <div class="product_img_mask">
                <div class="see_icon"></div>
              </div>
            </div>
            <div class="product_name_block">產品名稱</div>
          </a>
          <a href="#" class="product_list_item">
            <div class="product_img">
              <img src="upload/test1.jpg" alt="" />
              <div class="product_img_mask">
                <div class="see_icon"></div>
              </div>
            </div>
            <div class="product_name_block">產品名稱</div>
          </a>
          <a href="#" class="product_list_item">
            <div class="product_img">
              <img src="upload/test1.jpg" alt="" />
              <div class="product_img_mask">
                <div class="see_icon"></div>
              </div>
            </div>
            <div class="product_name_block">產品名稱</div>
          </a>
          <a href="#" class="product_list_item">
            <div class="product_img">
              <img src="upload/test1.jpg" alt="" />
              <div class="product_img_mask">
                <div class="see_icon"></div>
              </div>
            </div>
            <div class="product_name_block">產品名稱</div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- JS產品的寬度等於高度 -->
  <script>
    var product_img_width = $("product_img").width();
    $(document).ready(function () {
      $(".product_img").height(product_img_width);
    });
    $(window).resize(function () {
      $(".product_img").height(product_img_width);
    });
  </script>
  <!-- 產品介紹 -->
  <!-- 產品展示 -->
  <div class="product_show_block">
    <div class="container">
      <div class="row">
        <div class="product_show">
          <a href="#" class="product_item">
            <img src="upload/test1.jpg" alt="" />
            <div class="product_item_mask">
              <div class="product_item_name">產品名稱</div>
            </div>
          </a>
          <a href="#" class="product_item">
            <img src="upload/test1.jpg" alt="" />
            <div class="product_item_mask">
              <div class="product_item_name">產品名稱</div>
            </div>
          </a>
          <a href="#" class="product_item">
            <img src="upload/test1.jpg" alt="" />
            <div class="product_item_mask">
              <div class="product_item_name">產品名稱</div>
            </div>
          </a>
          <a href="#" class="product_item">
            <img src="upload/test1.jpg" alt="" />
            <div class="product_item_mask">
              <div class="product_item_name">產品名稱</div>
            </div>
          </a>
        </div>
        <div class="product_show_sm">
          <a href="#" class="product_item">
            <img src="upload/test1.jpg" alt="" />
            <div class="product_item_mask">
              <div class="product_item_name">產品名稱</div>
            </div>
          </a>
          <a href="#" class="product_item">
            <img src="upload/test1.jpg" alt="" />
            <div class="product_item_mask">
              <div class="product_item_name">產品名稱</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- JS產品的寬度等於高度 -->
  <script>
    var product_width = $("product_item").width();
    $(document).ready(function () {
      $(".product_item").height(product_width);
    });
    $(window).resize(function () {
      $(".product_item").height(product_width);
    });
  </script>
  <!-- 產品展示 -->
  <!-- 公司 -->
  <div class="company_block">
    <div class="container">
      <div class="row">
        <div class="company">
          <a href="#" class="company_item">
            <img src="img/logo2.gif" alt="" />
          </a>
          <a href="#" class="company_item">
            <img src="img/logo2.gif" alt="" />
          </a>
          <a href="#" class="company_item">
            <img src="img/logo2.gif" alt="" />
          </a>
          <a href="#" class="company_item">
            <img src="img/logo2.gif" alt="" />
          </a>
          <a href="#" class="company_item">
            <img src="img/logo2.gif" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- 公司 -->
</section>
<?php include_once("php/foot.php"); ?>
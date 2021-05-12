<section>
	<div class="top_background_wrap">
		<div class="top_background" style="background-image: url(<?php echo $head_img[0]->f1; ?>)">
			<div class="top_background_content_wrap">
				<div class="top_background_content1">資訊分享</div>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="page_background">
		<div class="container page_ani_wrap">
			<div class="news_content_wrap">
				<div class="news_content_box">
					<div class="news_content_text_wrap">
						<div class="news_content_text_box">
							<div class="news_content_text_icon"></div>
							<div class="news_content_text"><?php echo $content[0]->t1; ?></div>
						</div>
					</div>
				</div>
				
				<div class="news_content_htmleditor_wrap">
					<div class="news_content_htmleditor htmleditor">
						<?php echo $content[0]->ck1; ?>
					</div>
				</div>
			</div>
			
			<?php
			$checked_has_product = false;
			if($content[0]->t2 != "")
			{
				$product_id = explode("index.php/load_page/get_product_content/", $content[0]->t2);
				if(isset($product_id[1]))
				{
					$product_id = $product_id[1];
					$this->db->where('id', $product_id);
					$query = $this->db->get( "product" );
					$product_data = $query->result();
					
					if(count($product_data) > 0)
					{
						echo <<<EchoData
						<form action="index.php/cart_quick/create_order" method="post" enctype="multipart/form-data" autocomplete="off" >
							<div class="quick_wrap">
EchoData;
						/*===商品內容鑲嵌===*/
						if($product_data[0]->t10 != "")
						{
							$tag_style = "tag_view";
							$tag_img = "images/product_tag_img.png";
							$tag_text = $product_data[0]->t10;
						}
						else
						{
							$tag_style = "none";
							$tag_img = "";
							$tag_text = "";
						}
						
						$product_data_array = (array)$product_data[0];
						$product_img_html = "";
						for($i= 1; $i <= 4;$i++)
						{
							$img_src = $product_data_array["f" . $i];
							$img_style = $this->img->rwd_style($img_src, 630, 750 );

							if($img_src != "none" && $img_src != ""){
								$product_img_html .= <<<EchoData
								<div>
									<div class="product_content_introduction_left_img">
										<img src="$img_src" style="$img_style">
										<div class="product_content_introduction_left_img_tag_wrap $tag_style">
											<div class="product_content_introduction_left_img_tag" style="background-image: url($tag_img)">
												$tag_text
											</div>
										</div>
									</div>
								</div>
EchoData;
							}
						}
						
						//商品分類
						$this->db->where('navi_1_id', $product_data[0]->navi_1_id);
						$query = $this->db->get( "product_navi_1" );
						$product_navi_data = $query->result();

						$product_navi_name = $product_navi_data[0]->navi_1_name;
						
						//商品簡介
						$product_t4 = explode("\r", $product_data[0]->t4);
						$product_t4_html = "";
						foreach($product_t4 as $value)
						{
							$product_t4_html .= <<<EchoData
							<div class="product_content_introduction_right_text_dot"></div>
							<div class="product_content_introduction_right_text">$value</div>
							<br>
EchoData;
						}
						
						$product_title = $product_data[0]->t1;
						$product_ori_price = $product_data[0]->t2;
						$product_real_price = $product_data[0]->t3;
						$product_fare = $cart_set[0]->t1;
						if($product_fare == 0)
						{
							$product_fare_html = '<span class="free_fare_text">免運費<span>';
						}
						else
						{
							$product_fare_html = '$' . $product_fare;
						}
						
						//商品詳情
						if($product_data[0]->ck1 != "")
						{
							$product_ck1 = $product_data[0]->ck1;
							$product_ck1_html = <<<EchoData
							<div class="product_content_detail_wrap">
								<div class="product_content_detail">
									商品詳情
								</div>
								<div class="product_content_detail_htmleditor_wrap">
									<div class="product_content_detail_htmleditor htmleditor">
										$product_ck1
									</div>
								</div>
							</div>
EchoData;
						}
						else
						{
							$product_ck1_html = "";
						}
						
						
						echo <<<EchoData
						<div class="quick_product_wrap">
							<div class="product_content_wrap">
								<div class="product_content_introduction_wrap">
									<div class="product_content_introduction_left_wrap">
										<div class="product_content_introduction_left_img_wrap">
											$product_img_html
										</div>
										<div id="product_content_introduction_left_dot"></div>
										<script>
											$(".product_content_introduction_left_img_wrap").slick({
												 dots: true,		/* 是否有dots */
												 appendDots: '#product_content_introduction_left_dot', /* dot 顯示位置 */
												 infinite: true,		/* 是否能重頭開始播放 */
												 autoplay:true,		/* 是否自動播放 */
												 autoplaySpeed: 4000,		/* 自動播放頻率 */
												 speed:1000,		/* 圖片動畫速度 */
												 arrows:false,		/* 是否有前後箭頭 */
												 slidesToShow: 1,		/* 圖片顯示數量 */
												 slidesToScroll: 1		/* 圖片跳轉數量 */
											});
										</script>
									</div>
									<div class="product_content_introduction_right_wrap">
										<div class="product_content_introduction_right_title_wrap">
											<i class="fao2 fao2-666"></i>
											<div class="product_content_introduction_right_title_navi">
												$product_navi_name
											</div>
											<div class="product_content_introduction_right_title">$product_title</div>
										</div>
										<div class="product_content_introduction_right_spacing"></div>
										<div class="product_content_introduction_right_text_wrap">
											<div class="product_content_introduction_right_text_box">
												$product_t4_html
											</div>
										</div>

										<div class="product_content_member_share_link_wrap">
											<a href="index.php/member/member_share_list" class="product_content_member_share_link">會員體驗分享</a>
										</div>

										<div class="product_content_introduction_right_price_wrap">
											<div class="product_content_introduction_right_price_ori">原價$$product_ori_price</div>
											<div class="product_content_introduction_right_price">$$product_real_price</div>
										</div>
										<div class="product_content_introduction_right_fare_wrap">
											<div class="product_content_introduction_right_fare_title">運費</div>
											<div class="product_content_introduction_right_fare">$product_fare_html</div>
										</div>
								
										<div class="product_content_introduction_right_payment_prompt_wrap">
											● 提供<strong style="color: #d7006f;">貨到付款</strong>服務、<strong style="color: #d7006f;">信用卡付款</strong>服務(經由綠界平台)
										</div>

										<div class="product_content_introduction_right_num_wrap">
											<div class="product_content_introduction_right_num_title">數量</div>
											<div class="product_content_introduction_right_num_box">
												<div class="product_content_introduction_right_num_minus_btn">
													<i class="far fa-minus"></i>
												</div>
												<input type="text" class="product_content_introduction_right_num" value="1" name="qty">
												<div class="product_content_introduction_right_num_plus_btn">
													<i class="far fa-plus"></i>
												</div>
											</div>
										</div>
										<script>
											//增加按鈕
											$(".product_content_introduction_right_num_plus_btn").click(function(){
												var qty_now = $(this).siblings("input[name=qty]").val();

												qty_now++;

												$(this).siblings("input[name=qty]").val(qty_now);
												checked_cart_total();
											});

											//減少按鈕
											$(".product_content_introduction_right_num_minus_btn").click(function(){
												var qty_now = $(this).siblings("input[name=qty]").val();

												if( qty_now > 1)
												{
													qty_now--;

													$(this).siblings("input[name=qty]").val(qty_now);
													checked_cart_total();
												}
											});

											$('input[name=qty]').change(function(){
												var qty_value = $(this).val();

												var checked_number = /^[0-9]*$/;
												if( !checked_number.test(qty_value) || qty_value == "")
												{
													//alert("請輸入正確的數字!!");
													$(this).val("1");
													return false;
												}
												else if(qty_value < 1)
												{
													//alert("數量請勿小於1 !!");
													$(this).val("1");
													return false;
												}
												
												checked_cart_total();
											});
										</script>

										<div class="quick_porduct_right_btn_wrap">
											<input type="hidden" name="product_id" value="$product_id">

											<button type="button" class="btn2 quick_cart_scroll_btn">-立即購買-</button>
											<a href="index.php/load_page/get_product_list" class="btn2">-更多商品-</a>
										</div>
										<script>
											$('.quick_cart_scroll_btn').click(function(){
												var auto_scroll = $(".quick_cart_wrap").offset().top;
												
												$("html, body").stop().animate({scrollTop:auto_scroll}, 500, 'swing' );
											});
										</script>
									</div>
								</div>	
								$product_ck1_html
							</div>
						</div>
EchoData;
						
						/*===購物車鑲嵌===*/
						//取得會員資料
						$member_name = '';
						$member_address = '';
						$member_address_city_area = '';
						$member_address_city_location = '';
						$member_mobile = '';
						$member_email = '';
						$mid = $this->session->userdata('mid');
						if( $mid != null )
						{
							$this->db->where('competence','正常');
							$this->db->where('mid',$mid);
							$query = $this->db->get('member');
							$member_data = $query->result();
							
							if(count($member_data) > 0)
							{
								$member_name 					= $member_data[0]->name;
								$member_address 				= $member_data[0]->address;
								$member_address_city_area 		= $member_data[0]->address_city_area;
								$member_address_city_location 	= $member_data[0]->address_city_location;
								$member_mobile 					= $member_data[0]->mobile;
								$member_email 					= $member_data[0]->email;
							}
						}
						
						if($product_fare == 0)
						{
							$product_fare_html2 = '<span class="free_fare_text">免運費<span>';
							$free_fare_text = '(免運費)';
						}
						else
						{
							$product_fare_html2 = '運費 $' . $product_fare;
							$free_fare_text = '';
						}
						
						echo <<<EchoData
						<div class="quick_cart_wrap">
							<div class="cart_box">
								<div class="cart_box_title">訂購人資料</div>
								<div class="cart_box_spacing"></div>
								<div class="main_form_wrap">
									<div class="main_form_group">
										<div class="main_form_title_wrap">
											<div class="main_form_title_icon">
												<i class="fal fa-user"></i>
											</div>
											<div class="main_form_title">
												姓名
											</div>
											<div class="main_form_title_required">*</div>
										</div>
										<div class="main_form_input_wrap">
											<input type="text" class="main_form_input_md" placeholder="請輸入姓名" value="$member_name" name="name" required>
										</div>
									</div>

									<div class="main_form_group">
										<div class="main_form_title_wrap">
											<div class="main_form_title_icon">
												<i class="fas fa-map-marker-alt"></i>
											</div>
											<div class="main_form_title">
												聯絡地址
											</div>
											<div class="main_form_title_required">*</div>
										</div>
										<div class="main_form_input_wrap">
											<select class="main_form_input" name="address_city_area" required>
												<option value="">請選擇縣市</option>
											</select>
											<select class="main_form_input" name="address_city_location" required>
												<option value="">請選擇鄉鎮市區</option>
											</select>
											<input type="text" class="main_form_input_xs" placeholder="郵遞區號" name="address_code" disabled>

											<input type="text" class="main_form_input_md" placeholder="路/巷/弄/號/樓" value="$member_address" name="address" required>
										</div>
										<script>
											$(document).ready(function(){
												get_city_area();
											});

											$("select[name=address_city_area]").change(function(){
												get_city_location();
												$("input[name=address_code]").val("");
											});

											$("select[name=address_city_location]").change(function(){
												var city_location_value = $("select[name=address_city_location]").val();
												if(city_location_value != "none")
												{
													city_location_value = city_location_value.split('#$#');
													$("input[name=address_code]").val(city_location_value[0]);
												}
											});

											//取得縣市資料
											function get_city_area()
											{
												$.ajax({
													type:'POST',
													url:'index.php/get_address/city_area',
													data:{  },
													success: function(data)
													{
														$("select[name=address_city_area]").html(data);
														auto_get_city_area();
													},
													error: function()
													{
														//alert("AJAX錯誤!");
													}
												});
											}

											//取得鄉鎮資料
											function get_city_location()
											{
												var city_area_value = $("select[name=address_city_area]").val();

												$.ajax({
													type:'POST',
													url:'index.php/get_address/city_location',
													data:{city : city_area_value },
													success: function(data)
													{
														$("select[name=address_city_location]").html(data);
													},
													error: function()
													{
														//alert("AJAX錯誤!");
													}
												});
											}

											function auto_get_city_area()
											{
												var city_area_value = "$member_address_city_area";
												$("select[name=address_city_area] option").each(function(){
													if($(this).val() == city_area_value)
													{
														$(this).attr("selected",true);
													}
												});
												auto_get_city_location();
											}

											function auto_get_city_location()
											{
												var city_area_value = $("select[name=address_city_area]").val();

												$.ajax({
													type:'POST',
													url:'index.php/get_address/city_location',
													data:{city : city_area_value },
													success: function(data)
													{
														$("select[name=address_city_location]").html(data);

														var city_location_value = "$member_address_city_location";
														$("select[name=address_city_location] option").each(function(){
															if($(this).val() == city_location_value)
															{
																$(this).attr("selected",true);
															}
														});

														//取得郵遞區號
														var city_location_value = $("select[name=address_city_location]").val();
														if(city_location_value != "none")
														{
															city_location_value = city_location_value.split('#$#');
															$("input[name=address_code]").val(city_location_value[0]);
														}
													},
													error: function()
													{
														//alert("AJAX錯誤!");
													}
												});
											}
										</script>
									</div>

									<div class="main_form_group">
										<div class="main_form_title_wrap">
											<div class="main_form_title_icon main_form_title_icon_phone">
												<i class="far fa-phone"></i>
											</div>
											<div class="main_form_title">
												手機號碼
											</div>
											<div class="main_form_title_required">*</div>
										</div>
										<div class="main_form_input_wrap">
											<input type="text" class="main_form_input_md" placeholder="請輸入手機號碼" value="$member_mobile" name="mobile" required title="請輸入10碼手機號碼" pattern="^09[0-9]{8}$" maxlength="10" >
										</div>
									</div>

									<div class="main_form_group">
										<div class="main_form_title_wrap">
											<div class="main_form_title_icon main_form_title_icon_phone">
												<i class="fas fa-envelope"></i>
											</div>
											<div class="main_form_title">
												聯絡信箱
											</div>
										</div>
										<div class="main_form_input_wrap">
											<input type="text" class="main_form_input_md" placeholder="請輸入聯絡信箱" value="$member_email" name="email">
										</div>
									</div>
								</div>
							</div>

							<div class="cart_box">
								<div class="cart_box_title">訂單備註</div>
								<div class="cart_box_spacing"></div>
								<div class="cart_box_textarea_wrap">
									<textarea name="remarks"></textarea>
								</div>
							</div>

							<div class="cart_box">
								<div class="cart_box_title">付款方式</div>
								<div class="cart_box_spacing"></div>
								<div class="main_form_payment_wrap">
									<select class="main_form_input_md" name="payment_type">
										<option value="cash_on_delivery">貨到付款$free_fare_text</option>
										<option value="CREDIT">信用卡付費$free_fare_text</option>
										<option value="ATM">ATM付費$free_fare_text</option>
										<option value="CVS">超商代碼$free_fare_text</option>
									</select>
								</div>
							</div>
							
							<div class="cart_total_wrap">
								<div class="cart_total_title_wrap">
									<div class="cart_total_title_icon">$</div>
									<div class="cart_total_title">訂單總計</div>
								</div>
								<div class="cart_total_spacing"></div>
								<div class="cart_total_price_wrap">
									<div class="cart_total_price quick_cart_price">商品單價 $$product_real_price</div>
									<div class="cart_total_price quick_cart_qty">數量 0</div>
									<div class="cart_total_price quick_cart_fare">$product_fare_html2</div>
								</div>
								<div class="cart_total_spacing"></div>
								<div class="cart_total_box quick_cart_total">
									總計 $0
								</div>
								<div class="cart_total_spacing"></div>
								<div class="cart_total_btn_wrap">
									<button type="submit" class="btn-lg btn-success" style="display:block; margin:20px auto 30px auto;">-確認結帳-</button>
								</div>
								<script>
									function checked_cart_total()
									{
										var product_price = $product_real_price;
										var product_fare = $product_fare;
										var product_qty = $('input[name=qty]').val();
										var total = (product_price * product_qty) + product_fare;
										
										$('.quick_cart_price').html( '商品單價 $' +  product_price );
										$('.quick_cart_qty').html( '數量 ' +  product_qty);
										if( product_fare == 0 )
										{
											$('.quick_cart_fare').html( '<span class="free_fare_text">免運費<span>');
										}
										else
										{
											$('.quick_cart_fare').html( '運費 $' +  product_fare );
										}
										$('.quick_cart_total').html( '總計 $' +  total);
									}

									checked_cart_total();
								</script>
							</div>
						</div>
						<div class="btn_wrap_center">
							<a href="index.php/load_page/get_news_list" class="btn1 mt-5">-回上頁-</a>
						</div>
					</div>
				</form>
EchoData;
						$checked_has_product = true;
					}
				}
			}
			if(!$checked_has_product)
			{
				echo <<<EchoData
				<div class="btn_wrap_center">
					<a href="index.php/load_page/get_news_list" class="btn1">-回上頁-</a>
				</div>
EchoData;
			}
			?>
			<div class="top_button_fix"></div>
		</div>
	</div>
</section>

<script>
	var window_width = $(window).width();
	if(window_width > 991){
		ani2("page_ani_wrap","ani_slideTop",0.7);
	}
</script>

<?php //頁面下方立即聯絡按鈕，僅出現在sm以下 ?>
<a href="tel:0918196698" class="fixed-bottom bg-success text-center pt-3 pb-3 text-white h4 mb-0 d-sm-block d-md-none">立即聯絡</a>
<script>
	$(document).on("ready",function(){
		$('#foot_bottom').append("<div class=\"d-md-none d-sm-block\" style=\"height: 60px; clear: both;\"></div>");
	})	
</script>
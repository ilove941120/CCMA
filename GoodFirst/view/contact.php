<?php include "headPage.php" ?>
<link rel="stylesheet" href="../css/contact.css">


<!-- 主要內容 -->
<div class="content">
        <div class="container">
            <div class="contactTitle titleAnimation1">
                聯絡我們CONTACT US
            </div>
            <div class="contactTitleRWD titleAnimationRWD1">
                <div class="chineseTitle">聯絡我們</div>
                <div class="englishTitle">CONTACT US</div>
            </div>
            <div class="contactContent">
                <span>您回饋的建議與讚美都是我們成長與保持熱情的動力</span>
                <br>
                訂位專線 (03)5123456
                <br>
                地址 新竹縣竹北市環北路一段232號
            </div>
            <div class="contectSubTitleRWD">
                您回饋的建議與讚美都是我們成長與保持熱情的動力
            </div>
            <div class="contactMainBlock">
                <div class="companyMap">
                    <iframe class="mapStyle"
                    frameborder="0" 
                    style="border:0" 
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA1pjEmAoe0XG4iW6x1qQ8ZnEcDQdvhHBc&q=新竹縣竹北市環北路一段232號" 
                    allowfullscreen>
                </iframe>
                </div>
                <div class="messageBlockRWD">
                    訂位專線 (03)5123456
                    <br>
                    地址 新竹縣竹北市環北路一段232號
                </div>
                <div class="formBlock">
                    <form action="#" id="askForm" method="POST">
                        <div class="formItem">
                            <label for="askProject" class="formTilteStyle">詢問項目</label>
                            <select name="" id="askProject" class="inputStyle">
                                <option value="1">餐點問題</option>
                                <option value="2">交通問題</option>
                                <option value="3">服務問題</option>
                            </select>
                        </div>
                        <div class="formItem">
                            <label for="VisitorName"  class="formTilteStyle">姓名</label>
                            <input type="text" id="VisitorName" name="VisitorName" class="inputStyle" placeholder="中文姓名">
                        </div>
                        <div class="formItem">
                            <label for="VisitorPhone"  class="formTilteStyle">手機</label>
                            <input type="text" id="VisitorPhone" name="VisitorPhone" class="inputStyle" placeholder="手機號碼">
                        </div>
                        <div class="formItem">
                            <label for="VisitorEmail"  class="formTilteStyle">E-MAIL</label>
                            <input type="email" id="VisitorEmail" name="VisitorEmail" class="inputStyle" placeholder="電子信箱">
                        </div>
                        <div class="formItem">
                            <label for="askDescription"  class="formTilteStyle" >詢問說明</label>
                            <textarea name="" id="askDescription" class="textareaStyle" name="askDescription" cols="30" rows="5" placeholder="您想詢問的問題"></textarea>
                        </div>
                        <div class="formItem">
                            <div class="formRight">
                                <div class="verificationBlock">
                                    <div class="g-recaptcha" data-sitekey="AIzaSyA1pjEmAoe0XG4iW6x1qQ8ZnEcDQdvhHBc"></div>
                                </div>
                                <div class="sentButton buttonAnimation">確認送出</div>
                                <div class="sentButtonRWD buttonAnimationRWD">確認送出</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        // 表單驗證
        var chineseNameCheck = /^[\u4E00-\u9FA5]+$/;
        var phoneCheck = /^[0][9]\d{8}$/
        var emailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var textareaCheck = "";
        // 點擊驗證表單
        $(".sentButton").click(function(){
            if($("#VisitorName").val() =="" || chineseNameCheck.test($("#VisitorName").val()) == false){
                alert("問題不可以空白1")
                return false;

            }
            if($("#VisitorPhone").val() =="" || phoneCheck.test($("#VisitorPhone").val()) == false){
                alert("問題不可以空白2")
                return false;

            }
            if($("#VisitorEmail").val() =="" || emailCheck.test($("#VisitorEmail").val()) == false){
                alert("問題不可以空白3")
                return false;

            }
            if($("#askDescription").val() ==""){
                alert("問題不可以空白4")
                return false;

            }
            
            else {
                $("#askForm").submit();
            }
        })
        $(".sentButtonRWD").click(function(){
            if($("#VisitorName").val() =="" || chineseNameCheck.test($("#VisitorName").val()) == false){
                alert("名字不符合格式")
                return false;
            }
            if($("#VisitorPhone").val() =="" || phoneCheck.test($("#VisitorPhone").val()) == false){
                alert("電話不符合格式")
                return false;
            }
            if($("#VisitorEmail").val() =="" || emailCheck.test($("#VisitorEmail").val()) == false){
                alert("信箱不符合格式")
                return false;
            }
            if($("#askDescription").val() ==""){
                alert("問題不可以空白4")
                return false;
            }
            else {
                $("#askForm").submit();
            }
        })
        //  點擊清空input的val()並且移除錯誤浮水印
        $("#VisitorName").click(function(){
            if($(this).hasClass("inputWatermark")){
                $(this).val("")
                $(this).removeClass("inputWatermark")
            }
        })
        $("#VisitorPhone").click(function(){
            if($(this).hasClass("inputWatermark")){
                $(this).val("")
                $(this).removeClass("inputWatermark")
            }
        })
        $("#VisitorEmail").click(function(){
            if($(this).hasClass("inputWatermark")){
                $(this).val("")
                $(this).removeClass("inputWatermark")
            }
        })
        $("#askDescription").click(function(){
            if($(this).hasClass("inputWatermark")){
                $(this).val("")
                $(this).removeClass("inputWatermark")
            }
        })

        // 地圖高度
        $(document).ready(function(){
            // $(".aboutImg1").width()
            var nw =$(".mapStyle").width()
            $(".mapStyle").height(nw)
        })
        $(window).resize(function(){
            var nw =$(".mapStyle").width()
            $(".mapStyle").height(nw)
        })
        
        $(document).ready(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top
            var buttonAnimationTop = $(".buttonAnimation").offset().top
            var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top

            if( windowTotalTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("leftIn")
            }
            if( windowTotalTop > titleAnimationRWDTop1){
                $(".titleAnimationRWD1").addClass("leftIn")
            }
            if( windowTotalTop > buttonAnimationTop){
                $(".buttonAnimation").addClass("rightIn")
            }
            if( windowTotalTop > buttonAnimationRWDTop){
                $(".buttonAnimationRWD").addClass("rightIn")
            }

        })
        $(document).scroll(function(){
            var windowTop = $(window).height()
            var windowWidth = $(window).width()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top
            var buttonAnimationTop = $(".buttonAnimation").offset().top
            var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top

            if( windowTotalTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("leftIn")
            }
            else{
                $(".titleAnimation1").removeClass("leftIn")

            }
            if( windowTotalTop > titleAnimationRWDTop1){
                $(".titleAnimationRWD1").addClass("leftIn")
            }
            else{
                $(".titleAnimationRWD1").removeClass("leftIn")

            }
            if( windowTotalTop > buttonAnimationTop){
                $(".buttonAnimation").addClass("rightIn")
            }
            else{
                $(".buttonAnimation").removeClass("rightIn")
            }
            if( windowTotalTop > buttonAnimationRWDTop -100){
                $(".buttonAnimationRWD").addClass("centerIn")
            }
            else{
                $(".buttonAnimationRWD").removeClass("centerIn")
            }
            
        
        })
    </script>

<?php include "foot.php" ?>
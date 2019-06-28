<template>
    <div>
        <el-carousel :interval="3000" type="card" height="imgHeight">
        <el-carousel-item v-for="item in imgList" :key="item.id">
            <el-row>
                <el-col :span="24">
                    <img ref="imgHeight" :src="item.idView" class="banner_img" alt="">
                </el-col>
            </el-row>
        </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
// var that=this;
// that.imgHeight = '620px'
// window.onresize = function temp() {
//     // 通过点语法获取img的height属性值
//     that.imgHeight = `${that.$refs.imgHeight['0'].height}px`
// }
export default {
  name: "oneDragon",
  data() {
    return {
        //引入图片
        imgList:[
            {id: 1, idView: require('../../assets/image/banner1.jpg')},
            {id: 2, idView: require('../../assets/image/banner3-1.jpg')},
            {id: 3, idView: require('../../assets/image/banner4-1.jpg')},
            {id: 4, idView: require('../../assets/image/banner5-1.jpg')},
            {id: 5, idView: require('../../assets/image/banner6-1.jpg')},
            {id: 6, idView: require('../../assets/image/banner7-1.jpg')},
            {id: 7, idView: require('../../assets/image/banner8-1.jpg')},
        ]
    };
  },
  methods:{
        
  },
  beforeMount:function(){
      debugger
      this.imgHeight = $(window).width() * 740 / 2560 + 'px';
      if(this.imgHeight > 740) this.imgHeight = 740;
      if(this.imgHeight < 360) this.imgHeight = 360;
  },
};
</script>
<style lang="" scoped>
.banner_img{
    
}
</style>
<template>
  <div>
    <el-select v-model="province" @change="changeProvince" placeholder="请选择省/市">
      <el-option
        v-for="item in province_list"
        :key="item.adcode"
        :label="item.name"
        :value="item.adcode"
      ></el-option>
    </el-select>

    <el-select v-model="city" @change="changeCity" placeholder="请选择城市">
      <el-option
        v-for="item in city_list"
        :key="item.adcode"
        :label="item.name"
        :value="item.adcode"
      ></el-option>
    </el-select>

    <el-select v-model="area" placeholder="请选择市/区/县">
      <el-option
        v-for="item in area_list"
        :key="item.adcode"
        :label="item.name"
        :value="item.adcode"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import * as api from "@/api";
export default {
  data() {
    return {
      province: '',
      province_list: [],
      city: '',
      city_list: [],
      area: '',
      area_list: []
    };
  },

  mounted() {
    this.getRegion()
  },

  methods: {
    changeProvince(val) {
      this.city = ''
      this.city_list = []
      this.area = ''
      this.area_list = []
      this.getRegion(val, 'city')
    },

    changeCity(val){
      this.getRegion(val, 'area')
    },

    getArea(val, level){
      if(level === 'city'){
        this.city_list = val
      } else if (level === 'area'){
        this.area_list = val
      } else {
        this.province_list = val
      }
    },

    getRegion(keywords= '', level) {
      api.areaList(
        { 
          flag: 'extra',
          key: 'ab1fa2c059b254a432d94752bfc0f8c4',
          offset: '35',
          keywords: keywords,
        }
      ).then(res =>{
        return this.getArea(res, level)
      })
    }
  }
};
</script>
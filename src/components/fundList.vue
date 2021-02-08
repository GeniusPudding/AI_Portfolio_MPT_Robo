<template>
  <div class="fund-item-area">
    <ul>
      <li class="thead">
        <ol class="tr">
          <li>類型</li>
          <li>市場</li>
          <li>基金名稱</li>
          <li>投資比重</li>
          <li>投資金額</li>
          <li>&ensp;</li>
        </ol>
      </li>
      <li class="tbody">
        <ol class="tr">
          <li data-title="類型">
            <select>
              <option value="[object Object]">股票</option>
              <option value="[object Object]">債券</option>
              <option value="[object Object]">其他</option>
            </select>
          </li>
          <li data-title="市場">
            <select>
              <option value="[object Object]">新興市場債券型</option>
              <option value="[object Object]">公債型</option>
              <option value="[object Object]">高收益債券型</option>
              <option value="[object Object]">投資等級公司債券型</option>
            </select>
          </li>
          <li data-title="基金名稱">
            <select>
              <option value="[object Object]">
                A813 富蘭克林坦伯頓全球投資系列-公司債基金 A 月配息 美元
              </option>
              <option value="[object Object]">
                A838 富蘭克林坦伯頓全球投資系列-歐洲高收益基金 A 年配息 歐元
              </option>
              <option value="[object Object]">
                A850 富蘭克林坦伯頓全球投資系列-精選收益基金 A 累積型 美元
              </option>
              <option value="[object Object]">
                6509 富蘭克林華美新興趨勢傘型基金之積極回報債券組合基金 累積型
                新台幣
              </option>
              <option value="[object Object]">
                6514 富蘭克林華美全球高收益債券基金 A 累積型 新台幣
              </option>
            </select>
          </li>
          <li data-title="投資比重">
            <input type="text" disabled="disabled" class="text-center isEdit" />
            %
          </li>
          <li data-title="投資金額">
            <input type="number" step="1000" min="5000" class="text-center" />
            元
          </li>
          <li v-if="isEditable" data-title=""><a href="" class="btn">刪除</a></li>
        </ol>
        <ol class="tr">
          <li data-title="類型">
            <select>
              <option value="[object Object]">股票</option>
              <option value="[object Object]">債券</option>
              <option value="[object Object]">其他</option>
            </select>
          </li>
          <li data-title="市場">
            <select>
              <option value="[object Object]">新興市場債券型</option>
              <option value="[object Object]">公債型</option>
              <option value="[object Object]">高收益債券型</option>
              <option value="[object Object]">投資等級公司債券型</option>
            </select>
          </li>
          <li data-title="基金名稱">
            <select>
              <option value="[object Object]">
                A813 富蘭克林坦伯頓全球投資系列-公司債基金 A 月配息 美元
              </option>
              <option value="[object Object]">
                A838 富蘭克林坦伯頓全球投資系列-歐洲高收益基金 A 年配息 歐元
              </option>
              <option value="[object Object]">
                A850 富蘭克林坦伯頓全球投資系列-精選收益基金 A 累積型 美元
              </option>
              <option value="[object Object]">
                6509 富蘭克林華美新興趨勢傘型基金之積極回報債券組合基金 累積型
                新台幣
              </option>
              <option value="[object Object]">
                6514 富蘭克林華美全球高收益債券基金 A 累積型 新台幣
              </option>
            </select>
          </li>
          <li data-title="投資比重">
            <input type="text" disabled="disabled" class="text-center isEdit" />
            %
          </li>
          <li data-title="投資金額">
            <input type="number" step="1000" min="5000" class="text-center" />
            元
          </li>
          <li v-if="isEditable" data-title=""><a href="" class="btn">刪除</a></li>
        </ol>
        <ol class="tr">
          <li data-title="類型">
            <select>
              <option value="[object Object]">股票</option>
              <option value="[object Object]">債券</option>
              <option value="[object Object]">其他</option>
            </select>
          </li>
          <li data-title="市場">
            <select>
              <option value="[object Object]">新興市場債券型</option>
              <option value="[object Object]">公債型</option>
              <option value="[object Object]">高收益債券型</option>
              <option value="[object Object]">投資等級公司債券型</option>
            </select>
          </li>
          <li data-title="基金名稱">
            <select>
              <option value="[object Object]">
                A813 富蘭克林坦伯頓全球投資系列-公司債基金 A 月配息 美元
              </option>
              <option value="[object Object]">
                A838 富蘭克林坦伯頓全球投資系列-歐洲高收益基金 A 年配息 歐元
              </option>
              <option value="[object Object]">
                A850 富蘭克林坦伯頓全球投資系列-精選收益基金 A 累積型 美元
              </option>
              <option value="[object Object]">
                6509 富蘭克林華美新興趨勢傘型基金之積極回報債券組合基金 累積型
                新台幣
              </option>
              <option value="[object Object]">
                6514 富蘭克林華美全球高收益債券基金 A 累積型 新台幣
              </option>
            </select>
          </li>
          <li data-title="投資比重">
            <input type="text" v-model="percent" disabled="disabled" class="text-center isEdit" />
            %
          </li>
          <li data-title="投資金額">
            <input type="number" step="1000" min="5000" class="text-center" />
            元
          </li>
          <li v-if="isEditable" data-title=""><a class="btn">刪除</a></li>
        </ol>
      </li>
      <li class="more">
        <a href="" class="btn">新增基金</a>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
//抓後端資料, 只有在myportfolio自訂頁面可以有修改功能, v-for
import { mapFields } from "vuex-map-fields"
export default {
  data () {
    return {
      percent: 10
    }
  },
  computed: {
    ...mapFields(['isEditable'])
  },
  mounted() {
    console.log('fundlist mounted')
    if (this.$route.name === "myportfolio"){
      this.isEditable = true
    } else {
      this.isEditable = false
    }
    calPercent()

  },
  methods: {
    calPercent () {
      this.percent = 33
    }
  }
}
</script>
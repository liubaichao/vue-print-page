<template>
  <div>
    <div class="search-container yh-institution-container">
      <el-button type="warning" size="mini" class="ml10 mt10" @click="showDetail()">预览ALL</el-button>
      <el-button type="warning" size="mini" class="ml10 mt10" @click="showDetail(1)">预览one</el-button>
    </div>

    <el-dialog fullscreen :show-close='false' :visible="dialogVisible" :before-close="handleClose">
      <div class="flex alic justs" slot="title">
        <span>签约表</span>
        <div>
          <el-button type="success" @click="doPrint">打 印</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </div>
      </div>
      <div id="content">
        <div class="flex alic colu paging" v-for="(rowInfo,index) in infoData" :key='index'>
          <h1 class="tc mb20 pt20 mt20">签约表</h1>
          <table border="1" cellspacing="0" cellpadding="0" class="table tc">
            <tr>
              <td>姓名</td>
              <td>{{rowInfo.sign.name}}</td>
              <td>医保卡号</td>
              <td>{{rowInfo.sign.medicalCard}}</td>
            </tr>
            <tr>
              <td>身份证</td>
              <td>{{rowInfo.sign.idcard}}</td>
              <td>电话</td>
              <td>{{rowInfo.sign.mobile}}</td>
            </tr>
            <tr>
              <td>居住地址</td>
              <td colspan="3">{{rowInfo.sign.residentialProvince}}-{{rowInfo.sign.residentialCounty}}-{{rowInfo.sign.residentialCity}}-{{rowInfo.sign.residentialAddress}}</td>
            </tr>
            <tr>
              <td>二级医院</td>
              <td>{{rowInfo.sign.hospitalLevelTwoName}}</td>
              <td colspan="2">其他：{{rowInfo.sign.hospitalLevelThreedetail}}</td>
            </tr>
            <tr>
              <td>三级医院</td>
              <td>{{rowInfo.sign.hospitalLevelThreeName}}</td>
              <td colspan="2">其他：{{rowInfo.sign.hospitalLevelThreedetail}}</td>
            </tr>
            <tr>
              <td>签约医生</td>
              <td>{{rowInfo.sign.signDoctorName}}</td>
              <td>其他医生</td>
              <td>{{rowInfo.sign.otherDoctorName}}</td>
            </tr>
          </table>

          <h1 class="pt20 tc mb20">信息表</h1>
          <table border="1" cellspacing="0" cellpadding="0" class="table">
            <tr>
              <td>
                <span class="colorRed">姓名：</span>
                <span>{{rowInfo.base.name}}</span>
              </td>
              <td>
                <span class="colorRed">性别：</span>
                <label v-for="item in dictObj.sex" :key='item.name'>  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.sexCode' :checked='item.value == rowInfo.base.sexCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td colspan="2">
                <span class="colorRed">身份证号：</span>
                <span>{{rowInfo.base.idcard}}</span>
              </td>
            </tr>
            <tr>
              <td class="fz14">
                <span class="colorRed">民族：</span>
                <label> 
                  <span>汉</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='rowInfo.base.nationalityCode == 1' :checked='rowInfo.base.nationalityCode == 1'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
                <label> 
                  <span>其他</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='rowInfo.base.nationalityCode != 1' :checked='rowInfo.base.nationalityCode != 1'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td>
                <div class="colorRed">婚姻类型：</div>
                <label v-for="item in dictObj.marriage" :key='item.name' class="inline fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.marriageCode' :checked='item.value == rowInfo.base.marriageCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td colspan="2">
                <span class="colorRed">社保卡号：</span>
                <span>{{rowInfo.base.medicalCard}}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="colorRed">文化程度：</div>
                <label v-for="item in dictObj.degree" :key='item.name' class="inline fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.degreeCode' :checked='item.value == rowInfo.base.degreeCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td>
                <div>医疗支付：</div>
                <label v-for="item in dictObj.insurance" :key='item.name' class="inline fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.insuranceCode' :checked='item.value == rowInfo.base.insuranceCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td>
                <div>就业状况：</div>
                <label v-for="item in dictObj.workStatus" :key='item.name' class="inline fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.workStatusCode' :checked='item.value == rowInfo.base.workStatusCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <span>职业：</span>
                <label v-for="item in dictObj.occupation" :key='item.name' class="fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.occupationCode' :checked='item.value == rowInfo.base.occupationCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <span class="colorRed">固定电话：</span>
                <span>{{rowInfo.base.phone}}</span>
              </td>
              <td>
                <span class="colorRed">手机：</span>
                <span>{{rowInfo.base.mobile}}</span>
              </td>
              <td>联系人姓名：{{rowInfo.base.linkName}}</td>
              <td>联系人电话：{{rowInfo.base.linkPhone}}</td>
            </tr>
            <tr>
              <td>
                <div>血型：</div>
                <label v-for="item in dictObj.bloodType" :key='item.name' class="inline fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.bloodTypeCode' :checked='item.value == rowInfo.base.bloodTypeCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td>
                <div>RH血型：</div>
                <label v-for="item in dictObj.rhBlood" :key='item.name' class="inline fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.rhBloodCode' :checked='item.value == rowInfo.base.rhBloodCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td>
                <div class="colorRed">残疾情况：</div>
                <label v-for="item in dictObj.disability" :key='item.name' class="inline fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='item.value == rowInfo.base.disabilityCode' :checked='item.value == rowInfo.base.disabilityCode'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
              <td>
                <span class="colorRed">残疾证号：</span>
                <span>{{rowInfo.base.disabilityNumber}}</span>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <span class="colorRed">户籍地址：</span>
                <span>{{rowInfo.base.permanentProvince}}-{{rowInfo.base.permanentCounty}}-{{rowInfo.base.permanentCity}}-{{rowInfo.base.permanentAddress}}</span>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <span class="colorRed">居住地址：</span>
                <span>{{rowInfo.base.residentialProvince}}-{{rowInfo.base.residentialCounty}}-{{rowInfo.base.residentialCity}}-{{rowInfo.base.residentialAddress}}</span>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <span>环境暴露类别：</span>
                <label v-for="item in dictObj.environmentalLevel" :key='item.name' class="fz14">  
                  <span>{{item.name}}</span>
                  <input type="checkbox" class="mr5" disabled checked v-if='rowInfo.base.environmentalLevel.find(n=>n.value == item.value)' :checked='rowInfo.base.environmentalLevel.find(n=>n.value == item.value)'> 
                  <input type="checkbox" class="mr5" disabled v-else> 
                </label>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="lh24">
                <div class="flex">
                  <div class="borderRight colorRed pr10">
                    <div class="txtsa">疾病史</div>
                    <div>确诊日期</div>
                  </div>
                  <div class="ml10" v-for="item in dictObj.diseaseHistory" :key='item.name'>
                    <label class="fz14">  
                      <span>{{item.name}}</span>
                      <input type="checkbox" class="mr5" disabled checked v-if='rowInfo.base.diseaseHistory.find(n=>n.value == item.value)' :checked='rowInfo.base.diseaseHistory.find(n=>n.value == item.value)'> 
                      <input type="checkbox" class="mr5" disabled v-else> 
                    </label>
                    <div>{{rowInfo.base.diseaseHistory.find(n=>n.value == item.value)&&rowInfo.base.diseaseHistory.find(n=>n.value == item.value).diagnosisTime}}</div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>过敏史：{{rowInfo.base.allergyHistory}}</td>
              <td>手术史：{{rowInfo.base.operationHistory}}</td>
              <td>外伤史：{{rowInfo.base.traumaHistory}}</td>
              <td>输血史：{{rowInfo.base.bloodTransfusionHistory}}</td>
            </tr>
            <tr>
              <td colspan="2">
                <span class="colorRed">家族史：</span>
                <span>{{rowInfo.base.familyHistory}}</span>
              </td>
              <td colspan="2">遗传病史：{{rowInfo.base.geneticDiseasesHistory}}</td>
            </tr>
          </table>
          <el-divider class="printHide">第{{index+1}}页</el-divider>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getInfoById ,getAllInfo } from '@/api/signStatistics'
// import { getDicts } from '@/api/dict'
import printCss from './printCss.js'
import '../../assets/css/print.css'

export default {
  // register the component
  data() {
    return {
      dialogVisible:false,
      infoData:[],
      dictObj:{}
    }
  },
  created() {

  },
  methods: {
    doPrint(){
      const el = document.getElementById('content');
      //删除上一个 start
      const del = document.getElementById('iframe')
      if(del){document.body.removeChild(del);}
      //删除上一个 end
      const iframe = document.createElement('IFRAME');
      let doc = null;
      iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:500px;top:500px;');
      iframe.id = 'iframe'
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      //添加样式 start
      // doc.write('<LINK rel="stylesheet" type="text/css" href="css/print.css">'); 此方法单页面无效，心态炸了，直接写js导出css字符串解决
      doc.write(`<style>${printCss}</style>`);
      //添加样式 end
      doc.write(el.innerHTML);
      doc.close();
      // 获取iframe的焦点，从iframe开始打印
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      if (navigator.userAgent.indexOf("MSIE") > 0){ document.body.removeChild(iframe); }
    },
    getDicts(){ //模拟数据字典接口
      return new Promise((rej,err)=>{
        let data = {
          "insurance": [
            {
              "value": "01",
              "name": "镇保",
              "simpleValue": "镇保"
            },
            {
              "value": "02",
              "name": "居保",
              "simpleValue": "居保"
            },
            {
              "value": "03",
              "name": "农合",
              "simpleValue": "农合"
            },
            {
              "value": "04",
              "name": "帮困",
              "simpleValue": "帮困"
            },
            {
              "value": "05",
              "name": "商保",
              "simpleValue": "商保"
            },
            {
              "value": "06",
              "name": "自费",
              "simpleValue": "自费"
            }
          ],
          "workStatus": [
            {
              "value": "01",
              "name": "学生",
              "simpleValue": "学生"
            },
            {
              "value": "02",
              "name": "无业",
              "simpleValue": "无业"
            },
            {
              "value": "03",
              "name": "退休",
              "simpleValue": "退休"
            },
            {
              "value": "999",
              "name": "其他",
              "simpleValue": "其"
            }
          ],
          "diseaseHistory": [
            {
              "value": "01",
              "name": "高血压",
              "simpleValue": "高血压"
            },
            {
              "value": "02",
              "name": "糖尿病",
              "simpleValue": "糖尿病"
            },
            {
              "value": "03",
              "name": "慢阻肺",
              "simpleValue": "慢阻肺"
            },
            {
              "value": "04",
              "name": "肿瘤",
              "simpleValue": "肿瘤"
            },
            {
              "value": "05",
              "name": "脑卒中",
              "simpleValue": "脑卒中"
            },
            {
              "value": "999",
              "name": "其他",
              "simpleValue": "其"
            }
          ],
          "occupation": [
            {
              "value": "01",
              "name": "企事业",
              "simpleValue": "企事业"
            },
            {
              "value": "02",
              "name": "技术员",
              "simpleValue": "技术员"
            },
            {
              "value": "03",
              "name": "办事员",
              "simpleValue": "办事员"
            },
            {
              "value": "04",
              "name": "商业服务",
              "simpleValue": "商业服务"
            },
            {
              "value": "05",
              "name": "农林牧渔",
              "simpleValue": "农林牧渔"
            },
            {
              "value": "06",
              "name": "生产运输",
              "simpleValue": "生产运输"
            },
            {
              "value": "07",
              "name": "军人",
              "simpleValue": "军人"
            },
            {
              "value": "999",
              "name": "其他",
              "simpleValue": "其"
            }
          ],
          "nationality": [
            {
              "value": "01",
              "name": "汉族",
              "simpleValue": "汉"
            },
            {
              "value": "02",
              "name": "其他族",
              "simpleValue": "其他"
            },
          ],
          "marriage": [
            {
              "value": "1",
              "name": "未婚",
              "simpleValue": "未"
            },
            {
              "value": "2",
              "name": "已婚",
              "simpleValue": "已"
            },
            {
              "value": "3",
              "name": "丧偶",
              "simpleValue": "丧"
            },
            {
              "value": "4",
              "name": "离婚",
              "simpleValue": "离"
            }
          ],
          "disability": [
            {
              "value": "01",
              "name": "无",
              "simpleValue": "无"
            },
            {
              "value": "999",
              "name": "其他",
              "simpleValue": "其"
            }
          ],
          "sex": [
            {
              "value": "1",
              "name": "男",
              "simpleValue": "男"
            },
            {
              "value": "2",
              "name": "女",
              "simpleValue": "女"
            },
            {
              "value": "9",
              "name": "未知",
              "simpleValue": "未知"
            }
          ],
          "rhBlood": [
            {
              "value": "01",
              "name": "(+)",
              "simpleValue": "+"
            },
            {
              "value": "02",
              "name": "(-)",
              "simpleValue": "-"
            }
          ],
          "degree": [
            {
              "value": "01",
              "name": "研究生",
              "simpleValue": "研"
            },
            {
              "value": "02",
              "name": "本科",
              "simpleValue": "本"
            },
            {
              "value": "03",
              "name": "大专",
              "simpleValue": "专"
            },
            {
              "value": "04",
              "name": "职校",
              "simpleValue": "职"
            },
            {
              "value": "05",
              "name": "普高",
              "simpleValue": "高"
            },
            {
              "value": "06",
              "name": "初中",
              "simpleValue": "初"
            },
            {
              "value": "07",
              "name": "小学",
              "simpleValue": "小"
            },
            {
              "value": "999",
              "name": "其他",
              "simpleValue": "其"
            }
          ],
          "environmentalLevel": [
            {
              "value": "00",
              "name": "无",
              "simpleValue": "无"
            },
            {
              "value": "01",
              "name": "化学品",
              "simpleValue": "化学品"
            },
            {
              "value": "02",
              "name": "毒物",
              "simpleValue": "毒物"
            },
            {
              "value": "03",
              "name": "射线",
              "simpleValue": "射线"
            },
            {
              "value": "04",
              "name": "不详",
              "simpleValue": "不详"
            },
            {
              "value": "999",
              "name": "其他",
              "simpleValue": "其"
            }
          ],
          "bloodType": [
            {
              "value": "01",
              "name": "A型",
              "simpleValue": "A"
            },
            {
              "value": "02",
              "name": "B型",
              "simpleValue": "B"
            },
            {
              "value": "03",
              "name": "O型",
              "simpleValue": "O"
            },
            {
              "value": "04",
              "name": "AB型",
              "simpleValue": "AB"
            },
            {
              "value": "05",
              "name": "不详",
              "simpleValue": "不详"
            }
          ]
        }
        rej(data)
      })
    },
    getInfoById(){//模拟获取一个数据
      return new Promise((rej,err)=>{
        let data = {
          "sign": {
            "name": "马现书",
            "medicalCard": "",
            "idcard": "370829198101163252",
            "mobile": "phone",
            "permanentProvince": "北京",
            "permanentCity": "北京市",
            "permanentCounty": "东城区",
            "permanentAddress": "嘉祥镇杜马庄村177号",
            "residentialProvince": "北京",
            "residentialCity": "北京市",
            "residentialCounty": "东城区",
            "residentialAddress": "吨吨吨",
            "hospitalLevelTwoName": "",
            "hospitalLevelTwoDetail": "",
            "hospitalLevelTwoId": "",
            "hospitalLevelThreeName": "",
            "hospitalLevelThreeId": "",
            "hospitalLevelThreedetail": null,
            "signDoctorName": "南山",
            "otherDoctorName": ""
          },
          "base": {
            "name": "马现书",
            "sexCode": null,
            "idcard": "370829198101163252",
            "nationalityCode": null,
            "marriageCode": null,
            "medicalCard": "",
            "degreeCode": "01",
            "insuranceCode": "",
            "workStatusCode": "",
            "occupationCode": "",
            "phone": "phone",
            "mobile": "phone",
            "bloodTypeCode": "01",
            "rhBloodCode": "",
            "disabilityCode": "01",
            "disabilityNumber": "10000000010",
            "environmentalLevel": [
              {
                "value": "00",
                "name": "无",
                "other": null
              },
              {
                "value": "01",
                "name": "化学品",
                "other": null
              },
              {
                "value": "03",
                "name": "射线",
                "other": null
              }
            ],
            "diseaseHistory": [
              {
                "value": "00",
                "name": "无",
                "other": null,
                "diagnosisTime": "2020-01-15"
              }
            ],
            "permanentProvince": "北京",
            "permanentCity": "北京市",
            "permanentCounty": "东城区",
            "permanentAddress": "嘉祥镇杜马庄村177号",
            "residentialProvince": "北京",
            "residentialCity": "北京市",
            "residentialCounty": "东城区",
            "residentialAddress": "吨吨吨",
            "allergyHistory": "",
            "operationHistory": "",
            "traumaHistory": "",
            "bloodTransfusionHistory": "",
            "familyHistory": "",
            "geneticDiseasesHistory": "",
            "linkName": "崔永郑",
            "linkPhone": "19512256806"
          }
        }
        rej(data)
      })
    },
    getAllInfo(){//模拟获取所有数据
      return new Promise((rej,err)=>{
        let data = [
          {
          "sign": {
            "name": "马现书",
            "medicalCard": "",
            "idcard": "370829198101163252",
            "mobile": "phone",
            "permanentProvince": "北京",
            "permanentCity": "北京市",
            "permanentCounty": "东城区",
            "permanentAddress": "嘉祥镇杜马庄村177号",
            "residentialProvince": "北京",
            "residentialCity": "北京市",
            "residentialCounty": "东城区",
            "residentialAddress": "吨吨吨",
            "hospitalLevelTwoName": "",
            "hospitalLevelTwoDetail": "",
            "hospitalLevelTwoId": "",
            "hospitalLevelThreeName": "",
            "hospitalLevelThreeId": "",
            "hospitalLevelThreedetail": null,
            "signDoctorName": "南山",
            "otherDoctorName": ""
          },
          "base": {
            "name": "马现书",
            "sexCode": null,
            "idcard": "370829198101163252",
            "nationalityCode": null,
            "marriageCode": null,
            "medicalCard": "",
            "degreeCode": "01",
            "insuranceCode": "",
            "workStatusCode": "",
            "occupationCode": "",
            "phone": "phone",
            "mobile": "phone",
            "bloodTypeCode": "01",
            "rhBloodCode": "",
            "disabilityCode": "01",
            "disabilityNumber": "10000000010",
            "environmentalLevel": [
              {
                "value": "00",
                "name": "无",
                "other": null
              },
              {
                "value": "01",
                "name": "化学品",
                "other": null
              },
              {
                "value": "03",
                "name": "射线",
                "other": null
              }
            ],
            "diseaseHistory": [
              {
                "value": "00",
                "name": "无",
                "other": null,
                "diagnosisTime": "2020-01-15"
              }
            ],
            "permanentProvince": "北京",
            "permanentCity": "北京市",
            "permanentCounty": "东城区",
            "permanentAddress": "嘉祥镇杜马庄村177号",
            "residentialProvince": "北京",
            "residentialCity": "北京市",
            "residentialCounty": "东城区",
            "residentialAddress": "吨吨吨",
            "allergyHistory": "",
            "operationHistory": "",
            "traumaHistory": "",
            "bloodTransfusionHistory": "",
            "familyHistory": "",
            "geneticDiseasesHistory": "",
            "linkName": "崔永郑",
            "linkPhone": "19512256806"
          }
        },
        {
          "sign": {
            "name": "马现书",
            "medicalCard": "",
            "idcard": "370829198101163252",
            "mobile": "phone",
            "permanentProvince": "北京",
            "permanentCity": "北京市",
            "permanentCounty": "东城区",
            "permanentAddress": "嘉祥镇杜马庄村177号",
            "residentialProvince": "北京",
            "residentialCity": "北京市",
            "residentialCounty": "东城区",
            "residentialAddress": "吨吨吨",
            "hospitalLevelTwoName": "",
            "hospitalLevelTwoDetail": "",
            "hospitalLevelTwoId": "",
            "hospitalLevelThreeName": "",
            "hospitalLevelThreeId": "",
            "hospitalLevelThreedetail": null,
            "signDoctorName": "南山",
            "otherDoctorName": ""
          },
          "base": {
            "name": "马现书",
            "sexCode": null,
            "idcard": "370829198101163252",
            "nationalityCode": null,
            "marriageCode": null,
            "medicalCard": "",
            "degreeCode": "01",
            "insuranceCode": "",
            "workStatusCode": "",
            "occupationCode": "",
            "phone": "phone",
            "mobile": "phone",
            "bloodTypeCode": "01",
            "rhBloodCode": "",
            "disabilityCode": "01",
            "disabilityNumber": "10000000010",
            "environmentalLevel": [
              {
                "value": "00",
                "name": "无",
                "other": null
              },
              {
                "value": "01",
                "name": "化学品",
                "other": null
              },
              {
                "value": "03",
                "name": "射线",
                "other": null
              }
            ],
            "diseaseHistory": [
              {
                "value": "00",
                "name": "无",
                "other": null,
                "diagnosisTime": "2020-01-15"
              }
            ],
            "permanentProvince": "北京",
            "permanentCity": "北京市",
            "permanentCounty": "东城区",
            "permanentAddress": "嘉祥镇杜马庄村177号",
            "residentialProvince": "北京",
            "residentialCity": "北京市",
            "residentialCounty": "东城区",
            "residentialAddress": "吨吨吨",
            "allergyHistory": "",
            "operationHistory": "",
            "traumaHistory": "",
            "bloodTransfusionHistory": "",
            "familyHistory": "",
            "geneticDiseasesHistory": "",
            "linkName": "崔永郑",
            "linkPhone": "19512256806"
          }
        }
        ]
        rej(data)
      })
    },
    async showDetail(customerID){
      let dictObj = await this.getDicts({keys:'sex,nationality,marriage,degree,insurance,workStatus,occupation,bloodType,disability,environmentalLevel,diseaseHistory,rhBlood'})
      this.dictObj = dictObj
      console.log(dictObj)
      if(customerID){ //预览单个
        // let info = await getInfoById({customerID})  
        let info = await this.getInfoById()     
        this.infoData = [info]
      }else{ //预览全部
        // let info = await getAllInfo(this.formData)
        let info = await this.getAllInfo()
        this.infoData = info
      } 
      this.dialogVisible = true
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false
    },
  }
}
</script>

<style scoped>
.yh-institution-container {
  background: #fff;
  height: 500px;
}
#content{
  width:600px;
  margin: 0 auto;
}
>>>.el-dialog__header{
  text-align: left;
  background: #30B6AA;
  position: sticky;
  top:0;
  width: 100%;
}
</style>

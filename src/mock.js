const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData= function(){
    let datas = [] // 用于接受生成数据的数组
    let size = [
      '300x250', '250x250', '240x400', '336x280', 
      '180x150', '720x300', '468x60', '234x60', 
      '88x31', '120x90', '120x60', '120x240', 
      '125x125', '728x90', '160x600', '120x600', 
      '300x600'
    ] // 定义随机值
    for(let i = 0; i < 8; i ++) { // 可自定义生成的个数
      let template = {
        'contractId': Random.natural(1, 10), // 生成1到100之间自然数
        'checkStatus2Str': Random.integer(1, 100), // 生成1到100之间的整数
        'areaName': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
        'character': Random.character(), // 生成随机字符串,可加参数定义规则
        'capacityName': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierName': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierName2': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierName3': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'goodsStowageType2Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'transactionTypeStr': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'bookingWaybill': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierLowCharge': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierLowCharge2': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierLowCharge3': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierLowCharge4': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierLowCharge5': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic1Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic2Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic3Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic22Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic23Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic24Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic25Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic26Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic27Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'supplierCarryLogic28Str': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'deptCode': Random.range(0, 10, 2), // 生成一个随机数组
        'deptName': Random.string(2, 10), // 生成一个随机数组
        'supplierCode': Random.range(0, 10, 2), // 生成一个随机数组
        'supplierName': Random.string(2, 10), // 生成一个随机数组
        'effectiveDateStr': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'effectiveDate2Str': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'effectiveDate3Str': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'expirationDateStr': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'expirationDate2Str': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'checkTm': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'checkTm1': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'checkTm2': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'checkTm3': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'createdTm': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'createdTm1': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'createdTm2': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'createdTm3': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'createdTm4': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'modifiedTm': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'modifiedTm1': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
        'color': Random.color(), // 生成一个颜色随机值
        'paragraph':Random.paragraph(2, 5), //生成2至5个句子的文本
        'checkEmpCode': Random.name(), // 生成姓名
        'checkEmpCode1': Random.name(), // 生成姓名
        'checkEmpCode2': Random.name(), // 生成姓名
        'checkEmpCode3': Random.name(), // 生成姓名
        'createdEmp': Random.name(), // 生成姓名
        'createdEmp1': Random.name(), // 生成姓名
        'createdEmp2': Random.name(), // 生成姓名
        'createdEmp3': Random.name(), // 生成姓名
        'modifiedEmp': Random.name(), // 生成姓名
        'modifiedEmp1': Random.name(), // 生成姓名
        'url': Random.url(), // 生成web地址
        'departCityName': Random.province() ,// 生成地址
        'arriveCityName': Random.province(), // 生成地址
        
      }
      datas.push(template)
    }
    return {
        datas : datas
    }
}

// mock一组数据
const produceNewsData2= function(){
    let datas2 = [] // 用于接受生成数据的数组
    for(let i = 0; i < 8; i ++) { // 可自定义生成的个数
      let template2 = {
        'contractId': Random.string(1, 10), // 生成2到10个字符之间的字符串
        'capacityName': Random.natural(2, 10), // 生成1到100之间自然数
        'supplierName': Random.string(1, 10), // 生成2到10个字符之间的字符串
        'departCityName': Random.province() ,// 生成地址
        'arriveCityName': Random.province(), // 生成地址
      }
      datas2.push(template2)
    }
    return {
        datas2 : datas2
    }
}

Mock.mock('/data/index', 'post', produceNewsData) // 根据数据模板生成模拟数据
Mock.mock('/data2/index2', 'post', produceNewsData2) // 根据数据模板生成模拟数据
import {validate, should} from "kato-server/dist";

export default class Best3 {

  @validate(should.object({
      k1: should.string().example("example1").description("测试yi"),
      k2: should.number().integer().example(1).description("测试"),
      k3: should,
      k4: should.date().description("ces"),
      ar: should.array().description("数组"),
      bo: should.boolean().description("布尔"),
      gg:should,
      gg1:should,
      gg2:should,
      gg3:should,
      gg4:should,
      gg5:should,
      gg6:should,
      gg7:should,
      gg8:should,
      gg9:should,
    }).unknown().description("测试对象").example({
      k1: '哈哈',
      k2: 4,
      k3: new Date()
    }),
    should.example(1).description("页码"), null, should.date().description("日期"))
  plist(obj, pageNo, pageSize, date1, date2) {
    return {obj, pageNo, pageSize, date1, date2}
  }

  ist2(obj, date, test) {
    return {obj, date, test}
  }
}

import {validate, should} from "kato-server/dist";

export default class Test {

  @validate(should.object({
      k1: should.string().example("example1").description("测试yi"),
      k2: should.number().integer().example(1).required().description("测试"),
      k3: should,
      k4: should.date().description("ces"),
      ar: should.array().description("数组"),
      bo: should.boolean().description("布尔")
    }).required().description("测试对象").example({
      k1: '哈哈',
      k2: 4,
      k3: new Date()
    }),
    should.example(1).description("页码"), null, should.date().description("日期"))
  list(obj, pageNo, pageSize, date1, date2) {
    return {obj, pageNo, pageSize, date1, date2}
  }

  list2(obj, date, test) {
    return {obj, date, test}
  }
}

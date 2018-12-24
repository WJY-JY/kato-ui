import {validate, should} from "kato-server/dist";

export default class Test {

  @validate(should.object({
      k1: should.string().example("example1").description("测试yi"),
      k2: should.number().integer().example(1).required().description("测试"),
      k3: should.date().example(new Date(10000000000)).description("测试时间")
    }).required().description("测试对象").example({
      k1: '哈哈',
      k2: 4,
      k3: new Date()
    }),
    should.example(1).description("页码"),
    should.number().integer().required().example(10).description("分页尺寸"),
    should.date().example(new Date()).description("日期"))
  list(obj, pageNo, pageSize, date) {
    return {obj, pageNo, pageSize, date}
  }

  list2(obj, date, test) {
    return {obj, date, test}
  }
}

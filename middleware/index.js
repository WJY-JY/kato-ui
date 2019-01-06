import ecstatic from 'ecstatic';

let fileServer;

if (_DEV_) {
  const webpack = require('webpack');
  const compiler = webpack(require('../webpack.front.dev'));
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    stats: 'errors-only',
    hot: true
  });
  const hotMiddleware = require('webpack-hot-middleware')(compiler);
  fileServer = (req, res) => {
    devMiddleware(req, res, () => {
      hotMiddleware(req, res, () => {
        res.writeHead(404);
        res.end('Not Found!!!')
      })
    })
  }
} else {
  fileServer = ecstatic({
    root: __dirname.substring(0, __dirname.lastIndexOf('middleware')) + 'ui',
    autoIndex: true
  })
}

export async function KatoUI(ctx, next) {
  const {req, res} = ctx;
  if (req.url.startsWith('/ui/')) {
    //禁止respond中间件的处理,其实KatoUI肯定在respond中间件前
    ctx.bypassing = true;
    //裁剪url
    req.url = req.url.substr('/ui'.length, req.url.length);
    fileServer(req, res);
    await new Promise(resolve => {
      res.on('finish', () => resolve())
    });
  } else if (req.url === "/stub-api.json") {
    //禁止respond中间件的处理,其实KatoUI肯定在respond中间件前
    ctx.bypassing = true;
    // 获取ui需要的接口信息
    const stub = {
      modules: []
    };
    for (const [moduleName, module] of ctx.kato.modules) {
      const moduleStub = {
        name: moduleName,
        methods: []
      };
      for (const [methodName, method] of module.methods) {
        moduleStub.methods.push({
          name: methodName,
          parameters: method.parameters.map(it => ({name: it.name, type: it.type})),
          validate: method.method.__validate ? method.method.__validate.map(o => {
            if (o)
              return {
                type: o._type,
                children: o._type === "object" && o._inner.children ? o._inner.children.map(it => ({
                  key: it.key,
                  type: it.schema._type,
                  examples: it.schema._examples,
                  description: it.schema._description
                })) : null,
                examples: o._examples,
                description: o._description
              };
            else
              return {
                type: null,
                children: null,
                examples: null,
                description: null
              };
          }) : null
        })
      }
      stub.modules.push(moduleStub);
    }
    // modules.forEach()
    ctx.res.setHeader("Content-Type", "application/json");
    ctx.res.end(JSON.stringify(stub));
  } else
    await next();
}

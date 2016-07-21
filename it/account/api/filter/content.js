import { Component } from 'workframe';
import { Request, Response } from 'workframe/http';


@Component()
class ContentFilter {

  async handle(req: Request, res: Response, opts, next) {
    res.setHeader('Content-Type', opts.type);
    await next();
  }
}


export default ContentFilter;

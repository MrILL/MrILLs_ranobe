class CustomBasicRouter {
  routes() {
    return this.router.routes();
  }
  allowedMethods() {
    return this.router.allowedMethods();
  }
}

export default CustomBasicRouter;

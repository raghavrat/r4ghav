const worker = {
  async fetch(request: Request): Promise<Response> {
    const target = new URL(request.url);
    target.protocol = "https:";
    target.hostname = "r4ghav.xyz";

    if (target.pathname === "/") {
      target.pathname = "/test/";
    }

    return fetch(new Request(target, request));
  },
};

export default worker;

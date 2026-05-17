export default function logger(options = {}) {
  const {
    logBody = false,
    logHeaders = false,
    ignore = [],
  } = options;

  return (req, res, next) => {
    if (ignore.includes(req.path)) {
      return next();
    }

    const start = process.hrtime.bigint();

    res.on("finish", () => {
      const durationMs =
        Number(process.hrtime.bigint() - start) / 1_000_000;

      const log = {
        time: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${durationMs.toFixed(2)}ms`,
        ip: req.ip,
        userAgent: req.get("user-agent"),
      };

      if (logBody) log.body = req.body;
      if (logHeaders) log.headers = req.headers;

      console.log(JSON.stringify(log));
    });

    next();
  };
}

import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

// Serve static assets from attached_assets directory
app.use('/attached_assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log('🚀 Starting server initialization...');
    console.log('📋 Environment:', app.get("env"));
    console.log('🔌 PORT from env:', process.env.PORT || '5000 (default)');
    
    // Check database environment variables
    console.log('🗄️  Database configuration:');
    console.log('  - DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Missing');
    console.log('  - PGHOST:', process.env.PGHOST ? '✓ Set' : '✗ Missing');
    console.log('  - PGPORT:', process.env.PGPORT ? '✓ Set' : '✗ Missing');
    console.log('  - PGDATABASE:', process.env.PGDATABASE ? '✓ Set' : '✗ Missing');
    console.log('  - PGUSER:', process.env.PGUSER ? '✓ Set' : '✗ Missing');
    console.log('  - PGPASSWORD:', process.env.PGPASSWORD ? '✓ Set' : '✗ Missing');

    console.log('🔄 Registering routes and initializing database...');
    const server = await registerRoutes(app);
    console.log('✅ Routes registered successfully');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error('❌ Error handler triggered:', { status, message, stack: err.stack });
      res.status(status).json({ message });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      console.log('🔧 Setting up Vite for development...');
      await setupVite(app, server);
      console.log('✅ Vite setup complete');
    } else {
      console.log('📦 Serving static files for production...');
      serveStatic(app);
      console.log('✅ Static files configured');
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || '5000', 10);
    console.log(`🌐 Starting server on 0.0.0.0:${port}...`);
    
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      console.log(`✅ Server successfully started!`);
      console.log(`🎯 Listening on http://0.0.0.0:${port}`);
      log(`serving on port ${port}`);
    });

    server.on('error', (error: any) => {
      console.error('❌ Server error:', error);
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
      } else if (error.code === 'EACCES') {
        console.error(`Permission denied to bind to port ${port}`);
      }
      process.exit(1);
    });

  } catch (error: any) {
    console.error('❌ Fatal error during server initialization:', error);
    console.error('Stack trace:', error.stack);
    
    // Log specific error types
    if (error.message?.includes('database') || error.message?.includes('connect')) {
      console.error('🗄️  Database connection error detected');
      console.error('Please verify all database secrets are correctly set');
    }
    
    process.exit(1);
  }
})();

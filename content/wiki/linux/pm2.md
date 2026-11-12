# PM2

## Basic Commands

```bash
pm2 save             # Save current processes
pm2 startup          # Configure PM2 to start automatically on boot-up
pm2 ls               # List of active processes
pm2 log {{app_name}} # View application logs
pm2 monit            # Show monitor
pm2 kill                  # Kill pm2 daemon
pm2 resurrect             # Load saved processes
```

## Start Application

```bash
# Start an application with a custom name, user, and maximum memory
pm2 start app.js --name "myapp" -u acs2i --max-memory-restart 1000M

# Start an application with a custom name and custom command
pm2 start npm --name "myapp" -- run dev
```

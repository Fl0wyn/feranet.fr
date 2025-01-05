# PM2

```bash
sudo pm2 save             # Save active processes
sudo pm2 startup          # Configure PM2 to start automatically on boot-up
sudo pm2 ls               # List of active processes
sudo pm2 log {{app_name}} # View application logs
sudo pm2 monit            # Show monitor

# Start an application with a custom name, user and maximum memory
pm2 start app.js --name "myapp" -u acs2i --max-memory-restart 1000M

# Start an application with a custom name and custom command
pm2 start npm --name "myapp" -- run dev
```

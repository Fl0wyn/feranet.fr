# Linux Server Logs

> This guide is based on [Quick-Tutoriel's article on Linux server logs](https://quick-tutoriel.com/logs-serveur-linux/) by Guillaume Reynaud.

## Understanding Linux Server Logs

### Importance for Security and Troubleshooting

Linux system logs play a crucial role in server management, diagnostics, and security. They enable administrators to:

- Track system events
- Identify boot errors
- Monitor user activity
- Detect unauthorized access attempts

Mastering log analysis allows for quick responses to system malfunctions or security threats. Regular review of boot and connection logs helps prevent problems and strengthen server security.

### Main Log File Locations

Most Linux log files are stored in the `/var/log` directory. Here are the most commonly used files:

```bash
/var/log/syslog or /var/log/messages     # General system information
/var/log/auth.log or /var/log/secure     # SSH connections, authentications, failed attempts (Debian/Ubuntu vs CentOS/RHEL)
/var/log/dmesg                           # Kernel messages at boot
/var/log/boot.log                        # Boot sequence messages
/var/log/faillog and /var/log/lastlog    # Authentication failures and last connections
```

For a consolidated view of events, `journalctl` used with `systemd` provides centralized and filtered access to system logs, especially those related to boot and user connections.

## Analyzing Boot Logs

### Using journalctl for Boot Logs

On Linux distributions using systemd, `journalctl` is the main tool for viewing boot logs. It extracts all information related to the boot sequence, from kernel loading to complete system startup.

To view logs from the latest boot:

```bash
journalctl -b
```

To display logs from a specific boot (numbered from 0, most recent):

```bash
journalctl -b -1     # Show logs from the second-most recent boot
```

You can also filter by severity level or specific systemd unit:

```bash
journalctl -b -p err                  # Show only errors from the last boot
journalctl -u ssh.service             # Show SSH service logs
journalctl --since "1 hour ago"       # Show logs from the last hour
```

### Last Command and wtmp File

In Linux, the `last` command reads the contents of the `/var/log/wtmp` and `/var/log/btmp` files.

To see when the machine was shut down:

```bash
last -x shutdown --time-format iso
```

To see when the machine was rebooted:

```bash
last -x reboot --time-format iso
```

The `-x` parameter also displays system shutdowns and run level changes.

Important files:

- The `wtmp` file contains a record of all system logins and logouts (shutdown, reboot)
- The `btmp` file contains all failed login attempts

These files cannot be read directly with a text editor. To read them in a more readable format:

```bash
last -f /var/log/btmp    # Read login failures
last -f /var/log/wtmp    # Read login history
```

### Interpreting Boot Messages

Boot messages provide valuable information about the proper functioning of various system components, including:

- Kernel and module loading
- Hardware detection
- Filesystem mounting
- systemd service startup

It's essential to identify error messages (often indicated by `Failed` or `Error`) that can slow down or block server boot. Similarly, messages like `Job running`, `Timeout`, or `Dependency failed` indicate dependency problems or misconfigured services.

## Securing Your System Through Log Analysis

### Analyzing /var/log/auth.log for SSH Connections

One of the most important files for monitoring SSH activity on a Linux server is `/var/log/auth.log` (or `/var/log/secure` on CentOS/RHEL). It records all authentication attempts, both successful and failed, as well as privilege elevations via sudo.

To examine these Linux connection logs:

```bash
grep sshd /var/log/auth.log
```

This allows you to identify which users connected, when, from which IP address, and whether they were successfully authenticated. This analysis is essential for auditing SSH connections and maintaining access traceability on your server.

### Detecting Failed Connection Attempts

Failed connection attempts are key indicators of a potential intrusion attempt. They often appear in logs as: `Failed password for invalid user ...`

To quickly extract these events:

```bash
grep "Failed password" /var/log/auth.log
```

For a more concise view sorted by IP address:

```bash
awk '/Failed password/ {print $(NF-3)}' /var/log/auth.log | sort | uniq -c | sort -nr
```

This helps you identify IP addresses responsible for multiple failures and implement countermeasures (such as fail2ban or firewall rules) to strengthen your Linux server's security.

## Setting Up Log Rotation

You can define log retention periods by editing the `/etc/logrotate.conf` file.

Here are some important parameters:

```bash
# Basic logrotate configuration
monthly              # Rotation occurs monthly (alternatives: daily, weekly)
create 0664 root utmp # Permissions for created files
rotate 4             # Number of files to keep
minsize 1M           # Minimum size before rotation
compress             # Compress old logs
```

Other useful parameters:

- `compress`: Secondary log files will be compressed
- `delaycompress`: Delays compression of the previous log to the next cycle
- `notifempty`: Don't rotate empty logs
- `prerotate`, `postrotate/endscript`: Commands to execute before/after rotation

To force logrotate execution:

```bash
logrotate -f /etc/logrotate.conf
```

To debug the configuration:

```bash
logrotate -d /etc/logrotate.conf
```

## Useful Commands for Log Analysis

```bash
# Display the last 10 lines of a log file and follow its evolution
tail -f /var/log/syslog

# Search authentication logs for successful connections
grep "Accepted password" /var/log/auth.log

# Show users who used sudo
grep sudo /var/log/auth.log | grep COMMAND

# Extract IP addresses that attempted to connect
grep sshd /var/log/auth.log | grep -i "invalid user" | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr

# Show logs related to a specific service
journalctl -u apache2.service --since today
```

## System Monitoring Tools

> This section is based on [Korben's article on btop++](https://korben.info/btop-alternative-htop-monitoring-systeme-gpu.html).

### btop++: Advanced System Monitor

btop++ is a resource monitor that shows CPU, memory, disk, network, and process information in a clean, intuitive interface. It's an enhanced alternative to tools like top and htop.

#### Installation

On Debian/Ubuntu:

```bash
apt install btop
```

On Fedora/RHEL:

```bash
dnf install btop
```

Using Homebrew (macOS/Linux):

```bash
brew install btop
```

#### Features

- Real-time CPU usage with per-core details
- Memory and swap monitoring
- Disk I/O and usage statistics
- Network bandwidth monitoring
- Process management with sorting and filtering
- GPU monitoring support (NVIDIA, AMD, Intel)
- Customizable themes and layout

#### Basic Usage

Simply run:

```bash
btop
```

#### Keyboard Shortcuts

- `Esc`: Exit btop
- `F2`: Settings menu
- `m`: Switch memory display mode
- `p`: Show processes
- `1`: Toggle between showing average CPU and all cores
- `h`: Show help
- `q`: Quit

btop++ provides a comprehensive view of system resources with a modern interface, making it an excellent tool for monitoring and troubleshooting Linux servers.

## FAQ - Log Analysis on Linux Servers

> This section includes frequently asked questions from the original [Quick-Tutoriel article](https://quick-tutoriel.com/logs-serveur-linux/).

### How can I access boot logs on a Linux server?

You can view Linux boot logs using the `journalctl -b` command. This displays all journal messages generated since the last system boot. To analyze a previous boot, use `journalctl -b -n` where n is the boot number (counting back from the current boot).

### Where can I find SSH connection logs on Linux?

SSH connection logs are typically stored in `/var/log/auth.log` (on Debian/Ubuntu distributions) or `/var/log/secure` (on CentOS/RHEL). These logs track successful and failed connections.

### How do I detect failed login attempts?

You can use the following command to spot failed attempts in the log file:

```bash
grep "Failed password" /var/log/auth.log
```

This is useful for auditing SSH connections and identifying potential brute force attacks.

### What tools can I use to analyze Linux logs?

In addition to `journalctl`, you can use tools such as:

- `logwatch`: For generating daily log reports
- `logrotate`: For managing log archiving
- ELK Stack (Elasticsearch, Logstash, Kibana) or Loggly for advanced log analysis with visualization
- `btop++`: For real-time system monitoring

### Why is it important to monitor Linux server logs?

Regular log analysis allows you to:

- Quickly identify system errors or configuration problems
- Detect intrusion attempts or suspicious connections
- Maintain a high level of security on your Linux server
- Track user activities and resource usage
- Diagnose performance issues before they become critical

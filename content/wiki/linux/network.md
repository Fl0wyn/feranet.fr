# Network

## Display network configuration

```bash
ip a # Show all interfaces
ip a show eth0 # Show eth0 config
sudo netplan status --all # Show netplan status
ifconfig -a # Show all interfaces (deprecated)
```

## Display routing table

```bash
ip route # Show routing table
sudo ip route add default via 192.168.40.2 dev eth0 # Add default route
```

## Test network connectivity

```bash
ping -c 4 1.1.1.1 # Ping 1.1.1.1
ping -c 4 google.com # Ping google.com
traceroute 1.1.1.1 # UDP traceroute
traceroute -T 1.1.1.1 # TCP traceroute
mtr -T -P 443 -c 10 google.fr # MTR to google.fr
```

## Network diagnostics

```bash
sudo lsof -i -Pn # List open files
sudo ss -tulnp # Show listening sockets
sudo tcpdump -i eth0 port 53 # Capture traffic on port 53
netstat -tulnp # Show network stats
```

## DNS queries

```bash
nslookup -query=TXT google.fr # DNS query TXT
dig @8.8.8.8 google.fr AAA +trace # DNS query AAA
host google.fr # DNS lookup
```

## Network scanning

```bash
nmap -p- google.fr # Scan all ports
nmap -p 80,443 -Pn google.fr # Scan ports 80, 443
nmap -sP 192.168.40.0/24 # Scan network
```

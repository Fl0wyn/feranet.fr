# Apache2 & Nginx

## Nginx

```nginx
server {
  listen 80 default_server;
  index index.html;
  root /var/www/site1;
  add_header Access-Control-Allow-Origin "*";
  add_header Access-Control-Allow-Methods "GET";
  location / {
      try_files $uri $uri/ /index.html ;
  }
}

server {
  listen 8080;
  index index.html;
  root /var/www/site2;
  location / {
      try_files $uri $uri/ /index.html ;
  }
}
```

## Apache2 (SSL + Proxy)

```apache
<VirtualHost *:80>
  ServerName www.example.com
  Redirect permanent / https://www.example.com/
</VirtualHost>

<VirtualHost *:443>
  ServerName www.example.com
  ServerAdmin webmaster@localhost

  # Proxy
  ProxyPreserveHost On
  ProxyRequests Off
  ProxyPass / http://127.0.0.1:8080
  ProxyPassReverse / http://127.0.0.1:8080

  # SSL
  SSLEngine on
  SSLCertificateFile /etc/letsencrypt/live/www.example.com/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/www.example.com/privkey.pem
  SSLCertificateChainFile /etc/letsencrypt/live/www.example.com/chain.pem
  SSLProtocol all -SSLv2 -SSLv3
  SSLHonorCipherOrder on
  SSLCompression off
  SSLSessionTickets off
  SSLUseStapling on
  SSLStaplingCache "shmcb:logs/stapling-cache(150000)"

  # Logs
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

  # HSTS
  Header always set Strict-Transport-Security "max-age=63072000; includeSubdomains; preload"

  # OCSP Stapling
  Header always set Strict-Transport-Security "max-age=63072000; includeSubdomains; preload"

  # HTTP2
  Protocols h2 http/1.1

  # Cache
  <FilesMatch "\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$">
      Header set Cache-Control "max-age=2592000, public"
  </FilesMatch>
  <FilesMatch "\.(html|htm|xml|txt)$">
      Header set Cache-Control "max-age=3600, private"
  </FilesMatch>

  # Headers for security
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "no-referrer-when-downgrade"
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; form-action 'self'; base-uri 'self';"
</VirtualHost>
```

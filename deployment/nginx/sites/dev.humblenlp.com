server {
    listen 80;
    listen [::]:80;
    #listen 443 ssl http2;
    #listen [::]:443 ssl http2;

    server_name dev.humblenlp.com;
    client_max_body_size 4G;

    # Expose certbot path
    location ~ /.well-known/acme-challenge {
        allow all;
        root /www/letsencrypt;
        try_files $uri $uri/ =404;
    }

    # API
    location /api {
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://api-service:9000;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_buffering off;
    }

    # Frontend
    location / {
        rewrite ^/(.*)$ /$1 break;
        proxy_pass http://annotations-frontend;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_buffering off;
    }
}
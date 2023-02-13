# Simple react app. Menu for 10 meal types.

This app uses simple rest api from menurest repo and nginx proxy to overcome CORS (react app on 3000 port, rest on 8000 port).

Simple nginx conf:
```
		location /menu_items {
			proxy_pass http://localhost:8000/menu_items;
		}
		
		location / {
			proxy_pass http://localhost:3000;
```